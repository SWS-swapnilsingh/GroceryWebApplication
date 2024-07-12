from celery import shared_task
from .models import Product
import flask_excel as excel
from .mail_service import send_message
from .models import User, Role, Orders
from jinja2 import Template
# from json import dumps
# from httplib2 import Http
from datetime import date
from sqlalchemy import and_
from flask_security import auth_required, roles_required, current_user

#agar ignore_result equal to True hoga tab result backend me store nhi hoga
#aur yha par hum log task ka result store karna chahte hai isiliye humlog yha par ignore_result equal to True de rhe hai

#with decorator shared_task you do not need to mention celery instance, because shared_tasks are independent of celery instance means you can use this shared task with multiple applications
#using shared_task decorator is a good practice
# @shared_task(ignore_result=False)
# def say_hello():
#     return "Say Hello"

@shared_task(ignore_result=False)
def create_resource_csv():
    Product_details = Product.query.with_entities(Product.product_id, Product.product_name, Product.price_unit, Product.quantity).all()
    # print(Product_details)
    csv_output = excel.make_response_from_query_sets(Product_details, ["product_id", "product_name", "price_unit", "quantity"], "csv", filename="test1.csv")
    filename= "test.csv"

    #here I am opening this file in binary writing mode. kyoki jab 'wb' mode me file opend karte ho to write ke time system koi bhi data me changes nhi karta hai
    #agar file ko khali text mode me open karoge to har line ke end me end batane wala character aa jata hai
    with open(filename, 'wb') as f:
        f.write(csv_output.data)
    
    return filename


# @shared_task(ignore_result=False)
# def daily_reminder(message):
#     return message
    
# @shared_task(ignore_result=True)
# def daily_reminder(to, subject):
#     #User.roles: This refers to a relationship or attribute in the User model that represents a collection of roles associated with each user.
#     #.any(): This is a method used in SQLAlchemy to check if any element in a collection (in this case, roles associated with a user) satisfies a given condition.
#     users = User.query.filter(User.roles.any(Role.name == 'admin')).all()
#     for user in users:
#         with open('test.html', 'r') as f:
#             template = Template(f.read())
#             send_message(user.email, subject, template.render(email=user.email))
#     return "OK"



@shared_task(ignore_result=True)
def daily_reminder(to, subject):
    
    users = User.query.filter(User.roles.any(Role.name == 'normal_user')).all()
    for user in users:
        todays_date = str(date.today())
        # print(todays_date,'***************************')
        todays_orders = Orders.query.filter(and_(Orders.date == todays_date, Orders.user_id == user.id)).first()
        # print(todays_orders)
        if todays_orders is None:
            with open('application/dailyReminder.html', 'r') as f:
                template = Template(f.read())
                send_message(user.email, subject, template.render(email=user.email), type='html')
    return "OK"

@shared_task(ignore_result=True)
def monthly_reminder(to, subject):
    
    users = User.query.filter(User.roles.any(Role.name == 'normal_user')).all()
    for user in users:
        all_orders = Orders.query.filter(Orders.user_id == user.id).all()
        no_of_orders = 0
        total_exp = 0
        type = user.type
        # print(type, "****************************")
        #this code will not work if you are moving from dec to jan

        #THIS IS FOR PREVIOUS MONTH (ACTUAL CODE)
        for order in all_orders:
            if int(order.date[:4]) == int(str(date.today())[:4]):
                if int(order.date[5:7]) == int(str(date.today())[5:7]) -1:
                    total_exp += order.price
                    no_of_orders += 1
            elif int(order.date[:4]) == int(str(date.today())[:4])-1:
                if int(order.date[5:7]) == 12:
                    total_exp += order.price
                    no_of_orders += 1

        #THIS IS FOR ENTIRE ORDER JUST FOR CHECKING PURPOSE
        # for order in all_orders:
        #     total_exp += order.price
        #     no_of_orders += 1

        if type == 'html':
            filename = 'application/progressReport.html'
        elif type != 'html':
            filename = 'application/progressReport.pdf'

        with open(filename, 'r') as f:
            template = Template(f.read())
            # send_message(user.email, subject, template.render(no_of_orders = no_of_orders, total_exp = total_exp))
            if no_of_orders == 0:
                message = "We understand that you not have made a purchase with us this month, but we still value your patronage. We hope to see you again soon and serve you better."
                send_message(user.email, subject, template.render(no_of_orders = no_of_orders, total_exp=total_exp, message=message), type)
            if no_of_orders != 0:
                message = "We hope you enjoyed your shopping experience with us. We are committed to providing you with the best possible service and look forward to your next visit."
                send_message(user.email, subject, template.render(no_of_orders = no_of_orders, total_exp=total_exp, message=message), type)
    return "OK"


#checking google chat webhook
# @shared_task(ignore_result = False)
# def daily_reminder():
#     """Google Chat incoming webhook quickstart."""
#     url = "https://chat.googleapis.com/v1/spaces/SPACE_ID/messages"
#     app_message = {"text": "Hello from a Python script!"}
#     message_headers = {"Content-Type": "application/json; charset=UTF-8"}
#     http_obj = Http()
#     response = http_obj.request(
#         uri=url,
#         method="POST",
#         headers=message_headers,
#         body=dumps(app_message),
#     )
#     print(response)
    

