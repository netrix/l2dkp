from flask import Blueprint, Response, abort
from flask_login import login_required, login_user, logout_user
from flask_pydantic import validate
from werkzeug.security import check_password_hash, generate_password_hash

from l2dkp.app.extensions import db
from l2dkp.app.models import User as DbUser

from .models import LoginBody, SignupBody

blueprint = Blueprint("auth_v1", __name__)


# TODO change to jwt? https://www.geeksforgeeks.org/using-jwt-for-user-authentication-in-flask/
@blueprint.route("/login", methods=["POST"])
@validate()
def login(body: LoginBody) -> Response:
    user = DbUser.query.filter_by(login=body.login).first()

    if not user or not check_password_hash(user.password, body.password):
        return abort(401)

    login_user(user, remember=body.remember)
    # return Response({}, status=200)
    return {}


@blueprint.route("/register", methods=["POST"])
@validate()
def signup(body: SignupBody) -> Response:
    user = DbUser.query.filter_by(login=body.login).first()

    if user:
        return abort(409)  # user already exists # some better handling, message or whatever

    new_user = DbUser(
        login=body.login,
        password=generate_password_hash(password=body.password, method="scrypt:32768:8:1"),
    )

    db.session.add(new_user)
    db.session.commit()

    login_user(new_user)

    return {}


@blueprint.route("/logout", methods=["POST"])
@login_required
def logout():
    logout_user()
    return {}
