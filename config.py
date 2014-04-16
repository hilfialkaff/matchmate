import os

class Config(object):
    DEBUG = True
    HOST = '0.0.0.0'
    PORT = 5000
    SQLALCHEMY_DATABASE_URI = 'sqlite:////tmp/flask-starter.db'
    SECRET_KEY = 'Development'
