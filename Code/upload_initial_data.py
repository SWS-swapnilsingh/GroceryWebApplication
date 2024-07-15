from main import app
from application.sec import datastore
from application.models import db, Role
from flask_security import hash_password
from werkzeug.security import generate_password_hash

#not part of original code
from application.models import db, Category, Category_product, Product



#agar koi cheej hai jisko run karne ke liye application level data chahiye to use humlogo ko app context ke andar run karna padega otherwise error aayegi
#in our case we need database uri which is application level data

# with app.app_context():
#     db.create_all()

#     # datastore.find_or_create_role(name="admin", description="User is an admin")
#     datastore.find_or_create_role(name="admin", description="User is an admin")
#     datastore.find_or_create_role(name="manager", description="User is a Manager")
#     datastore.find_or_create_role(name="normal_user", description="User is a normal_user")
#     db.session.commit()
#     if not datastore.find_user(email='admin@email.com'):
#         datastore.create_user(username="Admin", email="admin@email.com", password=generate_password_hash("Aa1@"), roles=["admin"])      #its a many to many relationship to the user can have many roles; roles ke andar list hi paas karte hai agar nhi karoge to error aayega
#     #I'm creating these here bcz I don't want them to create everytime, but in actual they should not be here.
#     if not datastore.find_user(email="mgr1@email.com"):
#         datastore.create_user(username="Manager1", email="mgr1@email.com", password=generate_password_hash("Mm1@"), roles=["manager"], active=False)
#     if not datastore.find_user(email="user1@email.com"):
#         datastore.create_user(username="ram", email="user1@email.com", password=generate_password_hash("Uu1@"), roles=["normal_user"])
    
#     db.session.commit()

#deployment config
run_first_time = True
if run_first_time:
    with app.app_context():
        db.drop_all()
        db.create_all()

        # datastore.find_or_create_role(name="admin", description="User is an admin")
        datastore.find_or_create_role(name="admin", description="User is an admin")
        datastore.find_or_create_role(name="manager", description="User is a Manager")
        datastore.find_or_create_role(name="normal_user", description="User is a normal_user")
        db.session.commit()
        if not datastore.find_user(email='admin@email.com'):
            datastore.create_user(username="Admin", email="admin@email.com", password=generate_password_hash("Aa1@"), roles=["admin"])      #its a many to many relationship to the user can have many roles; roles ke andar list hi paas karte hai agar nhi karoge to error aayega
        #I'm creating these here bcz I don't want them to create everytime, but in actual they should not be here.
        if not datastore.find_user(email="mgr1@email.com"):
            datastore.create_user(username="Manager1", email="mgr1@email.com", password=generate_password_hash("Mm1@"), roles=["manager"], active=False)
        if not datastore.find_user(email="user1@email.com"):
            datastore.create_user(username="ram", email="user1@email.com", password=generate_password_hash("Uu1@"), roles=["normal_user"])

            for cname in ['Lunch', 'Dinner', 'BreakFast', 'Fruits']:
                nc1 = Category(category_name = cname, is_approved = True)
                db.session.add(nc1)
                db.session.commit()
        
            p_tuple_list = [(1, 'Rice', 10, 'kg', '12-12-2024', '13-12-2024', 10, 0, 2),
                        (2, 'Salad', 15, 'pc', '12-12-2024', '13-12-2024', 10, 0, 2),
                        (2, 'Curry', 70, 'kg', '12-12-2024', '13-12-2024', 3, 5, 2),
                        (3, 'Milk', 50, 'lt', '12-12-2024', '13-12-2024', 10, 0, 2),
                        (1, 'Chocolate', 20, 'lt', '12-12-2024', '13-12-2024', 10, 10, 2),
                        (1, 'Idli', 18, 'kg', '12-12-2024', '13-12-2024', 10, 20, 2)]
            for (categoryId, product_name, price_unit, unit, manufac_year, exp_year, qty, discount, mgr_id) in p_tuple_list:
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
        run_first_time = False
        
        db.session.commit()



