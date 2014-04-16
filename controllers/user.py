from flask import render_template, request, g, url_for, flash, redirect, session
from flask.ext.login import login_required, login_user
import json

from application import app, db
from models.user import User
from models.question import Question
from models.answer import Answer

@app.route('/')
def home():
    error = None
    if 'error' in session:
        error = session['error']
        session['error'] = None

    return render_template('index.html', error=error)

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
    facebook_name = request.args.get('facebook_name', '', type=str)
    actual_name = request.args.get('actual_name', '', type=str)
    gender  = request.args.get('gender', '', type=str)

    if (gender == "male"): gender = True
    elif (gender == "female"): gender = False
    else: gender = None

    user = User.query.filter_by(_facebook_name = facebook_name).first()
    if not user:
        user = User(facebook_name, facebook_id, actual_name, gender)
        db.session.add(user)
        db.session.commit()
    login_user(user)

    if user.has_answered():
        return url_for('matchmate')
    else:
        return url_for('details')

@app.route('/_set_user_info')
def _set_user_info():
    user = g.user
    actual_name = request.args.get('name', "", type=str)
    gender = request.args.get('gender', None, type=bool)
    mate_gender = request.args.get('mate_gender', None, type=bool)

    user.set_actual_name(actual_name)
    user.set_gender(gender)
    user.set_mate_gender(mate_gender)

    db.session.add(user)
    db.session.commit()
    return ""

@app.route('/_set_user_answers')
def _set_user_answers():
    user = g.user
    answers = request.args.get('questions')

    for question_id, answer in answers.items():
        answer = Answer(question_id, answer['val'], answer['weight'])
        user.answers.append(answer)
        db.session.add(answer)
    db.session.commit()

@app.route('/_get_other_users')
def _get_other_users():
    users = User.query.filter(User._id != g.user._id).all()
    response = json.dumps({'users':
        [{"id" : user._id, "name" : user._actual_name} for user in users]})

    return response

@app.route('/_get_user_info')
def _get_user_info():
    user = User.query.filter_by(_id = g.user._id).first()
    response = json.dumps({"name" : user._actual_name, "gender" : user._gender, \
        "mate_gender" : user._mate_gender})

    return response

@app.route('/_get_user_answer')
def _get_user_answer():
    user_id = request.args.get('id', current_user._id, type=int)
    user = User.query.filter_by(_id = user_id).first()
    return ""
