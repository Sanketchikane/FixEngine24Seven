from flask import Blueprint, request, jsonify
from backend.models.booking import Booking
from backend.models.user import User
from backend.database import db
from datetime import datetime

bp = Blueprint('user', __name__, url_prefix='/api/user')

@bp.route('/book', methods=['POST'])
def book_service():
    data = request.json
    booking = Booking(
        user_id=data['user_id'],
        serviceman_id=data['serviceman_id'],
        service_type=data['service_type'],
        scheduled_time=datetime.strptime(data['scheduled_time'], "%Y-%m-%d %H:%M")
    )
    db.session.add(booking)
    db.session.commit()
    return jsonify({'message': 'Booking successful'}), 201

@bp.route('/bookings/<int:user_id>', methods=['GET'])
def get_user_bookings(user_id):
    bookings = Booking.query.filter_by(user_id=user_id).all()
    result = [{
        'id': b.id,
        'service_type': b.service_type,
        'status': b.status,
        'scheduled_time': b.scheduled_time.strftime("%Y-%m-%d %H:%M")
    } for b in bookings]
    return jsonify(result)
