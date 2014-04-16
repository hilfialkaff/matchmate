from application import db, create_app
from models import *

QUESTION_FILE = "./files/questions.csv"

def main():
    user1 = User('x', 123, 'x', True)
    user2 = User('y', 124, 'y', True)
    user3 = User('z', 125, 'z', True)

    questions = Question.query.all()
    count = 0
    for question in questions:
        answer1 = Answer(question._id, False, 2)
        answer2 = Answer(question._id, False, 3)
        answer3 = Answer(question._id, True if count % 2 else False, 3)

        user1._answers.append(answer1)
        user2._answers.append(answer2)
        user3._answers.append(answer3)

        db.session.add(answer1)
        db.session.add(answer2)
        db.session.add(answer3)
        count += 1
    db.session.commit()

if __name__ == "__main__":
    import models
    app = create_app()
    main()
