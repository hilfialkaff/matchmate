import argparse

from application import create_app, db
from models import Question

QUESTION_FILE = "./files/questions.csv"

def populate():
    questions_exist = Question.query.all()
    if questions_exist:
        return

    with open(QUESTION_FILE) as f:
        for line in f:
            [question, type] = line.strip('\n').split(',')
            new_question = Question(question, type)

            db.session.add(new_question)
        db.session.commit()

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--reset_db", action='store_true', help="Delete all code in database")

    import controllers
    import models

    args = parser.parse_args()

    app = create_app()
    if args.reset_db:
        db.drop_all()
    db.create_all()

    populate()
    app.run(host=app.config['HOST'], port=app.config['PORT'])

if __name__ == '__main__':
    main()
