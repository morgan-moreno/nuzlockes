from psycopg2 import connect, connection

def connect_db() -> connection:
    conn = connect(host='localhost', database='nuzlockes', user='postgres', password='yankees12')
    print('Connected to database')

    return conn

def disconnect_db(conn: connection) -> None:
    conn.close()
    print('Database connection closed')