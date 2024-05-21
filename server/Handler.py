from flask import Flask, request, jsonify, make_response, redirect, url_for
from flask_cors import CORS
import pymongo
import os
import json
from oauthlib.oauth2 import WebApplicationClient
import requests

# Configuration for Google Login
GOOGLE_CLIENT_ID = "43571195800-skg4olbcqbvmpb9ab5d6pia06cau8fc5.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET = "CodeSpecialist.com"
GOOGLE_DISCOVERY_URL = "https://accounts.google.com/.well-known/openid-configuration"

# MongoDB connection URL
connection_url = "mongodb+srv://QuickGlance:quick23@cluster0.cfmhwiy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Create MongoDB client and connect to the database
client = pymongo.MongoClient(connection_url)
QuickGlanceDb = client['QuickGlance']
users_collection = QuickGlanceDb.Users
summerization = QuickGlanceDb.Summerizations
print("Db Connected")

# Initialize Flask application
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Upload folder and allowed file extensions
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'mp4', 'avi', 'mkv', 'mov'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# OAuth2 client setup
client = WebApplicationClient(GOOGLE_CLIENT_ID)

def allowed_file(filename):
    """Check if the file has one of the allowed extensions."""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/uploadVideo', methods=['POST'])
def upload_video():
    """Handle video file uploads."""
    if 'video' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['video']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and allowed_file(file.filename):
        os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], file.filename))
        return jsonify({'message': 'File uploaded successfully'}), 200
    else:
        return jsonify({'error': 'Invalid file format'}), 400

@app.route('/')
def index():
    """Default route to insert a document into MongoDB and return its ID."""
    result_id = summerization.insert_one({"result": "text3"}).inserted_id
    return str(result_id) + " Recorded To DB", 200

@app.route('/getResult')
def result():
    """Route to fetch a specific result from MongoDB and return it."""
    result_data = {"result": "Sample Summerized Result Here1"}
    response = make_response(jsonify(result=result_data))
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response, 200

@app.route('/login')
def login():
    # Find out what URL to hit for Google login
    google_provider_cfg = requests.get(GOOGLE_DISCOVERY_URL).json()
    authorization_endpoint = google_provider_cfg["authorization_endpoint"]

    # Use library to construct the request for login and provide scopes that let you retrieve user's profile from Google
    request_uri = client.prepare_request_uri(
        authorization_endpoint,
        redirect_uri=request.base_url + "/callback",
        scope=["openid", "email", "profile"],
    )
    return redirect(request_uri)

@app.route('/login/callback')
def callback():
    # Get authorization code Google sent back to you
    code = request.args.get("code")

    google_provider_cfg = requests.get(GOOGLE_DISCOVERY_URL).json()
    token_endpoint = google_provider_cfg["token_endpoint"]

    # Prepare and send a request to get tokens
    token_url, headers, body = client.prepare_token_request(
        token_endpoint,
        authorization_response=request.url,
        redirect_url=request.base_url,
        code=code
    )
    token_response = requests.post(
        token_url,
        headers=headers,
        data=body,
        auth=(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET),
    )

    # Parse the tokens
    client.parse_request_body_response(json.dumps(token_response.json()))

    # Get user info
    userinfo_endpoint = google_provider_cfg["userinfo_endpoint"]
    uri, headers, body = client.add_token(userinfo_endpoint)
    userinfo_response = requests.get(uri, headers=headers, data=body)

    # Store user info in the database
    user_info = userinfo_response.json()
    if users_collection.find_one({"sub": user_info["sub"]}) is None:
        users_collection.insert_one(user_info)

    return jsonify(user_info)

if __name__ == "__main__":
    app.run(debug=True)
