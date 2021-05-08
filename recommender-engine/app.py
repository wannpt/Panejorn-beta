import os
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from engine.trip_recommender import *
from dotenv import load_dotenv
from database.database import *
import multiprocessing
import concurrent.futures
from functools import partial

app = Flask(__name__)
cors = CORS(app)

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")
attractions = GetAttractions(DATABASE_URL)
attraction_regisType = GetAttractionsRegisType(DATABASE_URL)
attraction__attractionType = GetAttractionsType(DATABASE_URL)
accommodations = GetAccommodations(DATABASE_URL)


@app.route('/trip-recommender-system', methods=['POST'])
@cross_origin()
def trip_recommender():
    
    # Get input from request body
    req_body = request.json
    finalPlan = []
    final_startTime = []
    final_endTime = []
    final_cost = []
    with concurrent.futures.ProcessPoolExecutor(max_workers = 3) as executor:
        func = partial(engine.trip_recommender.createPlan, accommodations, attractions, attraction_regisType, attraction__attractionType, req_body)
        planID = [0,1,2]
        plan1,plan2,plan3 = executor.map(func, planID)
    accom_data = plan1[4]
    attractionData = plan1[5]


    finalPlan.extend(plan1[0])
    finalPlan.extend(plan2[0])
    finalPlan.extend(plan3[0])

    final_startTime.extend(plan1[1])
    final_startTime.extend(plan2[1])
    final_startTime.extend(plan3[1])

    final_endTime.extend(plan1[2])
    final_endTime.extend(plan2[2])
    final_endTime.extend(plan3[2])

    final_cost.extend(plan1[3])
    final_cost.extend(plan2[3])
    final_cost.extend(plan3[3])
    information = arrange_planResult(finalPlan, final_startTime, final_endTime, final_cost, accom_data, attractionData)
    information_json = json.dumps(information, cls=NumpyEncoder)
    print("Final plan is", finalPlan)
    return information_json



class NumpyEncoder(json.JSONEncoder):
    """ Custom encoder for numpy data types """
    def default(self, obj):
        if isinstance(obj, (np.int_, np.intc, np.intp, np.int8,
                            np.int16, np.int32, np.int64, np.uint8,
                            np.uint16, np.uint32, np.uint64)):

            return int(obj)

        elif isinstance(obj, (np.float_, np.float16, np.float32, np.float64)):
            return float(obj)

        elif isinstance(obj, (np.complex_, np.complex64, np.complex128)):
            return {'real': obj.real, 'imag': obj.imag}

        elif isinstance(obj, (np.ndarray,)):
            return obj.tolist()

        elif isinstance(obj, (np.bool_)):
            return bool(obj)

        elif isinstance(obj, (np.void)): 
            return None

        return json.JSONEncoder.default(self, obj)

def arrange_planResult(finalPlan, final_startTime, final_endTime, final_cost, accom, data):
    information = []
    for planID in range(len(finalPlan)): 
        planDetail = []
        for day in range(len(finalPlan[planID])):
            countPlace = 0
            detail = []
            for placeIndex in finalPlan[planID][day]:
                if countPlace == 0 or countPlace == len(finalPlan[planID][day]) - 1:
                    detail.append({
                        "placeID": accom.iloc[placeIndex]["accommodation_id"],
                        "placeName": accom.iloc[placeIndex]["accommodation_name"],
                        "placeType": "ACCOMMODATION",
                        "startTime": final_startTime[planID][day][countPlace],
                        "endTime": final_startTime[planID][day][countPlace],
                        "day": day+1,
                    },)
                elif countPlace > 0 and countPlace < len(finalPlan[planID][day]) -1 and placeIndex != 9999:
                    detail.append({
                        "placeId": data.iloc[placeIndex]["attraction_id"],
                        "placeName": data.iloc[placeIndex]["attraction_name"],
                        "placeType": "ATTRACTION",
                        "startTime": final_startTime[planID][day][countPlace],
                        "endTime": final_endTime[planID][day][countPlace - 1],
                        "day": day+1,
                        "status": 1,
                        "tag1": data.iloc[placeIndex]["ธรรมชาติ"],
                        "tag2": data.iloc[placeIndex]["นันทนาการ"],
                        "tag3": data.iloc[placeIndex]["ประวัติศาสตร์"],
                        "tag4": data.iloc[placeIndex]["วัฒนธรรม"],
                        "tag5": data.iloc[placeIndex]["ศิลปะ"]  
                    },)
                elif countPlace > 0 and countPlace < len(finalPlan[planID][day]) -1 and placeIndex == 9999:
                    detail.append({
                        "placeID": "P08",
                        "placeType": "RESTAURANT",
                        "startTime": final_startTime[planID][day][countPlace],
                        "endTime": final_endTime[planID][day][countPlace - 1],
                        "day": day+1,
                    },)
                
                countPlace += 1

            planDetail.append({
                "day": day+1,
                "detail": detail
                })

        information.append({
            "planDetail": planDetail,
            "totalCost": final_cost[planID]
        })
    return information

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8040)
