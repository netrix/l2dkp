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


@app.route('/', defaults={'path': ''})
@app.route('/static/', defaults={'path': ''})
@app.route('/static/<path:path>')
def catch_all(path):
    return app.send_static_file("index.html")


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
