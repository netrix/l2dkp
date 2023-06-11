import os

from hashids import Hashids

HASHIDS_SALT = os.environ.get("HASHIDS_SALT", "")
HASHIDS = Hashids(salt=HASHIDS_SALT)


def encode_id(int_id: int) -> str:
    return HASHIDS.encode(int_id)


def decode_id(hash_id: str) -> int:
    return HASHIDS.decode(hash_id)[0]
