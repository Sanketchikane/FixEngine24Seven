from flask import Blueprint

bp = Blueprint('payment', __name__, url_prefix='/payment')

@bp.route('/test')
def test():
    return {"message": "Payment route is working"}
