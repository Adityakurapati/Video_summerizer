from flask import Flask
from flask_cors import CORS 
import pymongo
connection_url = "mongodb+srv://QuickGlance:quick23@cluster0.cfmhwiy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

client = pymongo.MongoClient(connection_url)

app = Flask(__name__)

# Creating Database
# QuickGlanceDb = client.getDatabase('QuickGlance')
QuickGlanceDb = client['QuickGlance']
print("Db Connected")

# Its Collection
summerization = QuickGlanceDb.Summerizations;

# Inserting Document

result_id = summerization.insert_one({
        "result":"text3 "
        }).inserted_id;

@app.route('/')
def index():
        return str(result_id) + " Recorded To DB"

@app.route('/getResult')
def result():
        results = summerization.find({result:"Sample Summerized Result Here1"})
        for r in results:
                print(str(r))
        return str(result_id) + " Recorded To DB"




if __name__ == "__main__":
        app.run(debug=True)
