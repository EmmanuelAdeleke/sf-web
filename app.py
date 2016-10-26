#!flask/bin/python
from flask import Flask, jsonify, redirect, url_for
from pprint import pprint
import json

app = Flask(__name__)

# tasks = [
#     {
#         'id': 1,
#         'title': u'Buy groceries',
#         'description': u'Milk, Cheese, Pizza, Fruit, Tylenol',
#         'done': False
#     },
#     {
#         'id': 2,
#         'title': u'Learn Python',
#         'description': u'Need to find a good Python tutorial on the web',
#         'done': False
#     },
#     {
#         'id': 2,
#         'done': False
#     }
# ]

with open('data_file.json') as data_file:
    data = json.load(data_file)

# pprint(data)

@app.route('/api', methods=['GET'])
def get_tasks():
    return jsonify({'data': data})

@app.route('/api/hello', methods=['GET'])
def get_tasks2():
    return "index.html"

@app.route('/test')
def get_tasks3():
    return redirect(url_for('static', filename='webapp/src/routes/index.js'))

if __name__ == '__main__':
    app.run(debug=True)
