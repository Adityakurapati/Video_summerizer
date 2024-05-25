from app.utils.database import get_db

class Summarization:
    @staticmethod
    def find(query):
        db = get_db()
        return db.Summerizations.find(query)
