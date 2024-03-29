# This app uses a combination of Flask, MySQL, D3, and plotly.js to render graphs
# based on basketball player statistics. 
# First the data is retrieved from a MySQL database and jsonified. Then, jinga2, HTML and 
# JavaScript are used to serve the main.html template page with graph rendering functionality.
from flask import Flask, render_template, json, jsonify, request
import getdata
from getdata import make_dict

app = Flask(__name__)


@app.route("/data")
def hello_world():
    the_dict = make_dict()
    return jsonify(the_dict)


@app.route("/")
def hello_world2():

    return render_template("main.html")


# execute only if run as a script

if __name__ == "__main__":
    app.run()
