from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from engine.trip_recommender import predict

app = Flask(__name__)
cors = CORS(app)

@app.route('/trip-recommender-system', methods=['POST'])
@cross_origin()
def trip_recommender():

    # Get input from request body
    req_body = request.json

    print(req_body)

    result = req_body
    
    return jsonify(result)

@app.route('/', methods=['GET'])
@cross_origin()
def hello_world():
    print("hello, python!")
    return 'Hello, Python!'

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8040)