from flask import Blueprint
from flask_pydantic import validate
from pydantic import BaseModel


blueprint = Blueprint("v1", __name__)


class RaidInfo(BaseModel):
    name: str
    date: str
    people: list[str]
    drops: list[str]


class RaidsResponse(BaseModel):
    raids: list[RaidInfo]


@blueprint.route('/raids')
@validate()
def get_raids() -> RaidsResponse:
    return RaidsResponse.parse_obj({
        "raids": [
            {
                "name": "Baium",
                "date": '2018-04-04T16:00:00.000Z',
                "people": [
                "DarkNetrix",
                "NetrixDSS",
                ],
                "drops": [
                "Majestic Robe",
                "Majestic Gauntlets"
                ]
            },
            {
                "name": "Valakas",
                "date": '2018-04-04T16:00:00.000Z',
                "people": [
                "Sheldon",
                "NetrixDSS",
                ],
                "drops": [
                "Nightmare Robe",
                "Nightmare Gauntlets"
                ]
            }
        ]
    })



@blueprint.route('/raids', methods=["POST"])
@validate()
def add_raid(body: RaidInfo) -> None:
    print(body)
    return {}
