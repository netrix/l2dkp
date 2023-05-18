import pathlib
from flask import Flask, request, make_response
from pydantic import BaseModel
from flask_pydantic import validate



app = Flask(__name__)


### CORS section
@app.after_request
def after_request_func(response):
    origin = request.headers.get('Origin')
    if request.method == 'OPTIONS':
        response = make_response()
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Headers', 'x-csrf-token')
        response.headers.add('Access-Control-Allow-Methods',
                            'GET, POST, OPTIONS, PUT, PATCH, DELETE')
        if origin:
            response.headers.add('Access-Control-Allow-Origin', origin)
    else:
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        if origin:
            response.headers.add('Access-Control-Allow-Origin', origin)

    return response
### end CORS section


@app.route('/', defaults={'path': 'index.html'})
@app.route('/app/', defaults={'path': 'index.html'})
@app.route('/app/<path:path>')
def catch_all(path):
    static_folder_path = pathlib.Path(app.static_folder)
    static_path = static_folder_path / path

    if static_path.is_file():
        return app.send_static_file(path)
    else:
        return app.send_static_file(path + ".html")



class RaidInfo(BaseModel):
    name: str
    date: str
    people: list[str]
    drops: list[str]


class RaidsResponse(BaseModel):
    raids: list[RaidInfo]


@app.route('/api/raids')
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



@app.route('/api/raids', methods=["POST"])
@validate()
def add_raid(body: RaidInfo) -> None:
    print(body)
    return {}
