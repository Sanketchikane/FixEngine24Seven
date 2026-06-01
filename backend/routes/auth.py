from flask import Blueprint, request, jsonify
from backend.models.user import User
from backend.database import db
from werkzeug.security import generate_password_hash, check_password_hash

bp = Blueprint('auth', __name__, url_prefix='/api/auth')

@bp.route('/register', methods=['POST'])
def register():
    data = request.json
    if User.query.filter_by(username=data['username']).first():
        return jsonify({'message': 'Username already exists'}), 409

    hashed_pw = generate_password_hash(data['password'], method='sha256')
    user = User(
        name=data['name'],
        username=data['username'],
        password=hashed_pw,
        contact=data['contact'],
        role=data.get('role', 'user')
    )
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'Registration successful'}), 201

@bp.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(username=data['username']).first()
    if not user or not check_password_hash(user.password, data['password']):
        return jsonify({'message': 'Invalid credentials'}), 401

    return jsonify({
        'message': 'Login successful',
        'user': {
            'id': user.id,
            'name': user.name,
            'username': user.username,
            'role': user.role
        }
    })
