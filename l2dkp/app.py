from flask import Flask


app = Flask(__name__)


@app.route('/', defaults={'path': ''})
@app.route('/static/', defaults={'path': ''})
@app.route('/static/<path:path>')
def catch_all(path):
    return app.send_static_file("index.html")
