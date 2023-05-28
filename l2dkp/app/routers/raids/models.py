from pydantic import BaseModel, Field, validator

from l2dkp.app.models import Raid as DbRaidInfo


class RaidInfo(BaseModel):
    name: str = Field(..., min_length=1)
    date: str = Field(...)
    people: list[str]
    drops: list[str]

    @validator("people", "drops", each_item=True)
    def check_person_name_must_not_be_empty_string(cls, value: str) -> str:
        if len(value) < 1:
            raise ValueError("empty name")  # TODO better desc
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
        return cls(raids=[RaidInfo.from_db_raid(raid_info) for raid_info in raids])
