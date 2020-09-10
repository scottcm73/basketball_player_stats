import pandas as pd
import numpy as np
import pymysql
from secret import USER, PASSWORD,  HOST, PORT, DATABASE, DIALECT, DRIVER, CODEWORD
 
SQALLCHEMY_DATABASE_URI = f"{DIALECT}+{DRIVER}://{USER}:{PASSWORD}@{HOST}/{DATABASE}"

engine = create_engine(
    SQALCHEMY_DATABASE_URI
)


