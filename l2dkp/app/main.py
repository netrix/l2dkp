import pathlib
from typing import Any, Type

from flask import Flask, make_response, request
from flask_login import LoginManager

from .config import Config
from .extensions import db
from .models import User  # TODO move it out of here
from .routers.raids.v1 import blueprint as raids_v1_blueprint


# TODO Flask automatically detects this method as an entrypoint
def create_app(config_class: Type[Any] = Config) -> Flask:
    app = Flask(__name__)
    app.config.from_object(config_class)

    # *** CORS section ***    # TODO temporary?
    @app.after_request
    def after_request_func(response):
        origin = request.headers.get("Origin")
        if request.method == "OPTIONS":
            response = make_response()
            response.headers.add("Access-Control-Allow-Credentials", "true")
            response.headers.add("Access-Control-Allow-Headers", "Content-Type")
            response.headers.add("Access-Control-Allow-Headers", "x-csrf-token")
            response.headers.add(
                "Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE"
            )
            if origin:
                response.headers.add("Access-Control-Allow-Origin", origin)
        else:
            response.headers.add("Access-Control-Allow-Credentials", "true")
            if origin:
                response.headers.add("Access-Control-Allow-Origin", origin)

        return response

    # Web app
    @app.route("/", defaults={"path": "index.html"})
    @app.route("/app/", defaults={"path": "index.html"})
    @app.route("/app/<path:path>")
    def catch_all(path):
        static_folder_path = pathlib.Path(app.static_folder)
        static_path = static_folder_path / path

        if static_path.is_file():
            return app.send_static_file(path)
        else:
            return app.send_static_file(path + ".html")

    # Extensions
    db.init_app(app)

    login_manager = LoginManager()
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(user_id):
        # since the user_id is just the primary key of our user table, use it in the query for the user
        return User.query.get(int(user_id))

    # Blueprints
    app.register_blueprint(raids_v1_blueprint, url_prefix="/api/raids/v1")

    return app


def init_db():
    from . import models  # noqa F401 - models must be loaded for db.create_all()

    app = create_app()

    with app.app_context():
        db.create_all()

    # db.drop_all()
    # TODO add migration function too

    # with app.


# TODO should I use `start.env = {FLASK_ENV = "development"}` or it's always development
