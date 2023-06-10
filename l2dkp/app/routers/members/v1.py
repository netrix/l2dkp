
from flask import Blueprint
from flask_pydantic import validate

from l2dkp.app.models import Person as DbPerson

from .models import MembersResponse

blueprint = Blueprint("members_v1", __name__)


@blueprint.route("/")
@validate()
def get_members() -> MembersResponse:
    persons = DbPerson.query.all()
    return MembersResponse.from_db_persons(persons)
