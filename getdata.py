from sqlalchemy import create_engine, Column, Integer, String, Float, Date
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
#from config import USER, PASSWORD, HOST, PORT, DATABASE, DIALECT, DRIVER, SECRET_KEY
import pymysql
import json
import datetime
import os

# Use instead of config.py on heroku

USER=os.environ["USER"]
PASSWORD=os.environ["PASSWORD"]
HOST=os.environ["HOST"]
PORT=os.environ["PORT"]
DATABASE=os.environ["DATABASE"]
DIALECT=os.environ["DIALECT"]
DRIVER=os.environ["DRIVER"]
SECRET_KEY=os.environ["SECRET_KEY"]


SQALCHEMY_DATABASE_URI = f"{DIALECT}+{DRIVER}://{USER}:{PASSWORD}@{HOST}/{DATABASE}"
global Base, session

Base = declarative_base()


class DictMixIn:
    def to_dict(self):
        return {
            column.name: getattr(self, column.name)
            if not isinstance(getattr(self, column.name), datetime.datetime)
            else getattr(self, column.name).isoformat()
            for column in self.__table__.columns
        }


class PlayerStats(Base):
    __tablename__ = "b_ball_player_stats"
    index = Column(Integer, primary_key=True)
    league = Column(String(20), nullable=False)
    season = Column(String(10), nullable=False)
    stage = Column(String(15), nullable=False)
    player = Column(String(30), nullable=False)
    team = Column(String(3), nullable=False)
    games_played = Column(Integer, nullable=False)
    minutes_played = Column(Float, nullable=False)
    field_goals_made = Column(Integer, nullable=False)
    field_goal_attempts = Column(Integer, nullable=False)
    three_pointers_made = Column(Integer, nullable=False)
    three_pointer_attempts = Column(Integer, nullable=False)
    free_throws_made = Column(Integer, nullable=False)
    free_throw_attempts = Column(Integer, nullable=False)
    turnovers = Column(Integer, nullable=False)
    personal_fouls = Column(Integer, nullable=False)
    offensive_rebounds = Column(Integer, nullable=False)
    defensive_rebounds = Column(Integer, nullable=False)
    rebounds = Column(Integer, nullable=False)
    assists = Column(Integer, nullable=False)
    steals = Column(Integer, nullable=False)
    blocks = Column(Integer, nullable=False)
    points = Column(Integer, nullable=False)
    birth_year = Column(Integer, nullable=False)
    birth_month = Column(String(3), nullable=False)
    birth_date = Column(Date, nullable=False)
    height_cm = Column(Integer, nullable=False)
    weight = Column(Integer, nullable=False)
    weight_kg = Column(Integer, nullable=False)
    nationality = Column(Integer, nullable=False)
    high_school = Column(String(30), nullable=True)


def make_dict():
    # Only gets NBA players, but data has many leagues.
    all_player_stats = (
        session.query(PlayerStats).filter(PlayerStats.league == "NBA").all()
    )
    the_dict = DictMixIn
    this_dict = []
    for player_stats in all_player_stats:

        my_dict = the_dict.to_dict(player_stats)
        this_dict.append(my_dict)

    return this_dict


engine = create_engine(SQALCHEMY_DATABASE_URI, echo=False)

Session = sessionmaker(bind=engine)
session = Session()

the_dict = make_dict()

session.close()
