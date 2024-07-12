#CRUD resources resouces ke andar hoge aur baaki extra resources iss views file me hoge

from flask import current_app as app, jsonify, request, render_template, send_file
from flask_security import auth_required, roles_required, current_user, roles_accepted
from werkzeug.security import check_password_hash, generate_password_hash
from flask_restful import marshal, fields
import flask_excel as excel
from celery.result import AsyncResult
from .models import User, db, Product, ShoppingCart, Category, Category_product, Orders, Role
from .sec import datastore
from datetime import date
# from .tasks import say_hello
from .tasks import create_resource_csv
from sqlalchemy import and_
from .instances import cache
from .dataAccess import all_products, all_categories, all_products_of_perticular_category




@app.get('/')
def home():
    # return "hello world"
    return render_template("index.html")

#this definition is for validating password
def validatePassword(password):
    """This function validates the password"""

    # converting password into list
    passwordlist = list(password)
    
    #capital alphabet list
    c_alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    c_alphalist = list(c_alpha)

    #small alphabet list
    s_alpha = 'abcdefghijklmnopqrstuvwxyz'
    s_alphalist = list(s_alpha)

    #special symbol list
    symbol = '@#$&*'
    symbollist = list(symbol)

    #number list
    num = '0123456789'
    numlist = list(num)

    capital_alphabet = False
    small_alphabet = False
    symb = False
    number = False
    for a in password:
        if a in c_alphalist:
            capital_alphabet = True
        if a in s_alphalist:
            small_alphabet = True
        if a in symbollist:
            symb = True
        if a in numlist:
            number = True
    
    if capital_alphabet == False or small_alphabet == False or symb == False or number == False:
        # return '<h1> Password must contain atleast one Capital Alphabet, Small Alphabet, Number and symbol "@,#,$,&,*".</h1><br><a href="/loginuser">Back</a>'
        return "notCorrect"
    
    return "correct"
    
# @app.get('/hello')
# def hello():
#     print(validatePassword("AAAA"))
#     return "OK"




@app.post('/user-login')
def user_login():
    # print("hello1")
    data = request.get_json() #this will give me the dictionary after parsing the json
    email = data.get('email')
    password = data.get('password')
    #At this point of time I'm not using 'username' anywhere
    username = data.get('username')

    #here I am doing backend validation of user sent data
    if '@' not in email:
        return jsonify({"message": "syntax of the email is not correct, must contain @"}), 400
    elif validatePassword(password) == "notCorrect":
        return jsonify({"message": "Password must contain atleast one Capital Alphabet, Small Alphabet, Number and symbol @, #, $, &, *"}), 400
    

    # print("hello2")
    if not username:
        return jsonify({"message": "username not provided"}), 400
    
    # print("hello3")
    if not email:
        return jsonify({"message": "email not provided"}), 400
    
    user = datastore.find_user(email=email)

    # print("hello4")
    if not user:
        return jsonify({"message": "User Not Found"}), 404
    
    # print("hello5")
    #isse hame user ka authentication token mil jayega agar user ka input password ka hash match kar jata hai database me stored password ke hash se
    if check_password_hash(user.password, password):
        # print("hello6")
        return jsonify({"token": user.get_auth_token(), "email": user.email, "role": user.roles[0].name, "id": user.id, "status": user.active})
    else:
        return jsonify({"message": "Wrong Password"}), 400
    

@app.post('/user-register')
def user_register():
    # print("hello1")
    data = request.get_json()
    username = data.get('username')
    if not username:
        return jsonify({"message": "username not provided"})
    
    email = data.get('email')
    # print("hello2")
    if not email:
        return jsonify({"message": "email not provided"}), 400
    
    # print("hello3")
    password = data.get('password')
    if not password:
        return jsonify({"message": "password not provided"}), 400
    
    # print("hello4")
    role = data.get('role')
    if not role:
        return jsonify({"message": "role not provided"}), 400
    
    # selectedUserRole = data.get('selectedUserRole')
    # print(selectedUserRole, 'selectedUserRole')
    # if not role:
    #     return jsonify({"message": "role not provided"}), 400


    #here I am doing backend validation of user sent data
    if '@' not in email:
        return jsonify({"message": "syntax of the email is not correct, must contain @"}), 400
    elif validatePassword(password) == "notCorrect":
        return jsonify({"message": "Password must contain atleast one Capital Alphabet, Small Alphabet, Number and symbol @, #, $, &, *"}), 400
    

    if role == 'manager':
        #yha par new manager user create kar rhe hai
        if not datastore.find_user(email=email):
            if data.get('authcode') != "12345":
                return jsonify({"message": "Authentication code not matched"}), 400
            datastore.create_user(username=username,email=email, password=generate_password_hash(password), roles=[role], active=False)
            db.session.commit()
            return jsonify({"message": "User created successfully"})
        else:
            return jsonify({"message": "This email already exists"}), 400
    
    #yha par new normal user create kar rhe hai
    if not datastore.find_user(email=email):
        datastore.create_user(username=username,email=email, password=generate_password_hash(password), roles=[role])
        db.session.commit()
        return jsonify({"message": "User created successfully"})
    else:
        return jsonify({"message": "This email already exists"}), 400


@app.get('/addToCart/pId/<int:pId>')
@auth_required("token")
@roles_required("normal_user")
def addToCartPF(pId):
    user_id = current_user.id
    # print(user_id)

    if user_id:
        product_id = int(pId)
        p1 = Product.query.get(product_id)
        if p1.quantity <= 0:
            return jsonify({"message": "You just missed!. Now, this product is out of stock"}), 404
        obj = ShoppingCart(product_name=p1.product_name, price_unit=p1.price_unit, quantity = 1, unit=p1.unit, total_price = p1.price_unit, user_id=user_id)
        db.session.add(obj)
        db.session.commit()

        return jsonify({"message": "product added successfully"})
    else:
        return jsonify({"message": "something went wrong"}), 400


@app.get('/search/product/<product_name>')
@auth_required("token")
def seachProduct(product_name):
    p1 = Product.query.filter(Product.product_name == product_name).all()

    if len(p1) == 0:
        return jsonify({"message": "No such product"}), 404
    
    p1_list = []
    for p in p1:
        # p1_dict[p.product_id] = p.product_name
        p1_list.append({'product_id': p.product_id, 'product_name': p.product_name, 'price_unit': p.price_unit, 'unit': p.unit, 'quantity': p.quantity, 'discount': p.discount})
    # print(p1_list)
    return p1_list

@app.get('/search/category/<category_name>')
def searchCategory(category_name):
    c1 = Category.query.filter(Category.category_name == category_name).first()
    if c1 is None:
        return jsonify({"message": "No such category"}), 404
    return jsonify({"c_id": c1.category_id, "c_name": c1.category_name})


@app.get('/filter/product/start/<int:s>/end/<int:e>')
@auth_required("token")
def filterProduct(s, e):
    s = int(s)
    e = int(e)
    # p1 = Product.query.filter(Product.product_name == product_name).all()
    p1 = []
    prod_List = Product.query.all()
    for p in prod_List:
        if s <= p.price_unit <= e:
            p1.append(p)

    if len(p1) == 0:
        return jsonify({"message": "No products in this range"}), 404
    
    p1_list = []
    for p in p1:
        # p1_dict[p.product_id] = p.product_name
        p1_list.append({'product_id': p.product_id, 'product_name': p.product_name, 'price_unit': p.price_unit, 'unit': p.unit, 'quantity': p.quantity, 'discount': p.discount})
    print(p1_list)
    return p1_list


#this will return all the producs in the perticular category
@app.get('/eachcategory/<int:c_id>')
@auth_required("token")
def eachCategory(c_id):
    c_id = int(c_id)
    c = Category.query.get(c_id)
    p1 = all_products_of_perticular_category(c)
    # print(p1)

    if len(p1) == 0:
        return jsonify({"message": "No products in this category"}), 404
    
    p1_list = []
    for p in p1:
        # p1_dict[p.product_id] = p.product_name
        p1_list.append({'product_id': p.product_id, 'product_name': p.product_name, 'price_unit': p.price_unit, 'unit': p.unit, 'quantity': p.quantity, 'discount': p.discount})
    # print(p1_list)
    return p1_list


# cartitems_fields = {
#     "item_id": fields.Integer,
#     "product_name": fields.String,
#     "price_unit": fields.Integer,
#     "quantity": fields.Integer,
#     "unit": fields.String,
#     "total_price": fields.Integer
# }
@app.get('/cartItems/<int:user_id>')
@auth_required("token")
@roles_required("normal_user")
def cartItems(user_id):
    user_id = int(user_id)
    all_prod = ShoppingCart.query.filter(ShoppingCart.user_id == user_id).all()

    if len(all_prod) == 0:
        return jsonify({"message": "No products in your cart"}), 404

    Grand_total = 0
    p_list = []
    for p in all_prod:
        p1 = Product.query.filter(Product.product_name==p.product_name).first()
        discount = p1.discount
        # print(p1.product_name, p1.discount,"*******************************")
        Grand_total += int(p.total_price) - (int(p.total_price)*(discount/100))
        # print(Grand_total,"***********************")
        discounted_price = int(p.total_price) - (int(p.total_price)*(discount/100))
        discounted_price = round(discounted_price, 2)
        p_list.append({"item_id": p.item_id,"product_name": p.product_name, "price_unit": p.price_unit, "quantity": p.quantity, "unit": p.unit, "discount": discount, "total_price": discounted_price})

    # return marshal(all_prod, cartitems_fields)
    Grand_total = round(Grand_total, 2)
    return [p_list, Grand_total]
    

#delete item from the cart
@app.get('/deleteItemPF/<int:item_id>')
@auth_required("token")
@roles_required("normal_user")
def deleteItem(item_id):
    item_id = int(item_id)
    print(item_id, 'item_id')
    p1 = ShoppingCart.query.filter(ShoppingCart.item_id==item_id).first()
    print(p1.product_name, p1)
    if p1 is not None:
        db.session.delete(p1)
        # datastore.delete_shoppingcart(item_id=item_id)
        db.session.commit()
        return jsonify({"message": "Item deleted successfully"})
    else:
        return jsonify({"message": "Not able to delete the item"}), 400


@app.get('/buyAll')
@auth_required("token")
@roles_required("normal_user")
def buyAllPF():
    user_id = current_user.id
    # print(user_id)
    all_cartItems = ShoppingCart.query.filter(ShoppingCart.user_id == user_id).all()
    # print(all_cartItems)
    for p in all_cartItems:
        p1 = Product.query.filter(Product.product_name == p.product_name).first()
        if p1.quantity <= 0:
            msg = f'Sorry, Now "{p1.product_name}" is out of stock'
            return jsonify({"message": msg}), 404
        
        #adding a row in Orders table
        order_obj = Orders(product_id=p1.product_id, user_id=user_id, date=str(date.today()), price=p1.price_unit)
        # order_obj = Orders(product_id=p1.product_id, user_id=user_id, date='2023-12-14', price=p1.price_unit)
        db.session.add(order_obj)
        db.session.commit()

        p1.quantity = p1.quantity -1
        db.session.commit()

        db.session.delete(p)
        db.session.commit()

        # Clear the cache for all products upon adding a new product
        cache.delete('all_productsKP')

        # Clear the cache for perticular category products
        cache.delete_memoized(all_products_of_perticular_category)
        
    return jsonify({"message": "Congratulations!! Your order is placed successfully"})


#ye path category approve karne ke liye hai
@app.get('/approveCategory/<int:c_id>')
@auth_required("token")
@roles_required("admin")
def approveCategoryPF(c_id):
    c1 = Category.query.get(c_id)
    if c1 is None:
        return jsonify({"message": "There is no category with this id"}), 404
    c1.is_approved = True
    db.session.commit()

     # Clear the cache for all categories upon adding a new product
    cache.delete('all_categoriesKP')

    return jsonify({"message": "Category approved successfully"})


#all the managers
@app.get('/managers')
@auth_required("token")
@roles_required("admin")
def managersPF():
    u1 = User.query.all()
    if u1 is None:
        return jsonify({"message": "There is no managers"}), 404
    
    m1_list = []
    for u in u1:
        # print(u.roles[0].name)
        if u.roles[0].name == 'manager':
            m1_list.append({'id': u.id, 'username': u.username, 'email': u.email, 'active': u.active})
            print({'id': u.id, 'username': u.username, 'email': u.email, 'active': u.active})
    return m1_list


#ye path manager approve karne ke liye hai
@app.get('/approveManager/<int:user_id>')
@auth_required("token")
@roles_required("admin")
def approveManagerPF(user_id):
    u1 = User.query.get(user_id)
    if u1 is None:
        return jsonify({"message": "There is no manager with this id"}), 404
    u1.active = True
    db.session.commit()
    return jsonify({"message": "Manager approved successfully"})


@app.get('/change/type/<type>')
@auth_required("token")
@roles_required("normal_user")
def changeTypePF(type):
    u1 = User.query.filter(User.id == current_user.id).first()
    u1.type = type
    db.session.commit()
    return jsonify({'message': "Content type changed successfully"})





# @app.get('/say-hello')
# def say_hello_view():
#     t = say_hello.delay()
#     return jsonify({"task-id": t.id})

@app.get('/download-csv')
@auth_required("token")
@roles_required("manager")
def download_csv():
    #isse hame whole product_id column aur whole product name column mil jayega
    # Product_details = Product.query.with_entities(Product.product_id, Product.product_name).all()
    # csv_output = excel.make_response_from_query_sets(Product_details, ["product_id", "product_name"], "csv", filename="test1.csv")
    # return csv_output

    task = create_resource_csv.delay()
    return jsonify({"task-id": task.id})

@app.get('/get-csv/<task_id>')
def get_csv(task_id):
    res = AsyncResult(task_id)
    if res.ready():
        filename = res.result
        # return jsonify({"message": "Task Complete"})
        return send_file(filename, as_attachment=True)

    else:
        return jsonify({"message": "Task Pending"}), 404
    


#checking orders date
# @app.get('/od')
# def odPF():
#     users = User.query.filter(User.roles.any(Role.name == 'normal_user')).all()
#     for user in users:
#         todays_date = str(date.today())
#         # print(todays_date,'***************************')
#         todays_orders = Orders.query.filter(and_(Orders.date == todays_date, Orders.user_id == user.id)).first()
#         # print(todays_orders)
#         if todays_orders is not None:
#             return jsonify({"status": "Hello world"})
#     return jsonify({"status": "OK"})




#getting single product detail so that we can show them in the update form
@app.get('/singleProudctDetails/<int:pid>')
@auth_required("token")
@roles_required("manager")
def singleProductDetailsPF(pid):
    p1 = Product.query.filter(Product.product_id == pid).first()
    return jsonify({"product_name": p1.product_name, "price_unit": p1.price_unit, "unit": p1.unit, "manufac_date": p1.manufac_date, "exp_date": p1.exp_date, "quantity": p1.quantity, "discount": p1.discount})


#getting single category detail so that we can show them in the update form
@app.get('/singleCategoryDetails/<int:cid>')
@auth_required("token")
@roles_accepted("admin", "manager")
def singleCategoryDetailsPF(cid):
    c1 = Category.query.filter(Category.category_id == cid).first()
    return jsonify({"category_name": c1.category_name})


#This endpoint is for figuring out the buying history of a perticular customer
#Note: If some user bought product is deleted from the inventory then it won't be available in the user's buying history
@app.get('/buyingHistory/<int:uid>')
# @auth_required("token")
def buyingHistoryPF(uid):
    all_orders = Orders.query.filter(Orders.user_id == uid).all()
    orderlist = []
    for order in all_orders:
        p1 = Product.query.filter(Product.product_id == order.product_id).first()
        if p1 is not None:
            discounted_price = p1.price_unit - (p1.price_unit*p1.discount)/100
            discounted_price = round(discounted_price, 2)
            orderlist.append({"product_name": p1.product_name, "price_unit": p1.price_unit, "unit": p1.unit, "quantity": 1, "discount": p1.discount, "discounted_price": discounted_price})

    if len(orderlist) != 0:  
        return orderlist
    else:
        return jsonify({"message": "Your order History is Empty"}), 400
    
    
#this endpoint is to add the star in the end of the category name so that admin can know that a manager wants to delete that category
@app.get('/addStar/<int:cid>')
def addStarPF(cid):
    c1 = Category.query.get(cid)
    if c1.category_name[-1] == '*':
        return jsonify({"message": "you can add only one * in the category name."}), 400
    c1.category_name = str(c1.category_name) + '*'
    db.session.commit()
    # print(c1.category_name)

    # Clear the cache for all categories upon adding a new product
    cache.delete('all_categoriesKP')
    # Clear the cache for perticular category products
    cache.delete_memoized(all_products_of_perticular_category)

    return jsonify({"message": "request is sended successfully to admin for deleting this category"})

#this endpoint is to remove the star from the the category name in case admin does not want to delete that category
@app.get('/removeStar/<int:cid>')
def removeStarPF(cid):
    c1 = Category.query.get(cid)
    if c1.category_name[-1] != '*':
        return jsonify({"message": "star is already removed from the category name."}), 400
    c1.category_name = str(c1.category_name)[:-1]
    db.session.commit()
    # print(c1.category_name)

    # Clear the cache for all categories upon adding a new product
    cache.delete('all_categoriesKP')
    # Clear the cache for perticular category products
    cache.delete_memoized(all_products_of_perticular_category)

    return jsonify({"message": "successfully removed the star from the category name"})
        





