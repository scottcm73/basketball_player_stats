# Basketball Player Stats

This Flask application uses basketball player statistics from Kaggle.com. It also uses MySQL, Flask, and plotly.js.

![alt text](https://github.com/scottcm73/basketball_player_stats/blob/master/static/images/maingraph.png)

## Getting Started
The data is in a csv file in the resources folder. Pandas was used to insert the data into a database. 

### Prerequisites

Pandas was used only to insert the data into the mysql database. Flask and sqlalchemy are used to access the database.
The database is MySQL. However other sql databases could be utilized with changes to the connection string. 


### Installing

First, pipenv install is run to install the necessary files. Then, database_create.py is run by itself to put the data from the csv file into the database. The connection string variables are taken from the config.py file. This file is not in the github reposity for security reasons. However, if you have access to your own server, it should be ftped into the proper folder. 

If you do choose to run on heroku, you will need to eliminate the import config line in getdata.py and in database_create.py.
Instead of config.py, heroku requires you to manually put in the environmental variables. Heroku will also require uncommenting the sections of commented code related to getting the environmental variables from heroku.

I recommend using heroku for deployment. You will need to create a requirements.txt file from a pipfile. You will need to install pipenv_to_requirements with pip. You will then need to remove Pipfile and Pipfile.lock from your repository, because these overide requirements.txt. Instead of a config.py file, you will need to manually put in the configuration variables in heroku settings. I included an empty config.py file to show you which variables to put in.

If you choose not to use heroku, the config.py file only needs the name of each of the variables in all caps and set equal to something in quotes. Again this must not be included in the repository for security reasons, but it is needed for local testing.

I used the heroku_branch for deployment and the master branch for local testing.


## Running the tests

Testing should be performed locally before deployment. I deployed on heroku.com. 

For testing, comment out the line in app.py, app.run(host= 0.0.0.0:5001), and instead put in line app.run().
This will run the app locally at 127.0.0.1:5000 by default.


## Deployment

Deployment of the app is on heroku. The requirements.txt works best when it is not frozen. I ran into issues with the requirements frozen.  

## Built With

*  Pandas, numpy, flask, sqlalchemy, plotly, and D3

 

## Versioning

Github was used for versioning. For the versions available, see https://github.com/scottcm73/basketball_player_stats


## Author

* **Scott McMahan** 



## License

This project is free to use as long as you acknowlege it as a source.

## Acknowledgments

An initial data was taken from Kaggle.com. 

## Reference

Baruch, J. Basketball Players Stats per Season - 49 Leagues. Kaggle.com. Retrieved from https://www.kaggle.com/jacobbaruch/basketball-players-stats-per-season-49-leagues on Sept. 9, 2020.

Pandas DataFrames - Writing To And Reading From MySQL Table. pythontic.com. Retrieved from https://pythontic.com/pandas/serialization/mysql on Sept. 10, 2020.






