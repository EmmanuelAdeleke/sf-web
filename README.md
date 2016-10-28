# sf-web - Flask & ReactJS
Simple application to check ages by area using static json file with pre-loaded data

## Sample code (1) - Get each of total ages
Get request method to get total people of age
```python
@app.route('/api/stats/total', methods=['GET'])
def total_in_label():
    label = request.args.get('label')
    value = [x for x in data if x['GEO_LABEL'] == label]

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
```
## Sample code (2) - Group ages quartaly ranges
Group ages from 0-24, 25-49, 50-74 and 75-100
```python
@app.route('/api/stats/averageByLabel', methods=['GET'])
def average_label_type():

    geo_type = request.args.get('geotype')

    results = []
    filtered_results = []

    for x in data:
        if x['GEO_TYPE'] == geo_type:
            results.append(x)

    for y in results:

        sum_25 = 0
        sum_50 = 0
        sum_75 = 0
        sum_100 = 0

        for x in range(0, 100):
            if x >= 0 and x < 25:
                sum_25 += y[str(x)]

            elif x >= 25 and x < 50:
                sum_50 += y[str(x)]

            elif x >=50 and x < 75:
                sum_75 += y[str(x)]

            else:
                sum_100 += y[str(x)]

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

```
