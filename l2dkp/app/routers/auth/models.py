from pydantic import BaseModel, Field


class SignupBody(BaseModel):
    login: str = Field(..., min_length=3)
    password: str = Field(..., min_length=8)


class LoginBody(BaseModel):
    login: str = Field(..., min_length=3)
    password: str = Field(..., min_length=8)
    remember: bool = Field(False)
