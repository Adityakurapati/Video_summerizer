from flask import current_app, g
import pymongo

def get_db():
    if 'db' not in g:
        connection_url = current_app.config['MONGO_URI']
        client = pymongo.MongoClient(connection_url)
        g.db = client['QuickGlance']
    return g.db

def init_db(app):
    app.teardown_appcontext(close_db)

def close_db(e=None):
    db = g.pop('db', None)
    if db is not None:
        db.client.close()
