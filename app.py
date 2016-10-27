#!flask/bin/python
from flask import Flask, jsonify, redirect, url_for, request
from pprint import pprint
import json

app = Flask(__name__)

with open('data_file.json') as data_file:
    data = json.load(data_file)

# for letter in data:     # First Example
#    for x in letter:
#        print x

# my_list = []
#
# for x in data:
#     if x['GEO_TYPE'] == 'Countries and Groupings':
#         my_list.append(x)
#
# print my_list


# Get all stats
@app.route('/api/stats', methods=['GET'])
def get_all_stats():
    return jsonify({'data': data})

# Get by type id
@app.route('/api/stats/geotype', methods=['GET'])
def get_countries():
    geo_type = request.args.get('geotype')
    geo_type_data = [x for x in data if x['GEO_TYPE'] == geo_type]
    return jsonify({'data': geo_type_data})

# Get label by label type
@app.route('/api/stats/labels', methods=['GET'])
def get_labels():
    label = request.args.get('label')
    labels = [x for x in data if x['GEO_LABEL'] == label]
    return jsonify({'data': labels})

@app.route('/api/stats/averageByLabel', methods=['GET'])
def average_label_type():

    geo_type = request.args.get('geotype')

    results = []
    filtered_results = []

    for x in data:
        if x['GEO_TYPE'] == geo_type:
            results.append(x)
            print x

    for y in results:

        sum_25 = 0
        sum_50 = 0
        sum_75 = 0
        sum_100 = 0

        for x in range(0, 100):
            if x >= 0 and x < 25:
                sum_25 += y[str(x)]
                print x

            elif x >= 25 and x < 50:
                sum_50 += y[str(x)]
                print x

            elif x >=50 and x < 75:
                sum_75 += y[str(x)]
                print x

            else:
                sum_100 += y[str(x)]
                print x

        tasks = {
            'GEO_CODE': y['GEO_CODE'],
            'GEO_LABEL': y['GEO_LABEL'],
            'GEO_TYPE': y['GEO_TYPE'],
            '0-24': sum_25,
            '25-49': sum_50,
            '50-74': sum_75,
            '74-100': sum_100
        }

        filtered_results.append(tasks)

        print y



    return jsonify({'data': filtered_results})

# Route to app.....
@app.route('/app')
def route_to_app():
    return redirect(url_for('static', filename='webapp/src/client/index.html'))


if __name__ == '__main__':
    app.run(debug=True)
