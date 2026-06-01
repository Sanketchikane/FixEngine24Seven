from flask import Blueprint, jsonify
from backend.models.serviceman import Serviceman

bp = Blueprint('common', __name__, url_prefix='/api/common')

@bp.route('/services', methods=['GET'])
def get_services():
    servicemen = Serviceman.query.all()
    services = list(set([s.skill for s in servicemen]))
    return jsonify(services)
