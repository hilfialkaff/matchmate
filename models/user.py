from application import db

class User(db.Model):
    __tablename__ = 'users'

    _id = db.Column(db.Integer, db.Sequence('user_id_seq'), primary_key=True)
    _username = db.Column(db.String(100), nullable=False, unique=True)
    _facebook_id = db.Column(db.Integer, nullable=False, unique=True)
    _has_answered = db.Column(db.Boolean)
    _answers = db.relationship("Answer", backref="user", cascade="all, delete, delete-orphan")

    def __init__(self, username, facebook_id):
        self._username = username
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
