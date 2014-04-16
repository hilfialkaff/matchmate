from application import db

class User(db.Model):
    __tablename__ = 'users'

    _id = db.Column(db.Integer, db.Sequence('user_id_seq'), primary_key=True)
    _facebook_name = db.Column(db.String(100), nullable=False, unique=True)
    _facebook_id = db.Column(db.Integer, nullable=False, unique=True)
    _actual_name = db.Column(db.String(100))
    _gender = db.Column(db.Boolean) # True = male
    _mate_gender = db.Column(db.Boolean) # True = male

    _has_answered = db.Column(db.Boolean)
    _answers = db.relationship("Answer", backref="user", cascade="all, delete, delete-orphan")

    def __init__(self, facebook_name, facebook_id):
        self._facebook_name = facebook_name
        self._facebook_id = facebook_id
        self._has_answered = False

    def __repr__(self):
        return '<User %s>' % (self._username)

    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        return unicode(self._id)

    def has_answered(self):
        return self._has_answered

    def set_actual_name(self, actual_name):
        self._actual_name = actual_name

    def set_gender(self, gender):
        self._gender = gender

    def set_mate_gender(self, mate_gender):
        self._mate_gender = mate_gender
