from main import app
from application.sec import datastore
from application.models import db, Role
from flask_security import hash_password
from werkzeug.security import generate_password_hash


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
        run_first_time = False
        
        db.session.commit()



