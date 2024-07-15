from flask import Flask
from flask_security import SQLAlchemyUserDatastore, Security
from application.models import db, User, Role
from config import DevelopmentConfig
from application.resources import api
from application.sec import datastore
from application.worker import celery_init_app
import flask_excel as excel
# from application.tasks import say_hello
from application.tasks import daily_reminder
from application.tasks import monthly_reminder
from celery.schedules import crontab
from application.instances import cache


def create_app():
    app = Flask(__name__)
    app.config.from_object(DevelopmentConfig)    #configurations init ke upar jati hai
    db.init_app(app)
    api.init_app(app)
    excel.init_excel(app)
    app.security = Security(app, datastore)
    cache.init_app(app)
    with app.app_context():
        import application.views
    
    return app


app = create_app()
#yha par celery_init_app function flask app ka instance le rha hai aur celery_app return kar rha hai
celery_app = celery_init_app(app)

# @celery_app.on_after_configure.connect
# def send_email(sender, **kwargs):
#     sender.add_periodic_task(
#         crontab(hour=11, minute=4, day_of_week=0),
#         daily_reminder.s('Daily reminder'),
#     )





# @celery_app.on_after_configure.connect
# def send_daily_reminder_email(sender, **kwargs):
#     sender.add_periodic_task(
#         crontab(hour=23, minute=1),
#         daily_reminder.s('narendra@email.com', "We Missed You Today!"),
#     )


# @celery_app.on_after_configure.connect
# def send_email(sender, **kwargs):
#     sender.add_periodic_task(
#         crontab(hour=16, minute=18, day_of_month='23'),
#         monthly_reminder.s('narendra@email.com', "Monthly Progress Report"),
#     )

if __name__ == '__main__':
    # app.run(debug=True)
    app.run(host='0.0.0.0', port=5000)
