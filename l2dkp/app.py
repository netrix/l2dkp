import pathlib
from flask import Flask, request, make_response


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


@app.route('/api/raids')
def get_raids():
    return [
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
