from flask import Blueprint, request, jsonify
from backend.models.serviceman import Serviceman
from backend.database import db

bp = Blueprint('admin', __name__, url_prefix='/api/admin')

@bp.route('/add_serviceman', methods=['POST'])
def add_serviceman():
    data = request.json
    serviceman = Serviceman(
        name=data['name'],
        skill=data['skill'],
        contact=data['contact']
    )
    db.session.add(serviceman)
    db.session.commit()
    return jsonify({'message': 'Serviceman added successfully'}), 201

@bp.route('/servicemen', methods=['GET'])
def get_servicemen():
    servicemen = Serviceman.query.all()
    return jsonify([{
        'id': s.id,
        'name': s.name,
        'skill': s.skill,
        'contact': s.contact,
        'available': s.is_available
    } for s in servicemen])
