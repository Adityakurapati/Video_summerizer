from flask import Flask,jsonfy,request
from flask_cors import CORS 
import os 
import pymongo
connection_url = "mongodb+srv://QuickGlance:quick23@cluster0.cfmhwiy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Video Uploading Config 

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'mp4', 'avi', 'mkv', 'mov'}  # Define allowed file extensions

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


# Mongo Db Setup
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

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload-video', methods=['POST'])
def upload_video():
    # Check if the POST request has the file part
    if 'video' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['video']

    # If user does not select file, browser also submits an empty part without filename
    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    if file and allowed_file(file.filename):
        # Create folder structure if not exists
        os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

        # Save the video file to the uploads folder
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], file.filename))

        return jsonify({'message': 'File uploaded successfully'})
    else:
        return jsonify({'error': 'Invalid file format'})



if __name__ == "__main__":
        app.run(debug=True)
