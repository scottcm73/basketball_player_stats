import pandas as pd
import numpy as np
import pymysql
import os
from sqlalchemy import create_engine
#The following would be erased if installed on heroku.
from config import USER, PASSWORD, HOST, PORT, DATABASE, DIALECT, DRIVER, SECRET_KEY


# Use instead of config.py on heroku

# USER=os.environ["USER"]
# PASSWORD=os.environ["PASSWORD"]
# HOST=os.environ["HOST"]
# PORT=os.environ["PORT"]
# DATABASE=os.environ["DATABASE"]
# DIALECT=os.environ["DIALECT"]
# DRIVER=os.environ["DRIVER"]
# SECRET_KEY=os.environ["SECRET_KEY"]

SQALCHEMY_DATABASE_URI = f"{DIALECT}+{DRIVER}://{USER}:{PASSWORD}@{HOST}/{DATABASE}"

engine = create_engine(SQALCHEMY_DATABASE_URI)

mypath = os.path.join("resources", "players_stats_by_season_full_details.csv")
tableName = "b_ball_player_stats"
df = pd.read_csv(mypath)
dbConnection = engine.connect()

try:

    frame = df.to_sql(tableName, dbConnection, if_exists="fail")

except ValueError as vx:

    print(vx)

except Exception as ex:

    print(ex)

else:

    print("Table %s created successfully." % tableName)

finally:

    dbConnection.close()

if __name__ == "__main__":
    # execute only if run as a script
    main()
