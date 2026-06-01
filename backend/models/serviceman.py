from backend.database import db
from datetime import datetime

class Serviceman(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    skill = db.Column(db.String(100), nullable=False)
    contact = db.Column(db.String(20), nullable=False)
    is_available = db.Column(db.Boolean, default=True)
    joined_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<Serviceman {self.name}>"
