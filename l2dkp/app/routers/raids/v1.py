from datetime import datetime

from flask import Blueprint
from flask_login import login_required
from flask_pydantic import validate

from l2dkp.app.extensions import db
from l2dkp.app.models import Item as DbItem
from l2dkp.app.models import Person as DbPerson
from l2dkp.app.models import Raid as DbRaidInfo

from .models import RaidInfo, RaidsResponse

blueprint = Blueprint("raids_v1", __name__)


@blueprint.route("/")
@validate()
def get_raids() -> RaidsResponse:
    raids = DbRaidInfo.query.all()
    return RaidsResponse.from_db_raids(raids)


@blueprint.route("/", methods=["POST"])
@validate()
@login_required
def add_raid(body: RaidInfo) -> None:
    available_people = [result[0] for result in db.session.execute(db.select(DbPerson).filter(DbPerson.name.in_(body.people))).all()]
    exclude_from_new = [entity.name for entity in available_people]
    new_people = [DbPerson(name=name) for name in body.people if name not in exclude_from_new]
    final_list = available_people + new_people

    new_raid = DbRaidInfo(
        name=body.name,
        date=datetime.fromisoformat(body.date),
        people=final_list,
        drops=[DbItem(name=name) for name in body.drops],
    )

    db.session.add(new_raid)
    db.session.commit()
    return {}


