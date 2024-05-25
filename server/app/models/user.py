from app.utils.database import get_db

class User:
    @staticmethod
    def find_one(query):
        db = get_db()
        return db.users.find_one(query)

    @staticmethod
    def insert_one(user_data):
        db = get_db()
        return db.users.insert_one(user_data)
