from application import db

class Question(db.Model):
    __tablename__ = 'questions'

    _id = db.Column(db.Integer, db.Sequence('question_id_seq'), primary_key=True)
    _name = db.Column(db.String(100), nullable=False)
    _type = db.Column(db.Integer, unique=True)

    def __init__(self, name, type):
        self._name = name
        self._type = type

    def __repr__(self):
        return '<Question %s>' % (self._name)
