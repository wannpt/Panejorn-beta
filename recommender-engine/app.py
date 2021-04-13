import os
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from engine.trip_recommender import predict
from dotenv import load_dotenv
from database.database import GetAttractions

app = Flask(__name__)
cors = CORS(app)

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")
attractions = GetAttractions(DATABASE_URL)

@app.route('/trip-recommender-system', methods=['POST'])
@cross_origin()
def trip_recommender():

    # Get input from request body
    req_body = request.json

    print(req_body)
    print(attractions.iloc[0])

    result = req_body
    
    return jsonify(result)

@app.route('/', methods=['GET'])
@cross_origin()
def hello_world():
    return 'Hello, Python!'

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8040)
