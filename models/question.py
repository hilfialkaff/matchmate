from application import db

class Question(db.Model):
    __tablename__ = 'questions'

    _id = db.Column(db.Integer, db.Sequence('question_id_seq'), primary_key=True)
    _name = db.Column(db.String(100), nullable=False)
    _category_id = db.Column(db.Integer, nullable=False)

    def __init__(self, name, category_id):
        self._name = name
        self._category_id = category_id

    def __repr__(self):
        return '<Question %s>' % (self._name)
