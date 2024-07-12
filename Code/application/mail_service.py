# we are using smtplib library for creating smtp client
from smtplib import SMTP
#mime type declares the content type of your message in the email
#if you use this MIMEMultipart class in order to create a message then that message will be multipart mtlab that message will have multiple parts
from email.mime.multipart import MIMEMultipart
#this is also another mime type and this mime type is used to create message whose content type is text; it can be text/plain or text/html
from email.mime.text import MIMEText
import smtplib
from jinja2 import Template

#these are the configureations which are required for mail service to work
SMTP_HOST = "localhost"          #server address
SMTP_PORT = 1025
#you can put any dummy email id here when you are testing
SENDER_EMAIL = '22f1000761@ds.study.iitm.ac.in'
#in password you can write anything since it is just dummy
SENDER_PASSWORD = ''

#this sending email has two parts
    # * first part is creating a message and,
    # * second part is creating a smtp client and then sending a message


def send_message(to, subject, content_body, type):
    msg = MIMEMultipart()
    msg["To"]=to
    msg["Subject"]=subject
    msg["From"]=SENDER_EMAIL
    msg.attach(MIMEText(content_body, type))

    #here we are creating smtp client
    client = SMTP(host=SMTP_HOST, port=SMTP_PORT)
    client.send_message(msg=msg)
    #here we are teminating the client
    client.quit()