from application import db

class Answer(db.Model):
    __tablename__ = 'answers'

    _id = db.Column(db.Integer, db.Sequence('answer_id_seq'), primary_key=True)
    _question_id = db.Column(db.Integer, nullable=False)
    _answer = db.Column(db.Boolean)
    _user_id = db.Column(db.Integer, db.ForeignKey('users._id'))

    def __init__(self, name, type):
        self._name = name
        self._type = type

    def __repr__(self):
        return '<Answer %s>' % (self._name)
