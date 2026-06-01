from backend.models.serviceman import Serviceman
from backend.database import db

def assign_serviceman(service_type):
    available = Serviceman.query.filter_by(skill=service_type, is_available=True).first()
    if available:
        available.is_available = False
        db.session.commit()
        return available.id
    return None
