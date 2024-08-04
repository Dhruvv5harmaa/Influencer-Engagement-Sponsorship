from flask import Flask 
from flask_security import SQLAlchemyUserDatastore,Security
from application.models import db,User,Role
from config import DevelopmentConfig
from application.resources import api
from application.sec import datastore

def create_app():
    app=Flask(__name__)
    app.config.from_object(DevelopmentConfig)
    db.init_app(app) #import this db (SQl Alchemy instance )into the main.py
    api.init_app(app) #import api into main.py
    
    app.security=Security(app,datastore)
    with app.app_context():
        import application.views 
    return app

app= create_app()

if __name__=='__main__':
    app.run(debug=True)