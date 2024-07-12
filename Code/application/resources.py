from flask_restful import Resource, Api, reqparse, marshal_with, fields
from flask_security import auth_required, roles_required, current_user, roles_accepted
from .models import db, Category, Category_product, Product
from .instances import cache
from .dataAccess import all_products, all_categories, all_products_of_perticular_category

api = Api(prefix='/api')

parser = reqparse.RequestParser()

#for category Api
parser.add_argument('c_name')
parser.add_argument('new_category_name')

#for product Api
parser.add_argument('category_name')
parser.add_argument('product_name')
parser.add_argument('price_unit')
parser.add_argument('unit')
parser.add_argument('manufac_date')
parser.add_argument('exp_date')
parser.add_argument('qty')
parser.add_argument('discount')

class Api_category(Resource):

    @auth_required("token")
    def get(self):
        # print(current_user.roles)
        c1 = all_categories()
        # c1_dict = {}
        c1_list = []
        for c in c1:
            if current_user.roles[0] =='normal_user':
                if c.is_approved == True:
            # c1_dict[c.category_id] = c.category_name
                    c1_list.append((c.category_id,c.category_name,c.is_approved))
            elif current_user.roles[0] =='admin' or current_user.roles[0] =='manager':
                c1_list.append((c.category_id,c.category_name,c.is_approved))
        # print(c1_list)
        return c1_list, 200
        # return "Hello world from api"

    @auth_required("token")
    @roles_accepted("manager", "admin")
    def post(self):
        # print("hello world1")
        info = parser.parse_args()
        category_name = info['c_name']

        #validating data sent by user
        if type(category_name) != str:
            return {"status": "failed", "message": "Category name must be string"}
        
        # print("hello world2")
        #check already this category name exist or not
        c1 = Category.query.filter(Category.category_name == category_name).first()
        
        # print("hello world3")
        if c1 is not None:
            return {"status": "failed", "message": "This category name already exists"}
        # print("hello world4")
        if c1 is None:
            if current_user.roles[0] =='admin':
                nc1 = Category(category_name = category_name, is_approved = True)
            elif current_user.roles[0] =='manager':
                nc1 = Category(category_name = category_name)
            db.session.add(nc1)
            db.session.commit()

            # Clear the cache for all categories upon adding a new product
            cache.delete('all_categoriesKP')

            # Clear the cache for perticular category products
            cache.delete_memoized(all_products_of_perticular_category)

            return {"message": "new category created successfully"}, 201
    
    @auth_required("token")
    @roles_accepted("manager", "admin")
    def put(self, categoryId):
        info = parser.parse_args()
        categoryId = int(categoryId)
        c1 = Category.query.get(categoryId)
        if c1 is None:
            return {"status": "failed", "message": "There is no category with this id"}, 404
        new_category_name = info['new_category_name']
        # print(type(new_category_name))

        #validating data sent by user
        if type(new_category_name) != str:
            return {"status": "failed", "message": "datatype of category name should be string"}, 400
        
        c1.category_name = new_category_name
        if current_user.roles[0] =='admin':
            pass
        elif current_user.roles[0] =='manager':
            c1.is_approved = False
        db.session.commit()

        # Clear the cache for all categories upon adding a new product
        cache.delete('all_categoriesKP')

        # Clear the cache for perticular category products
        cache.delete_memoized(all_products_of_perticular_category)

        
        return {"message": "category name updated successfully"}, 200
    
    @auth_required("token")
    @roles_required("admin")
    def delete(self, categoryId):
        categoryId = int(categoryId)
        c1 = Category.query.get(categoryId)
        # print(c1, "*********************")
        if c1 is None:
            return {"status": "failed", "message": "There is no category with this id"}, 404
        
        if c1 is not None:
            allprod = c1.all_product

            #deleting all the product belonging to this category
            for prod in allprod:
                db.session.delete(prod)
                db.session.commit()
            
            #deleting all the category product relation from category product table
            cp1 = Category_product.query.filter(Category_product.cp_category_id == categoryId).all()
            for cp in cp1:
                db.session.delete(cp)
                db.session.commit()

        
            db.session.delete(c1)
            db.session.commit()

            # Clear the cache for all categories upon adding a new product
            cache.delete('all_categoriesKP')

            # Clear the cache for perticular category products
            cache.delete_memoized(all_products_of_perticular_category)

            return {"message": "category deleted successfully"}

# api.add_resource(Api_category, "/api/all_category", "/api/create_new_category", "/api/update_category/<int:categoryId>", "/api/delete_category/<int:categoryId>")
api.add_resource(Api_category, "/all_category", "/create_new_category", "/update_category/<int:categoryId>", "/delete_category/<int:categoryId>")

# Product Api
class Api_product(Resource):

    @auth_required("token")
    def get(self):
        unless = False
        p1 = all_products()
        # p1_dict = {}

        #if the user is manager then it will show only those products that are created by perticular manager
        if current_user.roles[0] =='manager':
            # print(current_user.roles[0].name, '**********')
            p1_ = []
            mgr_id = current_user.id 
            # print(mgr_id)
            for prod in p1:
                if prod.mgr_id == mgr_id:
                    p1_.append(prod)
            # print(p1)
            # print(p1_)
            p1 = p1_






        p1_list = []
        for p in p1:
            # p1_dict[p.product_id] = p.product_name
            p1_list.append({'product_id': p.product_id, 'product_name': p.product_name, 'price_unit': p.price_unit, 'unit': p.unit, 'quantity': p.quantity, 'discount': p.discount})
        # print(p1_list)
        return p1_list, 200
        

    @auth_required("token")
    @roles_required("manager")
    def post(self):
        info = parser.parse_args()
        category_name = info['category_name']
        # categoryId = int(categoryId)
        # c1 = Category.query.get(categoryId)
        c1 = Category.query.filter(Category.category_name==category_name).first()
        if c1 is None:
            return {"status": "failed", "message": "No category of this name"}, 404

        if c1.is_approved == False:
            return {"message": "This category is not approved yet, So you cannnot add products to this category"}, 400

        categoryId = c1.category_id
        product_name = info['product_name']
        price_unit = info['price_unit']
        # price_unit = int(price_unit)
        unit = info['unit']
        manufac_year = info['manufac_date']
        exp_year = info['exp_date']
        qty = info['qty']
        # qty = int(qty)
        discount = info['discount']
        # discount = int(discount)
        mgr_id=current_user.id

        # converting to integer
        try:
            price_unit = int(price_unit)
            qty = int(qty)
            discount = int(discount)
        except Exception as e:
            return {"message": "Data type of some entered value is not correct"}


        # validation of user sent data
        if type(product_name) != str:
            return {"message": "product name must be string"}, 400
        elif type(price_unit) != int:
            return {"message": "price of the product must be numeric"}, 400
        elif type(unit) != str:
            return {"message": "unit must be string type"}, 400
        elif type(qty) != int:
            return {"message": "quantity of the product must be integer"}, 400
        elif type(discount) != int:
            return {"message": "the type of discount must be integer"}, 400
        

        #checking if this product name already exists or not
        cp1 = Product.query.filter(Product.product_name == product_name).first()
        if cp1 is not None:
            return {"status": "failed", "message": "This product name already exists"}, 400
        if cp1 is None:

            #adding new product to the product table
            p1 = Product(product_name = product_name, price_unit=price_unit, unit=unit, manufac_date = manufac_year, exp_date = exp_year, quantity=qty, discount=discount,mgr_id=mgr_id)
            db.session.add(p1)
            db.session.commit()

            #adding category-product relation inside categoryProduct table
            # c1 = Category.query.get(categoryId)
            p1_ = Product.query.filter(Product.product_name == product_name).first()

            cp1 = Category_product(cp_category_id = categoryId, cp_product_id = p1_.product_id)
            db.session.add(cp1)
            db.session.commit()

            # Clear the cache for all products upon adding a new product
            cache.delete('all_productsKP')

            # Clear the cache for perticular category products
            cache.delete_memoized(all_products_of_perticular_category)

            return {"message": "Product added successfully"}, 200
    
    @auth_required("token")
    @roles_required("manager")
    def put(self, productId):
        productId = int(productId)
        p = Product.query.get(productId)
        if p is None:
            return {"status": "failed", "message": "There is no product with this id"}, 404
        if p is not None:
            info = parser.parse_args()
            print(info['price_unit'])
            print(info['product_name'])

            product_name = info['product_name']
            price_unit = info['price_unit']
            # price_unit = int(price_unit)
            unit = info['unit']
            manufac_year = info['manufac_date']
            exp_year = info['exp_date']
            qty = info['qty']
            # qty = int(qty)
            discount = info['discount']
            # discount = int(discount)
            # print(product_name)
            # print(price_unit)
            # print(unit)
            # print(manufac_year)
            # print(exp_year)
            # print(qty)
            # print(discount)

            # converting to integer
            try:
                price_unit = int(price_unit)
                qty = int(qty)
                discount = int(discount)
            except Exception as e:
                return {"message": "Data type of some entered value is not correct"}


            # validation of user sent data
            if type(product_name) != str:
                return {"message": "product name must be string"}, 400
            elif type(price_unit) != int:
                return {"message": "price of the product must be numeric"}, 400
            elif type(unit) != str:
                return {"message": "unit must be string type"}, 400
            elif type(qty) != int:
                return {"message": "quantity of the product must be integer"}, 400
            elif type(discount) != int:
                return {"message": "the type of discount must be integer"}, 400

            p.product_name =product_name
            p.price_unit = price_unit
            p.unit = unit
            p.manufac_date = manufac_year
            p.exp_date = exp_year
            p.quantity = qty
            p.discount = discount

            db.session.commit()

            # Clear the cache for all products upon adding a new product
            cache.delete('all_productsKP')

            # Clear the cache for perticular category products
            cache.delete_memoized(all_products_of_perticular_category)

            return {"message": "Successfully updated the product"}, 200
        
    @auth_required("token")
    @roles_required("manager")
    def delete(self, pId):
        productId = int(pId)
        p = Product.query.get(productId)
        if p is None:
            return {"status": "failed", "message": "There is no product with this id"}, 404
        if p is not None:

            #deleting all the relation from category product table belonging to this product
            cp1 = Category_product.query.filter(Category_product.cp_product_id == productId).all()
            for cp in cp1:
                db.session.delete(cp)
                db.session.commit()
            
            db.session.delete(p)
            db.session.commit()

            # Clear the cache for all products upon adding a new product
            cache.delete('all_productsKP')

            # Clear the cache for perticular category products
            cache.delete_memoized(all_products_of_perticular_category)

            return {"message": "product deleted successfully"}, 200




# api.add_resource(Api_product, "/api/all_products", "/api/add_product/<int:categoryId>", "/api/update_product/<int:productId>", "/api/delete_product/<int:pId>")
api.add_resource(Api_product, "/all_products", "/add_product", "/update/product/<int:productId>", "/delete/product/<int:pId>")