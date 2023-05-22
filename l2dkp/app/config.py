import os
import pathlib


BASE_DIR = pathlib.Path(__file__).parent
SQLITE_DB_PATH = BASE_DIR / "local.db"
SQLITE_DB_URI = f"sqlite:///{SQLITE_DB_PATH.as_posix()}"


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URI') or SQLITE_DB_URI      # TODO use mysql for production.
    SQLALCHEMY_TRACK_MODIFICATIONS = False
