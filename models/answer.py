from application import db

class Answer(db.Model):
    __tablename__ = 'answers'

    _id = db.Column(db.Integer, db.Sequence('answer_id_seq'), primary_key=True)
    _question_id = db.Column(db.Integer, db.ForeignKey('questions._id'), nullable=False)
    _answer = db.Column(db.Boolean, nullable=False)
    _weight = db.Column(db.Integer, nullable=False)
    _user_id = db.Column(db.Integer, db.ForeignKey('users._id'))

    def __init__(self, question_id, answer, weight):
        self._question_id = question_id
        self._answer = answer
        self._weight = weight

    def __repr__(self):
        return '<Answer %s>' % (self._question_id)
