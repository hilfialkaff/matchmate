from flask import render_template, request, g, url_for, flash, redirect, session
from flask.ext.login import login_required, login_user, current_user
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
    if current_user.has_answered():
        return redirect(url_for('matchmate'))

    return render_template('questions.html')

@app.route('/matchmate')
@login_required
def matchmate():
    return render_template('matchmate.html')

@app.route('/details')
@login_required
def details():
    if current_user.has_answered():
        return redirect(url_for('matchmate'))

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
    actual_name = request.args.get('name', "", type=str)
    gender = request.args.get('gender', None, type=bool)
    mate_gender = request.args.get('mate_gender', None, type=bool)

    current_user.set_actual_name(actual_name)
    current_user.set_gender(gender)
    current_user.set_mate_gender(mate_gender)

    db.session.add(current_user)
    db.session.commit()
    return ""

@app.route('/_set_user_answers', methods=['POST'])
def _set_user_answers():
    answers = request.json["answers"]
    user = current_user

    for question_id, answer in answers.items():
        answer = Answer(question_id, answer["val"], answer["weight"])
        user._answers.append(answer)
        db.session.add(answer)
    db.session.commit()

    return ""

@app.route('/_get_other_users')
def _get_other_users():
    users = User.query.filter(User._id != current_user._id).all()
    response = json.dumps({'users':
        [{"id" : user._id, "name" : user._actual_name} for user in users]})

    return response

@app.route('/_get_user_info')
def _get_user_info():
    user = User.query.filter_by(_id = current_user._id).first()
    response = json.dumps({"name" : user._actual_name, "gender" : user._gender, \
        "mate_gender" : user._mate_gender})

    return response

@app.route('/_get_questions')
def _get_questions():
    questions = Question.query.all()
    response = json.dumps({'questions' : \
        [{"id" : q._id, "name" : q._name, "category" : q._category_id} for q in questions]})

    return response

@app.route('/_get_user_answer')
def _get_user_answer():
    user_id = request.args.get('id', current_user._id, type=int)
    user = User.query.filter_by(_id = user_id).first()
    answers = get_user_answer(user)

    return json.dumps({"answers" : answers})

def get_user_answer(user):
    answers = []

    for answer in user._answers:
        question = Question.query.filter_by(_id = answer._question_id).first()
        answers.append({"qid" : question._id, "name" : question._name, \
            "category" : question._category_id, "val" : answer._answer, "weight" : answer._weight})

    return answers

@app.route('/_do_algorithm')
def _do_algorithm():
    user1_id = request.args.get('user1', current_user._id, type=int)
    user2_id = request.args.get('user2', None, type=int)

    user1 = User.query.filter_by(_id = user1_id).first()
    user2 = User.query.filter_by(_id = user2_id).first()

    match = compute_match(user1, user2)
    return json.dumps({"match" : match})

def compute_match(user1, user2):
    user1_score = 0.0
    user2_score = 0.0
    user1_max_score = 0
    user2_max_score = 0

    for user1_answer, user2_answer in zip(user1._answers, user2._answers):
        if user1_answer._answer == user2_answer._answer:
            user1_score += Answer.WEIGHTS[user2_answer._weight-1]
            user2_score += Answer.WEIGHTS[user1_answer._weight-1]
        user1_max_score += Answer.WEIGHTS[user2_answer._weight-1]
        user2_max_score += Answer.WEIGHTS[user1_answer._weight-1]

    if user1_max_score == 0:
        user1_max_score = 1
    if user2_max_score == 0:
        user2_max_score = 1

    match = ((user1_score / user1_max_score) * (user2_score / user2_max_score))**0.5
    return match

@app.route('/_find_best_mate')
def _find_best_mate():
    users = User.query.filter_by(_gender = current_user._mate_gender) \
        .filter(User._id != current_user._id).all()

    best_score = 0.0
    best_match = None

    for user in users:
        score = compute_match(current_user, user)
        if score > best_score:
            best_score = score
            best_match = user

    answers = get_user_answer(best_match)
    return json.dumps({"id" : user._id, "name" : user._actual_name, "answers" : answers})
