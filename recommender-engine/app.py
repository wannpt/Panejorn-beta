from flask import Flask, jsonify, request
from engine.trip_recommender import predict

app = Flask(__name__)
PORT = 8040

@app.route('/trip-recommender-system', methods=['GET'])
def trip_recommender():

    # Get input from request body
    req_body = request.json

    # Process
    A = req_body['A']
    B = req_body['B']

    # Format the result in json format
    result = {
        'result': predict(A, B)
    }
    
    return jsonify(result)

@app.route('/', methods=['GET'])
def hello_world():
    return 'Hello, Python!'

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=PORT)