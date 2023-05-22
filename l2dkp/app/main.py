import pathlib
from flask import Flask, request, make_response

from .config import Config
from .routers.v1 import blueprint as v1_blueprint
from .extensions import db
from typing import Type, Any



# TODO Flask automatically detects this method as an entrypoint
def create_app(config_class: Type[Any] = Config) -> Flask:
    app = Flask(__name__)
    app.config.from_object(config_class)

    ### CORS section    # TODO temporary?
    @app.after_request
    def after_request_func(response):
        origin = request.headers.get('Origin')
        if request.method == 'OPTIONS':
            response = make_response()
            response.headers.add('Access-Control-Allow-Credentials', 'true')
            response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
            response.headers.add('Access-Control-Allow-Headers', 'x-csrf-token')
            response.headers.add('Access-Control-Allow-Methods',
                                'GET, POST, OPTIONS, PUT, PATCH, DELETE')
            if origin:
                response.headers.add('Access-Control-Allow-Origin', origin)
        else:
            response.headers.add('Access-Control-Allow-Credentials', 'true')
            if origin:
                response.headers.add('Access-Control-Allow-Origin', origin)

        return response

    # Web app
    @app.route('/', defaults={'path': 'index.html'})
    @app.route('/app/', defaults={'path': 'index.html'})
    @app.route('/app/<path:path>')
    def catch_all(path):
        static_folder_path = pathlib.Path(app.static_folder)
        static_path = static_folder_path / path

        if static_path.is_file():
            return app.send_static_file(path)
        else:
            return app.send_static_file(path + ".html")

    # Extensions
    db.init_app(app)

    # Blueprints
    app.register_blueprint(v1_blueprint, url_prefix="/api/v1")

    return app


def init_db():
    from . import models

    app = create_app()

    with app.app_context():
        db.create_all()

    # db.drop_all()
    # TODO add migration function too


    # with app.
# TODO should I use `start.env = {FLASK_ENV = "development"}` or it's always development


