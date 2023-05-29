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
    new_raid = DbRaidInfo(
        name=body.name,
        date=datetime.fromisoformat(body.date),
        people=[DbPerson(name=name) for name in body.people],
        drops=[DbItem(name=name) for name in body.drops],
    )

    db.session.add(new_raid)
    db.session.commit()
    print(body)
    return {}
