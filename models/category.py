from application import db

class Category(db.Model):
    __tablename__ = 'categories'

    _id = db.Column(db.Integer, db.Sequence('category_id_seq'), primary_key=True)
    _type = db.Column(db.Integer, nullable=False, unique=True)

    def __init__(self, type):
        self._type = type

    def __repr__(self):
        return '<Category %d>' % (self._type)
