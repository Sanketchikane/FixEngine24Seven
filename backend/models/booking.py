from backend.database import db
from datetime import datetime

class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    serviceman_id = db.Column(db.Integer, db.ForeignKey('serviceman.id'))
    service_type = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(20), default='pending')  # pending, accepted, completed
    scheduled_time = db.Column(db.DateTime, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<Booking {self.id} - {self.status}>"
