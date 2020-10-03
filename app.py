from flask import Flask, render_template, json, jsonify, request
import getdata
from getdata import make_dict

app = Flask(__name__)

@app.route('/data')

def hello_world():
    the_dict=make_dict()
    return jsonify(the_dict)

@app.route('/')

def hello_world2():
    
    
    return render_template("main.html" )

app.run(debug=True)
if __name__ == "__main__":
    # execute only if run as a script
    app.run(port=5000)