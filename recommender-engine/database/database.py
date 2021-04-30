import psycopg2
import numpy as np
import pandas as pd
from urllib.parse import *
from psycopg2.extensions import register_adapter, AsIs
psycopg2.extensions.register_adapter(np.int64, psycopg2._psycopg.AsIs)

def ConnectDatabase(DATABASE_URL):
    url = urlparse(DATABASE_URL)
    conn = psycopg2.connect(database=url.path[1:],
                            user=url.username,
                            password=url.password,
                            host=url.hostname,
                            port=url.port
                        )
    return conn

def GetAttractions(DATABASE_URL):
    conn = ConnectDatabase(DATABASE_URL)
    SQL = "SELECT attraction_id, attraction_name, latitude, longitude, thai_child_fee, thai_adult_fee, province, monday, tuesday, wednesday, thursday, friday, saturday, sunday, recommended_duration, tag1, tag2, tag3, tag4, tag5, detail\
        FROM attraction__attractionDetail\
        "
    with conn:
        with conn.cursor() as curs:
            curs.execute(SQL)
            data = curs.fetchall()

    column_names = ['attraction_id', 'attraction_name', 'latitude', 'longitude',
               'thai_child_fee', 'thai_adult_fee', 'province', 'monday',
               'tuesday', 'wednesday', 'thursday', 'friday',
               'saturday', 'sunday', 'recommended_duration', 'ธรรมชาติ', 'นันทนาการ',
                'ประวัติศาสตร์', 'วัฒนธรรม', 'ศิลปะ', 'detail'
    ]
    return pd.DataFrame(data, columns=column_names)

def GetAttractionsRegisType(DATABASE_URL):
    conn = ConnectDatabase(DATABASE_URL)
    SQL = "SELECT attraction_id, attraction_type_id\
        FROM attraction__regis_attractionType\
        "
    with conn:
        with conn.cursor() as curs:
            curs.execute(SQL)
            data = curs.fetchall()

    column_names = ['attraction_id', 'attraction_type_id']
    return pd.DataFrame(data, columns = column_names)

def GetAttractionsType(DATABASE_URL):
    conn = ConnectDatabase(DATABASE_URL)
    SQL = "SELECT attraction_type_id, description\
        FROM attraction__attractionType\
        "
    with conn:
        with conn.cursor() as curs:
            curs.execute(SQL)
            data = curs.fetchall()

    column_names = ['attraction_type_id', 'description']
    return pd.DataFrame(data, columns = column_names)

def GetAccommodations(DATABASE_URL):
    conn = ConnectDatabase(DATABASE_URL)
    SQL = "SELECT accommodation_id, accommodation_name, latitude, longitude, province,\
    display_checkin_time, display_checkout_time, price_range\
    FROM accommodation__accommodationDetail\
    "
    with conn:
        with conn.cursor() as curs:
            curs.execute(SQL)
            data = curs.fetchall()
    column_names = ['accommodation_id', 'accommodation_name', 'latitude', 'longitude', 'province',
            'display_checkin_time', 'display_checkout_time', 'price_range'
    ]
    return pd.DataFrame(data, columns=column_names)
