from pydantic import BaseModel, Field

from l2dkp.app.models import Person as DbPersonInfo


class PersonInfo(BaseModel):
    name: str = Field(
        ..., description="Main nickname."
    )  # TODO set min length (map to People in RaidsInfo)
    num_raids: int = Field(..., description="Number of Raids person was involved into.")

    @classmethod
    def from_db_person(cls, person_info: DbPersonInfo) -> "PersonInfo":
        return cls(name=person_info.name, num_raids=len(person_info.raids))


class MembersResponse(BaseModel):
    members: list[PersonInfo]

    @classmethod
    def from_db_persons(cls, raids: list[DbPersonInfo]) -> "MembersResponse":
        return cls(members=[PersonInfo.from_db_person(raid_info) for raid_info in raids])
