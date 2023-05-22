from flask import Blueprint
from datetime import datetime
from flask_pydantic import validate
from pydantic import BaseModel, Field, validator

from ..models import Raid as DbRaidInfo, Person as DbPerson, Item as DbItem
from ..extensions import db


blueprint = Blueprint("v1", __name__)


class RaidInfo(BaseModel):
    name: str = Field(..., min_length=1)
    date: str = Field(...)
    people: list[str]
    drops: list[str]

    @validator("people", "drops", each_item=True)
    def check_person_name_must_not_be_empty_string(cls, value: str) -> str:
        if len(value) < 1:
            raise ValueError("empty name")       # TODO better desc
        return value

    @classmethod
    def from_db_raid(cls, raid_info: DbRaidInfo) -> "RaidInfo":
        return cls(
            name=raid_info.name,
            date=raid_info.date.isoformat(),
            people=[person.name for person in raid_info.people],
            drops=[item.name for item in raid_info.drops],
        )


class RaidsResponse(BaseModel):
    raids: list[RaidInfo]

    @classmethod
    def from_db_raids(cls, raids: list[DbRaidInfo]) -> "RaidsResponse":
        return cls(
            raids=[RaidInfo.from_db_raid(raid_info) for raid_info in raids]
        )


@blueprint.route('/raids')
@validate()
def get_raids() -> RaidsResponse:
    raids = DbRaidInfo.query.all()
    return RaidsResponse.from_db_raids(raids)



@blueprint.route('/raids', methods=["POST"])
@validate()
def add_raid(body: RaidInfo) -> None:
    new_raid = DbRaidInfo(name=body.name,
                          date=datetime.fromisoformat(body.date),
                          people=[DbPerson(name=name) for name in body.people],
                          drops=[DbItem(name=name) for name in body.drops],
                          )

    db.session.add(new_raid)
    db.session.commit()
    print(body)
    return {}
