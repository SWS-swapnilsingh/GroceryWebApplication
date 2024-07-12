from flask_sqlalchemy import SQLAlchemy
from flask_security import UserMixin, RoleMixin

db = SQLAlchemy()

class RolesUsers(db.Model):
    __tablename__ = 'roles_users'
    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column('user_id', db.Integer(), db.ForeignKey('user.id'))
    role_id = db.Column('role_id', db.Integer(), db.ForeignKey('role.id'))


#iske andar saare users hoge including students, admin, instructors
class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=False)
    email = db.Column(db.String, unique=True)
    password = db.Column(db.String(255))
    active = db.Column(db.Boolean())
    type = db.Column(db.String(30), default='html')
    fs_uniquifier = db.Column(db.String(255), unique=True, nullable=False)      #fs_uniquifier ka use humglo ek unique code generate karne me karenge kyoki humlog token based authentication use karne wale hai
    roles = db.relationship('Role', secondary='roles_users',
                            backref=db.backref('users', lazy='dynamic'))
    



#iss table me role define kiya jaayega ki kon sa user kya hai
class Role(db.Model, RoleMixin):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(80), unique=True)
    description = db.Column(db.String(255))


class Category(db.Model):
    __tablename__ = 'category'
    category_id = db.Column(db.Integer(), primary_key = True, autoincrement = True)
    category_name = db.Column(db.String(), unique = True, nullable = False)
    is_approved = db.Column(db.Boolean(), default=False) 
    all_product = db.relationship('Product', backref = "all_category", secondary = "category_product")


#'product' table aur 'category' table me many-to-many relationship hai aur
#'user' table aur 'product' table me one-to-many relationship hai
class Product(db.Model):
     __tablename__ = 'product'
     product_id = db.Column(db.Integer(), primary_key = True, autoincrement = True)
     product_name = db.Column(db.String(),unique = True, nullable = False)
     price_unit = db.Column(db.Integer(), nullable = False)
     unit = db.Column(db.String(), nullable = False)
     manufac_date = db.Column(db.String(),unique = False, nullable = False)
     exp_date = db.Column(db.String(),unique = False, nullable = False)
     quantity = db.Column(db.Integer(), unique = False, nullable = False)
     discount = db.Column(db.Integer(), nullable = False)
     #manager id yha par store kar rhe hai taaki pata chal sake ki kon se mgr kis product ko create kiya hai
     mgr_id = db.Column(db.Integer(), db.ForeignKey('user.id'), nullable= False)


class Category_product(db.Model):
     __tablename__ = 'category_product'
     cp_id = db.Column(db.Integer(), primary_key = True, autoincrement = True)
     cp_category_id = db.Column(db.Integer(), db.ForeignKey("category.category_id"), nullable = False)
     cp_product_id = db.Column(db.Integer(), db.ForeignKey("product.product_id"), nullable = False)

class ShoppingCart(db.Model):
    item_id = db.Column(db.Integer(), primary_key = True, autoincrement=True)
    product_name = db.Column(db.String(), nullable = False)
    price_unit = db.Column(db.Integer(), nullable = False)
    #agar same product dubara se add ho rha hai to tum bas uski quantitiy bda do
    quantity = db.Column(db.Integer(), nullable = False)
    unit = db.Column(db.String(), nullable = False)
    total_price = db.Column(db.Integer(), nullable = False)
    #taki perticular user ke cart me usi ki cheeje show kar sake; foreign key honi chahiye par nhi bna rhe hai
    user_id = db.Column(db.Integer(), nullable = False)


class Orders(db.Model):
    order_id = db.Column(db.Integer(), primary_key = True, autoincrement=True)
    product_id = db.Column(db.Integer(), nullable=False)
    user_id = db.Column(db.Integer(), nullable=False)
    date = db.Column(db.String(), nullable=False)
    price = db.Column(db.Integer(), nullable=False)
    




