import argparse

from application import create_app, db

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument("--reset_db", action='store_true', help="Delete all code in database")

    import controllers
    import models

    args = parser.parse_args()
    if args.reset_db:
        db.drop_all()

    app = create_app()
    app.run(host=app.config['HOST'], port=app.config['PORT'])
