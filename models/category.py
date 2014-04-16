from application import db

class Category(db.Model):
    __tablename__ = 'categories'

    _id = db.Column(db.Integer, db.Sequence('category_id_seq'), primary_key=True)
    _name = db.Column(db.String(100), nullable=False, unique=True)

    def __init__(self, name):
        self._name = name

    def __repr__(self):
        return '<Category %s>' % (self._name)
