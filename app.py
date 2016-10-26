#!flask/bin/python
from flask import Flask, jsonify, redirect, url_for, request
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

countries = [x for x in data if x['GEO_TYPE'] == 'Countries and Groupings']
# countries = [x for x in data if x['GEO_TYPE'] == 'Countries and Groupings']

# Get all stats
@app.route('/api/stats', methods=['GET'])
def get_all_stats():
    return jsonify({'data': data})

# Get all countries
@app.route('/api/stats/countries', methods=['GET'])
def get_countries():
    return jsonify({'countries': countries})

# Get label by label type
@app.route('/api/stats/labels', methods=['GET'])
def get_labels():
    # Get user input
    label = request.args.get('label')
    labels = [x for x in data if x['GEO_LABEL'] == label]
    return jsonify({'labels': labels})

@app.route('/test')
def get_tasks3():
    return redirect(url_for('static', filename='webapp/src/client/index.html'))

# Run test
@app.route('/api/hello', methods=['GET'])
def get_tasks2():
    return "Test"

if __name__ == '__main__':
    app.run(debug=True)
