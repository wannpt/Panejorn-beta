import engine.findFitness
import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from functools import partial
from numpy import random
import copy
from ortools.constraint_solver import routing_enums_pb2
from ortools.constraint_solver import pywrapcp
import requests
import geopy.distance
import json
from flask import jsonify
from datetime import datetime


def makeData(attraction_detailsTags, attraction__regis_attractionType, attraction__attractionType, province):
    data = attraction_detailsTags
    data = data[['attraction_id', 'attraction_name', 'latitude', 'longitude','province', 'detail', 'thai_child_fee', 'thai_adult_fee', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday',
        'sunday', 'recommended_duration', 'ธรรมชาติ', 'นันทนาการ',
        'ประวัติศาสตร์', 'วัฒนธรรม', 'ศิลปะ']]
    attraction_register = attraction__regis_attractionType
    attraction_Type = attraction__attractionType
    attraction1 = pd.merge(data, attraction_register, on='attraction_id')
    data = pd.merge(attraction1,attraction_Type,on='attraction_type_id')
    temp_df = data.groupby('attraction_id')['description'].apply(list).reset_index(name='description')
    data.drop_duplicates(subset ="attraction_id", keep = "first", inplace = True) 
    data = pd.merge(data,temp_df,on='attraction_id')
    data = data.drop(columns=['description_x', 'attraction_type_id'])
    data = data.rename(columns = {'description_y':'description'})
    data = data.query('province == @province')
    data = data.reset_index(drop=True)

    return data

def mat_to_vector(mat_pop_weights):
    pop_weights_vector = []
    for sol_idx in range(mat_pop_weights.shape[0]):
        curr_vector = []
        for layer_idx in range(mat_pop_weights.shape[1]):
            vector_weights = np.reshape(mat_pop_weights[sol_idx, layer_idx], newshape=(mat_pop_weights[sol_idx, layer_idx].size))
            curr_vector.extend(vector_weights)
        pop_weights_vector.append(curr_vector)
    return np.array(pop_weights_vector)

def vector_to_mat(vector_pop_weights, mat_pop_weights):
    mat_weights = []
    for sol_idx in range(mat_pop_weights.shape[0]):
        start = 0
        end = 0
        for layer_idx in range(mat_pop_weights.shape[1]):
            end = end + mat_pop_weights[sol_idx, layer_idx].size
            curr_vector = vector_pop_weights[sol_idx, start:end]
            mat_layer_weights = np.reshape(curr_vector, newshape=(mat_pop_weights[sol_idx, layer_idx].shape))
            mat_weights.append(mat_layer_weights)
            start = end
    return np.reshape(mat_weights, newshape=mat_pop_weights.shape)

def sigmoid (x):
    return 1/(1 + np.exp(-x))

def element_1(x):
    return x[0]

def predict_outputs(weights_mat, data_inputs):
    all_outputs = []
    predictions = np.zeros(shape=(data_inputs.shape[0]))
    for NN in range(weights_mat.shape[0]):    #for each Neural Networks
        NN_outputs = []
        for sample_idx in range(data_inputs.shape[0]):  #get input data in each rows
            count = 1
            r1 = data_inputs[sample_idx, :]
            cur_output = []
            for curr_weights in weights_mat[NN]:  #pass each row of input to make output
                r1 = np.dot(r1, curr_weights)
                r1 = sigmoid(r1)
                if count == len(weights_mat[0]):
                    cur_output.extend(r1)
                count = count + 1
            NN_outputs.append(cur_output)
        all_outputs.append(NN_outputs)
    return np.array(all_outputs)

def findDistance_OSM(tmpLaLo): #longitude, latitude
    tmp = []
    count = 0
    url = "http://router.project-osrm.org/route/v1/driving/"
    for x in tmpLaLo:
        url += "%s" %x[0] + "," + "%s" %x[1]
        if count != len(tmpLaLo) - 1:
            url += ";"
        count = count+1
    response = requests.get(url)
    if(response.status_code != 200):
        count = 0
        for y in range(len(tmpLaLo) - 1):
            coords_1 = "%s" %tmpLaLo[y][1] + "," + "%s" %tmpLaLo[y][0]    #latitude, longitude
            coords_2 = "%s" %tmpLaLo[y+1][1] + "," + "%s" %tmpLaLo[y+1][0] 
            tmp.append((geopy.distance.geodesic(coords_1, coords_2).km) * 2.0)  #assume 1 km equal to 1.8 min
        payload = tmp
        return payload, response.status_code
    payload = response.json()
    return payload, response.status_code

def findDistance(tmpLaLo):
    tmp = []
    for y in range(len(tmpLaLo) - 1):
        coords_1 = "%s" %tmpLaLo[y][1] + "," + "%s" %tmpLaLo[y][0]    #latitude, longitude
        coords_2 = "%s" %tmpLaLo[y+1][1] + "," + "%s" %tmpLaLo[y+1][0] 
        tmp.append(geopy.distance.geodesic(coords_1, coords_2).km) 
    distance = sum(tmp)
    return distance

def identity_fun(text):
    return text

def findVarietyMatrix(data):
    tfv = TfidfVectorizer(analyzer = 'word', tokenizer=identity_fun, preprocessor=identity_fun, token_pattern=None)
    description = data['description'].tolist()
    tfv_matrix = tfv.fit_transform(description)
    tfidf_array = np.array(tfv_matrix.todense())
    tfidf_tokens = tfv.get_feature_names()
    df_tfidfvect = pd.DataFrame(data = tfidf_array,columns = tfidf_tokens)
    return df_tfidfvect

def pair_fitness_weights(avg_fitness_NN, results): 
    lis = []
    for x in range(avg_fitness_NN.shape[0]):
        temp = avg_fitness_NN[x], results[x]
        lis.append(temp)
    return np.array(lis)

def selectParent_Roulette(results):
    size = results.shape[0]
    high_fitness_area = 0.6 * size
    medium_fitness_area = 0.9 * size
    low_fitness_area = size
    num_random = random.randint(0,10)
    if (num_random >= 0 and num_random <= 6):
        array = random.randint(0, int(high_fitness_area))
    elif (num_random > 6 and num_random < 9):
        array = random.randint(int(high_fitness_area), int(medium_fitness_area))
    else:
        array = random.randint(int(medium_fitness_area), int(low_fitness_area - 1))
    tmp = copy.copy(results[array])
    return tmp, array

def crossOver(result):
    new_weights = []
    round = (result.shape[0])//2
    round = int(round)
    for NN in range(round):
        parent1, locationNN1 = copy.deepcopy(selectParent_Roulette(result))
        parent2, locationNN2 = copy.deepcopy(selectParent_Roulette(result))
        tmp = parent1[0][3:6]
        parent1[0][3:6] = copy.deepcopy(parent2[0][3:6])
        parent2[0][3:6] = copy.deepcopy(tmp)
        new_weights.append(parent1)
        new_weights.append(parent2)
    return np.array(new_weights)

def mutate(result, data):
    for x in range(15):
        plan = random.randint(0, int(len(result) * 0.6))
    for y in range(1):
        value = np.random.randint(low = 0, high = len(data))
        location = random.randint(0, len(result[x]))
        result[plan][0][location - 1] = value
    return result

def removeFitness(results):   
    place_index = []
    for x in range(results.shape[0]):
        place_index.append(results[x][1])
    return np.array(place_index)

def unique(list1):
    unique_list = []
    for x in list1:
        if x not in unique_list:
            unique_list.append(x)
    return unique_list

def getUnique_index(result, data):
    listall_index = []
    for NN in range(result.shape[0]):
        listplan_index = []
        for rows in range(result.shape[1]):
            tmp = []
            for ini_place in range(len(result[NN][rows])):
                index = result[NN][rows][ini_place]
                tmp.append(index)
            listplan_index.append(unique(tmp))
        listall_index.append(listplan_index)
    return np.array(listall_index)

def unique(list1):
    unique_list = []
    for x in list1:
        if x not in unique_list:
            unique_list.append(x)
    return unique_list

def common_data(list1, list2):
    result = 0
    for x in list1:
        for y in list2:
            if x == y:
                result = 1
                return result               
    return result

def check_planConditions(placeIndex, nodes, startTime, endTime, adult, child, max_budget, min_budget, attractionData, accom, day_in_week):
  
    fitPlan = 0
    weekDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    while fitPlan != 1: #loop until it match time and cost conditions
        tmpLaLo = []
        countNode = 0
        totalCost = 0
        place_startTime = []
        place_endTime = []
        for node in nodes:
            if countNode == 0:
                totalTime = startTime
                tmpLaLo.append(accom.iloc[placeIndex[node]][["longitude", "latitude"]].values)
                place_startTime.append(startTime)
            elif countNode < len(nodes) - 1 and countNode > 0:
                tmpLaLo.append(attractionData.iloc[placeIndex[node]][["longitude", "latitude"]].values)
                place_startTime.append(totalTime)
                totalTime += attractionData.iloc[placeIndex[node]]["recommended_duration"]
                place_endTime.append(totalTime)
                if adult != 0:
                    totalCost = totalCost + (adult * (attractionData.iloc[placeIndex[node]]["thai_adult_fee"]))
                if child != 0:
                    totalCost = totalCost + (child * (attractionData.iloc[placeIndex[node]]["thai_child_fee"]))
                if attractionData.iloc[placeIndex[node]][weekDays[day_in_week]] == "ปิด":
                    return 0,0,0,0
            elif countNode == len(nodes) - 1:
                tmpLaLo.append(accom.iloc[placeIndex[0]][["longitude", "latitude"]].values)
                place_startTime.append(totalTime)
            countNode += 1
        payload, status = findDistance_OSM(tmpLaLo)
        if status == 200:
            totalTime += int(payload['routes'][0]['duration']/60)
        elif status != 200:
            totalTime += int(sum(payload))

        if totalTime > 690:
            totalTime += 90 #eat lunch
        if totalTime > endTime or totalCost > max_budget:
            placeIndex = placeIndex[0:len(placeIndex) - 1]
            nodes = traveling_saleMan(placeIndex, attractionData, accom)
        

        elif totalTime < int(0.95 * endTime):
            return 0,0,0,0
            break

        else:
            fitPlan = 1
            new_placeIndex = []
            for node in nodes:
                new_placeIndex.append(placeIndex[node])
            if status == 200:
                durations = []
                for x in range(len(payload['routes'][0]['legs'])):
                    if x == 0:
                        durations.append(int(payload['routes'][0]['legs'][x]['duration']/60))
                    elif x > 0:
                        durations.append(durations[x-1] + int(payload['routes'][0]['legs'][x]['duration']/60))

            elif status != 200:
                durations = []
                for x in range(len(payload)):
                    if x == 0:
                        durations.append(int(payload[x]))
                    elif x > 0:
                        durations.append(int(durations[x-1] + payload[x]))

            for s_Time in range(len(place_startTime)):
                if s_Time != 0 and s_Time <= len(place_startTime) - 1:
                    place_startTime[s_Time] += durations[s_Time - 1]
                if s_Time >= 0 and s_Time < len(place_startTime) - 2:
                    place_endTime[s_Time] += durations[s_Time]

            foundRes = 0
            resIndex = 0
            if totalTime > 690:
                for s_Time in range(len(place_startTime)):  
                    if s_Time > 0 and s_Time <= len(place_startTime) - 2:
                        if place_endTime[s_Time - 1] >= 690 and place_endTime[s_Time - 1] <= 870 and foundRes == 0:
                            place_startTime.insert(s_Time + 1, 9999)
                            place_endTime.insert(s_Time, 9999)
                            place_startTime[s_Time + 1] = place_endTime[s_Time - 1] + 30
                            place_endTime[s_Time] =  place_startTime[s_Time + 1] + 60
                            foundRes = 1
                            resIndex = s_Time
                if foundRes == 0:
                    return 0,0,0,0

                for s_Time in range(len(place_startTime) - 1):
                    if foundRes == 1 and s_Time < len(place_startTime):
                        try:
                            place_startTime[(resIndex + 2) + s_Time] = place_startTime[(resIndex + 2) + s_Time] + 90
                        except:
                            pass

                    if foundRes == 1 and s_Time < len(place_startTime) - 1:
                        try:
                            place_endTime[(resIndex + 1) + s_Time] = place_endTime[(resIndex + 1) + s_Time] + 90
                        except:
                            pass
            
                new_placeIndex.insert(resIndex + 1, 9999)
            return new_placeIndex, place_startTime, place_endTime, totalCost

def findDistanceMatrix(tmpLaLo):
    tmp = []
    for y in range(len(tmpLaLo) - 1):
        if y % 2 == 0:
            coords_1 = "%s" %tmpLaLo[y][1] + "," + "%s" %tmpLaLo[y][0]    #latitude, longitude
            coords_2 = "%s" %tmpLaLo[y+1][1] + "," + "%s" %tmpLaLo[y+1][0]
            tmp.append(geopy.distance.geodesic(coords_1, coords_2).km) 
    return tmp

def create_data_model(placeIndex, attractionData, accom):
    payload_list = []
    for x in range(len(placeIndex)):
        tmp = []
        for y in range(len(placeIndex)):
            if x == 0 and y == 0:
                tmp.append(accom.iloc[placeIndex[x]][["longitude", "latitude"]].values)
                tmp.append(accom.iloc[placeIndex[y]][["longitude", "latitude"]].values)

            elif x == 0 and y != 0:
                tmp.append(accom.iloc[placeIndex[x]][["longitude", "latitude"]].values)
                tmp.append(attractionData.iloc[placeIndex[y]][["longitude", "latitude"]].values)

            elif x != 0 and y == 0:
                tmp.append(attractionData.iloc[placeIndex[x]][["longitude", "latitude"]].values)
                tmp.append(accom.iloc[placeIndex[y]][["longitude", "latitude"]].values)

            else:
                tmp.append(attractionData.iloc[placeIndex[x]][["longitude", "latitude"]].values)
                tmp.append(attractionData.iloc[placeIndex[y]][["longitude", "latitude"]].values)
        payload = findDistanceMatrix(tmp)
        payload_list.append(payload)
    """Stores the data for the problem."""
    data = {}
    data['distance_matrix'] = []
    data['distance_matrix'] = payload_list
    data['num_vehicles'] = 1
    data['depot'] = 0
    return data

def get_routes(solution, routing, manager):
    """Get vehicle routes from a solution and store them in an array."""
    # Get vehicle routes and store them in a two dimensional array whose
    # i,j entry is the jth location visited by vehicle i along its route.
    routes = []
    for route_nbr in range(routing.vehicles()):
        index = routing.Start(route_nbr)
        route = [manager.IndexToNode(index)]
        while not routing.IsEnd(index):
            index = solution.Value(routing.NextVar(index))
            route.append(manager.IndexToNode(index))
        routes.append(route)
    return routes

def traveling_saleMan(placeIndex, attractionData, accom):
    data = create_data_model(placeIndex, attractionData, accom)
    # Create the routing index manager.
    manager = pywrapcp.RoutingIndexManager(len(data['distance_matrix']),data['num_vehicles'], data['depot'])

    # Create Routing Model.
    routing = pywrapcp.RoutingModel(manager)


    def distance_callback(from_index, to_index):
        """Returns the distance between the two nodes."""
        # Convert from routing variable Index to distance matrix NodeIndex.
        from_node = manager.IndexToNode(from_index)
        to_node = manager.IndexToNode(to_index)
        return data['distance_matrix'][from_node][to_node]

    transit_callback_index = routing.RegisterTransitCallback(distance_callback)

    # Define cost of each arc.
    routing.SetArcCostEvaluatorOfAllVehicles(transit_callback_index)

    # Setting first solution heuristic.
    search_parameters = pywrapcp.DefaultRoutingSearchParameters()
    search_parameters.first_solution_strategy = (routing_enums_pb2.FirstSolutionStrategy.PATH_CHEAPEST_ARC)

    # Solve the problem.
    solution = routing.SolveWithParameters(search_parameters)

    # Print solution on console.

    routes = get_routes(solution, routing, manager)
    routes = routes[0]
    return routes

def createPlan(accommodations, attraction_detailsTags, attraction__regis_attractionType, attraction__attractionType, req_body, planID):
    np.warnings.filterwarnings('ignore', category=np.VisibleDeprecationWarning) 
    np.random.seed()
    finalPlan = []
    final_startTime = []
    final_endTime = []
    final_cost = []
    userInput = []
    tmpInput = []
    train_dir = 'engine'
    province = req_body['province']
    selectModel = {
        'กรุงเทพมหานคร':'modelWeights_Bangkok.npy',
        'ภูเก็ต':'modelWeights_Phuket.npy',
        'ชลบุรี':'modelWeights_Chonburi.npy',
        'นครราชสีมา':'modelWeights_Nakhon_Ratchasima.npy',
        'ตาก':'modelWeights_Tak.npy',
        'เชียงราย':'modelWeights_Chiangrai.npy'
    }
    model = selectModel[province]
    pop_weights_mat = np.load(train_dir + "/" + model, allow_pickle=True)
    diversity = req_body['diversity']
    distance = req_body['distance']
    attractionData = makeData(attraction_detailsTags, attraction__regis_attractionType, attraction__attractionType, province)
    df_tfidfvect = findVarietyMatrix(attractionData)
    startTime = req_body['startTime']
    endTime = req_body['endTime']
    adult = req_body['numberOfAdult']
    child = req_body['numberOfChildren']
    advanceInput = req_body['inputTagScores'] #ธรรมชาติ, นันทนาการ, ประวัติศาสตร์, วัฒนธรรม, ศิลปะ
    regInput = req_body['userTagScores']
    startText = '/'
    endText = '/'
    s_date = req_body['startDate']
    e_date = req_body['endDate']
    tmp_s_date = datetime.strptime(s_date, '%m/%d/%Y').strftime('%m/%d/%y')
    datetime_object = datetime.strptime(tmp_s_date, '%m/%d/%y')
    day_in_week = datetime_object.weekday()
    days = int(e_date[e_date.find(startText)+len(startText):e_date.rfind(endText)]) - int(s_date[s_date.find(startText)+len(startText):s_date.rfind(endText)]) + 1
    max_budget = int(req_body['maxBudget'] / days)
    min_budget = int(req_body['minBudget'] / days)
    for i in range(len(regInput)):
        tmp3 = regInput[i] + advanceInput[i]
        if tmp3 < 0:
            tmp3 = 0.0
        elif tmp3 > 1:
            tmp3 = 1.0
        tmpInput.append(tmp3)
    userInput.append(tmpInput)
    userInput = np.array(userInput)

    totalCost = 0  
    result = predict_outputs(pop_weights_mat, userInput)
    result = result * len(attractionData)
    result = result.astype(int)
    result = getUnique_index(result, attractionData)
    end_generations = 9
    accom_data = accommodations.query('province == @province')
    accom_data = accom_data.reset_index(drop=True)
    accomIndex = accom_data.sample().index[0]
    results_list = []
    for generations in range(end_generations):
        fitness = []
        for NN in range(len(result)):
            fitness.append(engine.findFitness.find_fitness(attractionData, result, userInput, df_tfidfvect, diversity, distance, NN))
        fitness = np.array(fitness)


        pair_NN = pair_fitness_weights(fitness, result) #pair the fitness with weights


        pair_NN = sorted(pair_NN, key=element_1, reverse = True) #sort order of fitness from high to low
        pair_NN = np.array(pair_NN) #100 * 2 first array is NN, second is select the avg fitness values or weights of NN and weight can be devide to 4 layers --> 5*20 20*20 20*20 20*9

        if generations == 0:
            bestGen0 = pair_NN[0][0]

        result = removeFitness(pair_NN)

        if generations == end_generations - 1:
            break
        result = crossOver(result)
        result = mutate(result, attractionData)
        result = getUnique_index(result, attractionData)
        results_list.append(result)

    planDaily = []
    startTime_Daily = []
    endTime_Daily = []
    for day in range(days):
        planStatus = 0
        while planStatus == 0:
            placeIndex = results_list[np.random.randint(end_generations - 1)][np.random.randint(0.35 * len(result))][0]
            plan = 0
            while plan != len(planDaily):
                sameIndex = 1
                while sameIndex == 1:
                    if len(planDaily) != 0:
                        sameIndex = common_data(planDaily[plan], placeIndex)
                        if sameIndex == 0:
                            plan += 1
                        elif sameIndex == 1:
                            plan = 0
                            placeIndex = results_list[np.random.randint(end_generations - 1)][np.random.randint(0.35 * len(result))][0]
            
            placeIndex = np.insert(placeIndex,0, accomIndex)
            nodes = traveling_saleMan(placeIndex, attractionData, accom_data)
            
            planStatus, tmp_startTime, tmp_endTime, tmp_cost= check_planConditions(placeIndex, nodes, startTime, endTime, adult, child, max_budget, min_budget, attractionData, accom_data, day_in_week)
            if day_in_week == 6:
                day_in_week = 0
            elif day_in_week < 6:
                day_in_week += 1
    
            if planStatus != 0:
                print("Found the match plan for day", day, "!!!")
                planDaily.append(planStatus)
                startTime_Daily.append(tmp_startTime)
                endTime_Daily.append(tmp_endTime)
                totalCost += tmp_cost

    finalPlan.append(planDaily)
    final_startTime.append(startTime_Daily)
    final_endTime.append(endTime_Daily)
    final_cost.append(totalCost)
    return finalPlan, final_startTime, final_endTime, final_cost, accom_data, attractionData
