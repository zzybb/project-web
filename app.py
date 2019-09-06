import numpy as np
from flask import Flask,render_template,request
from datetime import timedelta
app = Flask(__name__)

# config
app.config['DEBUG'] = True
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = timedelta(seconds=1)
app.jinja_env.auto_reload = True
app.config['TEMPLATES_AUTO_RELOAD'] = True

# index
@app.route("/")
def index():
    return render_template("index.html")

# text analyzer
@app.route("/text_analyzer")
def online_text_analyzer():
	return render_template("online-text-analyzer.html")
# sent similarity
@app.route("/text_similarity")
def online_text_similarity():
	return render_template("online-sent-similarity.html")
# machine compose
@app.route("/machine_compose")
def online_machine_compose():
	return render_template("online-machine-compose.html")
	
# factual qa
@app.route("/factual_qa")
def online_factual_qa():
	return render_template("online-factual-qa.html")

@app.route("/Knowledge_map")
def online_Knowledge_map():
	return render_template("online-Knowledge-map.html")

@app.route("/grap")
def online_g_map():
	return render_template("C:/Users/lenovo/Desktop/知识图谱/TextGrapher/graph_show.html")

if __name__ == '__main__':
    app.run(host = '0.0.0.0',port = 5000,threaded=True,debug=True)