from flask import Flask, url_for, redirect


app = Flask(__name__)


@app.route("/")
def hello_world():
    return redirect(url_for('static', filename='index.html'))
    