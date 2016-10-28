#!flask/bin/python
from flask import Flask, jsonify, redirect, url_for, request
from pprint import pprint
import json

app = Flask(__name__)

with open('data_file.json') as data_file:
    data = json.load(data_file)

# Get all stats
@app.route('/api/stats', methods=['GET'])
def get_all_stats():
    return jsonify({'values': data})

# Get by type id
@app.route('/api/stats/geotype', methods=['GET'])
def get_countries():
    geo_type = request.args.get('geotype')
    geo_type_data = [x for x in data if x['GEO_TYPE'] == geo_type]
    return jsonify({'values': geo_type_data})

# Get label by label type
@app.route('/api/stats/labels', methods=['GET'])
def get_labels():
    label = request.args.get('label')
    json_obj = [x for x in data if x['GEO_LABEL'] == label]
    build_obj = []

    for x in range(0, 100):
        print x
        # label = {"x": x, "y": json_obj[str(x)]}
        label = {"x": x, "y": json_obj[0][str(x)]}

        build_obj.append(label)

    return jsonify({'values': build_obj})

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

        value = {
            'GEO_CODE': y['GEO_CODE'],
            'GEO_LABEL': y['GEO_LABEL'],
            'GEO_TYPE': y['GEO_TYPE'],
            '0-24': sum_25,
            '25-49': sum_50,
            '50-74': sum_75,
            '74-100': sum_100
        }

        filtered_results.append(value)

    return jsonify({'values': filtered_results})

@app.route('/api/stats/total', methods=['GET'])
def total_in_label():
    label = request.args.get('label')
    value = [x for x in data if x['GEO_LABEL'] == label]

    print value

    sum = 0;

    for x in range(1, 100):
        sum += value[0][str(x)]

    value = {
        'GEO_CODE': value[0]['GEO_CODE'],
        'GEO_LABEL': value[0]['GEO_LABEL'],
        'GEO_TYPE': value[0]['GEO_TYPE'],
        'total': sum
    }

    return jsonify(value)

# Route to app.....
@app.route('/app')
def route_to_app():
    return redirect(url_for('static', filename='webapp/src/client/index.html'))


if __name__ == '__main__':
    app.run(debug=True)
