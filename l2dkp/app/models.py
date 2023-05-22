from datetime import datetime

from sqlalchemy.orm import Mapped, mapped_column

from .extensions import db

# TODO make it part of handlers


person_raid_association_table = db.Table(
    "person_raid",
    db.Model.metadata,
    db.Column("person_id", db.ForeignKey("person.id"), primary_key=True),
    db.Column("raid_id", db.ForeignKey("raid.id"), primary_key=True),
)


item_raid_association_table = db.Table(
    "item_raid",
    db.Model.metadata,
    db.Column("item_id", db.ForeignKey("item.id"), primary_key=True),
    db.Column("raid_id", db.ForeignKey("raid.id"), primary_key=True),
)


class Person(db.Model):
    __tablename__ = "person"

    id: Mapped[int] = db.Column(db.Integer, primary_key=True)
    name: Mapped[str] = db.Column(
        db.String(16), unique=True, nullable=False
    )  # TODO forbid empty strings!!

    raids: Mapped[list["Raid"]] = db.relationship(
        secondary=person_raid_association_table, back_populates="people"
    )

    # @validates('some_string')
    # def validate_some_string(self, key, some_string) -> str:
    #     if len(some_string) <= 2:
    #         raise ValueError('some_string too short')
    #     return some_string


class Item(db.Model):
    __tablename__ = "item"

    id: Mapped[int] = db.Column(db.Integer, primary_key=True)
    name: Mapped[str] = db.Column(db.String(128), unique=True, nullable=False)

    raids: Mapped[list["Raid"]] = db.relationship(
        secondary=item_raid_association_table, back_populates="drops"
    )


class Raid(db.Model):
    __tablename__ = "raid"

    id: Mapped[int] = db.Column(db.Integer, primary_key=True)
    name: Mapped[str] = db.Column(db.String(128), unique=False, nullable=False)
    date: Mapped[datetime] = db.Column(
        db.DateTime, unique=False, nullable=False
    )  # TODO translation datetime.datetime

    people: Mapped[list[Person]] = db.relationship(
        secondary=person_raid_association_table, back_populates="raids"
    )
    drops: Mapped[list[Item]] = db.relationship(
        secondary=item_raid_association_table, back_populates="raids"
    )
