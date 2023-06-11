from pydantic import BaseModel, Field

from l2dkp.app.models import Person as DbPersonInfo
from l2dkp.app.models import Raid as DbRaidInfo
from l2dkp.utils import encode_id


class RaidInfo(BaseModel):
    id: str = Field(...)
    name: str = Field(..., min_length=1)
    date: str = Field(...)

    @classmethod
    def from_db_raid(cls, raid_info: DbRaidInfo) -> "RaidInfo":
        return cls(
            id=encode_id(raid_info.id),
            name=raid_info.name,
            date=raid_info.date.isoformat(),
        )


class PersonInfo(BaseModel):
    name: str = Field(
        ..., description="Main nickname."
    )  # TODO set min length (map to People in RaidsInfo)
    raids: list[RaidInfo] = Field(..., description="Raids person was involved into.")

    @classmethod
    def from_db_person(cls, person_info: DbPersonInfo) -> "PersonInfo":
        return cls(
            name=person_info.name,
            raids=[RaidInfo.from_db_raid(raid_info) for raid_info in person_info.raids],
        )


class MembersResponse(BaseModel):
    members: list[PersonInfo]

    @classmethod
    def from_db_persons(cls, raids: list[DbPersonInfo]) -> "MembersResponse":
        return cls(members=[PersonInfo.from_db_person(raid_info) for raid_info in raids])
