import numpy as np
from flask import Flask,render_template,request
app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/text_analyzer")
def online_text_analyzer():
	return render_template("online-text-analyzer.html")

@app.route("/text_similarity")
def online_text_similarity():
	return render_template("online-sent-similarity.html")


if __name__ == '__main__':
    app.run(host = '0.0.0.0',port = 5000)