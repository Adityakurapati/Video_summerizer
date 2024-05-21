from flask import Flask, session, abort, redirect, request, jsonify
from flask_cors import CORS
import pymongo
import os
import pathlib
import requests
from google.oauth2 import id_token
from google_auth_oauthlib.flow import Flow
from pip._vendor import cachecontrol
import google.auth.transport.requests
from flask_cors import cross_origin

app = Flask("QuickGlance")
cors = CORS(app, resources={r"/*": {"origins": ["http://localhost:3000"]}})

# CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})  # Allow requests from React frontend

# Database connection
connection_url = "mongodb+srv://QuickGlance:quick23@cluster0.cfmhwiy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = pymongo.MongoClient(connection_url)
QuickGlanceDb = client['QuickGlance']
print("Db Connected")

# Collections
summarizations = QuickGlanceDb.Summerizations
users = QuickGlanceDb.users

app.secret_key = "CodeSpecialist.com"

os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"

GOOGLE_CLIENT_ID = "43571195800-skg4olbcqbvmpb9ab5d6pia06cau8fc5.apps.googleusercontent.com"
client_secrets_file = os.path.join(pathlib.Path(__file__).parent, "client_secret.json")

flow = Flow.from_client_secrets_file(
    client_secrets_file=client_secrets_file,
    scopes=["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email", "openid"],
    redirect_uri="http://127.0.0.1:5000/callback"
)

def login_is_required(function):
    def wrapper(*args, **kwargs):
        if "google_id" not in session:
            return abort(401)  # Authorization required
        else:
            return function()

    return wrapper

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

    # Implement your authentication logic to validate the username and password
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

    # Check if the user already exists
    if users.find_one({"username": username}):
        return abort(400, "User already exists")

    # Insert the new user into the database
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

@app.route("/protected_area")
@login_is_required
def protected_area():
    return f"Hello {session['name']}! <br/> <a href='/logout'><button>Logout</button></a>"

if __name__ == "__main__":
    app.run(debug=True)
