from flask import Flask, session, abort, redirect, request, jsonify, url_for
from flask_cors import CORS
import pymongo
import os
import pathlib
import requests
from google.oauth2 import id_token
from google_auth_oauthlib.flow import Flow
from pip._vendor import cachecontrol
import google.auth.transport.requests
import json

app = Flask("QuickGlance")
CORS(app)

# Database connection
connection_url = "mongodb+srv://QuickGlance:quick23@cluster0.cfmhwiy.mongodb.net/?retryWrites=true&w=majority&ssl=true&ssl_cert_reqs=CERT_NONE"
client = pymongo.MongoClient(connection_url)
QuickGlanceDb = client['QuickGlance']
print("Db Connected")

# Collections
summarizations_collection = QuickGlanceDb.Summerizations
users = QuickGlanceDb.users

# Login With Google 
app.secret_key = "CodeSpecialist.com"
os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"

GOOGLE_CLIENT_ID = "43571195800-skg4olbcqbvmpb9ab5d6pia06cau8fc5.apps.googleusercontent.com"
client_secrets_file = os.path.join(pathlib.Path(__file__).parent, "client_secret.json")

flow = Flow.from_client_secrets_file(
    client_secrets_file=client_secrets_file,
    scopes=["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email", "openid"],
    redirect_uri="http://127.0.0.1:5000/callback"
)

# Video Upload 
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'mp4', 'avi', 'mkv', 'mov'}  # Define allowed file extensions

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route("/GoogleLogin")
def login():
    authorization_url, state = flow.authorization_url()
    session["state"] = state
    return redirect(authorization_url)

@app.route("/callback")
def callback():
    flow.fetch_token(authorization_response=request.url)

    if not session["state"] == request.args["state"]:
        abort(500)  # State does not match!

    credentials = flow.credentials
    request_session = requests.session()
    cached_session = cachecontrol.CacheControl(request_session)
    token_request = google.auth.transport.requests.Request(session=cached_session)

    id_info = id_token.verify_oauth2_token(
        id_token=credentials._id_token,
        request=token_request,
        audience=GOOGLE_CLIENT_ID
    )

    session["google_id"] = id_info.get("sub")
    session["name"] = id_info.get("name")
    user = {"name": session["name"]}  # Create user object
    print(user)
    return redirect(f"http://localhost:3000/callback?user={json.dumps(user)}")  # Redirect with user information

@app.route("/UserLogin", methods=["POST"])
def user_login():
    data = request.json  # Use request.json to parse JSON data
    username = data.get("username")
    password = data.get("password")

    user = users.find_one({"username": username, "password": password})
    print(user)
    if user:
        session["user_id"] = str(user["_id"])
        session["name"] = user["name"]
        return jsonify({"user": user["name"]})
    else:
        return abort(401, "Invalid credentials")

@app.route("/UserRegister", methods=["POST"])
def user_register():
    data = request.json  # Use request.json to parse JSON data
    username = data.get("username")
    password = data.get("password")
    email = data.get("email")

    if users.find_one({"username": username}):
        return abort(400, "User already exists")

    new_user = {
        "username": username,
        "password": password,  # In a real application, make sure to hash the password
        "email": email
    }
    users.insert_one(new_user)

    return jsonify({"user": username}), 201

@app.route("/logout")
def logout():
    session.clear()
    return redirect("/")

@app.route("/")
def index():
    return "Hello World <a href='/GoogleLogin'><button>Login</button></a>"

@app.route('/view-summerizations', methods=["GET"])
def view_summarizations():
    username = request.args.get('user')
    if not username:
        return abort(400, "Username is required")

    user = users.find_one({"username": username})
    if not user:
        return abort(404, "User not found")

    user_id = user["_id"]
    summarizations = summarizations_collection.find({"user_id": user_id})

    result = []
    for summary in summarizations:
        result.append({
            "text": summary.get("result"),
            "video_link": summary.get("video_link")
        })

    return jsonify({"summarizations": result})

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

@app.route('/uploadVideo', methods=['POST'])
def upload_video():
    # Check if the POST request has the file part
    if 'video' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['video']

    # If user does not select file, browser also submits an empty part without filename
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and allowed_file(file.filename):
        # Save the video file to the uploads folder
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], file.filename))
        return redirect(url_for('process_video', file=file.filename))
    else:
        return jsonify({'error': 'Invalid file format'}), 400

@app.route('/processVideo')
def process_video():
    file = request.args.get('file')
    if not file:
        return jsonify({'message': 'No file specified'}), 400
    # Process the video file here
    result = "Here Is The Summarization Of Video"
    return jsonify({'message': result})

if __name__ == "__main__":
    app.run(debug=True)
