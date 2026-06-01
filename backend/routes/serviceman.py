from flask import Blueprint, request, jsonify
from backend.models.booking import Booking
from backend.database import db

bp = Blueprint('serviceman', __name__, url_prefix='/api/serviceman')

@bp.route('/bookings/<int:serviceman_id>', methods=['GET'])
def get_serviceman_bookings(serviceman_id):
    bookings = Booking.query.filter_by(serviceman_id=serviceman_id).all()
    return jsonify([{
        'id': b.id,
        'user_id': b.user_id,
        'service_type': b.service_type,
        'status': b.status,
        'scheduled_time': b.scheduled_time.strftime("%Y-%m-%d %H:%M")
    } for b in bookings])

@bp.route('/update_status', methods=['POST'])
def update_booking_status():
    data = request.json
    booking = Booking.query.get(data['booking_id'])
    if booking:
        booking.status = data['status']
        db.session.commit()
        return jsonify({'message': 'Status updated'})
    return jsonify({'message': 'Booking not found'}), 404
