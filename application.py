from flask import Flask, g, session, request, url_for, render_template, flash, redirect
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.login import LoginManager, current_user

__all__ = ["create_app"]

APP_NAME = "matchmate"
APP_CONFIG = "config.Config"

app = Flask(__name__)
db = SQLAlchemy(app)
login_manager = LoginManager()

def create_app():
    app.config.from_object(APP_CONFIG)

    configure_errorhandlers()
    configure_login_manager()

    return app

def configure_errorhandlers():
    """ Setup error handlers. """

    @app.errorhandler(404)
    def page_not_found(error):
        return '404 PUNK.'

def configure_login_manager():
    global login_manager

    login_manager.init_app(app)
    login_manager.login_view = 'home'
    login_manager.login_message = "Please log in first"

    @login_manager.unauthorized_handler
    def unauthorized():
        session['error'] = login_manager.login_message
        return redirect(url_for('home'))

@login_manager.user_loader
def load_user(user_id):
    from models.user import User
    return User.query.get(int(user_id))
