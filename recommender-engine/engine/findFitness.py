import numpy as np
import geopy.distance
from sklearn.metrics.pairwise import manhattan_distances


def find_fitness(place_data, predict_results, makeUp_data, df_tfidfvect, diversity, distance, NN):
    max_similarity = 3
    min_similarity = 0
    max_distance = 250
    min_distance = 0
    max_variety = 18
    min_variety = 0
    indexs = place_data.index
    start_index = int(indexs.start)
    end_index = int(indexs.stop)
    fitness_NN_Scores = []
    similarity_planScores = 0
    duration_planScores = 0
    variety_planScores = 0
    fitness_planScores = []
    time_count_Euclidean = []
    time_count_OSM = []
    for rows in range(predict_results.shape[1]): #Each rows
        similarity_rowsScores = []
        LaLongData = []
        listPlace_Index = []
        users_inputs = makeUp_data[rows]
        for output in range(len(predict_results[NN][rows]) - 1):  #Each place
            try:
                place_index = predict_results[NN][rows][output]
                if place_index >= start_index and place_index <= end_index-1:
                    listPlace_Index.append(place_index)
                    place_tagScores = np.array(place_data.iloc[place_index][["ธรรมชาติ", "นันทนาการ", "ประวัติศาสตร์", "วัฒนธรรม", "ศิลปะ"]])
                    LaLongData.append(place_data.iloc[place_index][["longitude", "latitude"]].values)
                    similarity_score = findSimilarity(users_inputs, place_tagScores)
                    similarity_rowsScores.append(similarity_score)
                else:
                    notIn = notIn + 1
            except:
                pass
        similarity_planScores = Average(similarity_rowsScores)
        similarity_planScores = normalization(similarity_planScores, max_similarity, min_similarity)
        distance_planScores = findDistance(LaLongData) 
        distance_planScores = normalization(distance_planScores, max_distance, min_distance)
        variety_planScores = findVariety(listPlace_Index, df_tfidfvect)
        variety_planScores = normalization(variety_planScores, max_variety, min_variety)
        fitness_planScores.append((((diversity + variety_planScores) - similarity_planScores - (distance + distance_planScores))))
    return Average(fitness_planScores)

def findDistance(tmpLaLo):
    tmp = []
    for y in range(len(tmpLaLo) - 1):
        coords_1 = "%s" %tmpLaLo[y][1] + "," + "%s" %tmpLaLo[y][0]    #latitude, longitude
        coords_2 = "%s" %tmpLaLo[y+1][1] + "," + "%s" %tmpLaLo[y+1][0] 
        tmp.append(geopy.distance.geodesic(coords_1, coords_2).km) 
    distance = sum(tmp)
    return distance

def findSimilarity(A, B):
    tmp = []
    for x in range(len(A)):
        tmp.append(abs(A[x] - B[x]))
    return sum(tmp)

def findVariety(place_index, df_tfidfvect):
    varietyOfPlan = []
    tfidfMaxtrix = []
    for index in place_index:
        tfidfMaxtrix.append(df_tfidfvect.iloc[index])

    manhattan = manhattan_distances(tfidfMaxtrix, tfidfMaxtrix)
    for i in range(len(manhattan)):
        varietyOfPlan.append(sum(manhattan[i]))
    return Average(varietyOfPlan)

def normalization(num, Max, Min):
    return ((num - Min) / (Max - Min))

def Average(lst): 
    return sum(lst) / len(lst) 
