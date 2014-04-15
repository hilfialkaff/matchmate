from flask import render_template, request, g, url_for, flash, redirect
from flask.ext.login import login_required, login_user

from application import app, db
from models.user import User
from models.question import Question

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/questions')
@login_required
def questions():
    return render_template('questions.html')

@app.route('/matchmate')
@login_required
def matchmate():
    return render_template('matchmate.html')

@app.route('/details')
@login_required
def details():
    return render_template('details.html')

@app.route('/_get_facebook_login')
def _get_facebook_login():
    facebook_id = request.args.get('facebook_id', False, type=int)
    username = request.args.get('name', '', type=str)

    user = User.query.filter_by(_username=username).first()
    if not user:
        user = User(username, facebook_id)
        db.session.add(user)
        db.session.commit()
    login_user(user)

    if user.has_answered():
        return url_for('matchmate')
    else:
        return url_for('details')
