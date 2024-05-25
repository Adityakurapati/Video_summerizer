from flask import Blueprint, session, request, redirect, url_for, jsonify, abort
from google.oauth2 import id_token
from google_auth_oauthlib.flow import Flow
from pip._vendor import cachecontrol
import google.auth.transport.requests
import os
import pathlib
import requests
import json

auth_bp = Blueprint('auth', __name__)

# Login with Google
client_secrets_file = os.path.join(pathlib.Path(__file__).parent.parent, "client_secret.json")

flow = Flow.from_client_secrets_file(
    client_secrets_file=client_secrets_file,
    scopes=["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email", "openid"],
    redirect_uri="http://127.0.0.1:5000/callback"
)

@auth_bp.route("/GoogleLogin")
def login():
    authorization_url, state = flow.authorization_url()
    session["state"] = state
    return redirect(authorization_url)

@auth_bp.route("/callback")
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
        audience=os.getenv("GOOGLE_CLIENT_ID")
    )

    session["google_id"] = id_info.get("sub")
    session["name"] = id_info.get("name")
    user = {"name": session["name"]}
    print(user)
    return redirect(f"http://localhost:3000/callback?user={json.dumps(user)}")

@auth_bp.route("/UserLogin", methods=["POST"])
def user_login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    from app.models.user import User
    user = User.find_one({"username": username, "password": password})
    print(user)
    if user:
        session["user_id"] = str(user["_id"])
        session["name"] = user["name"]
        return jsonify({"user": user["name"]})
    else:
        return abort(401, "Invalid credentials")

@auth_bp.route("/UserRegister", methods=["POST"])
def user_register():
    data = request.json
    username = data.get("username")
    password = data.get("password")
    email = data.get("email")

    from app.models.user import User
    if User.find_one({"username": username}):
        return abort(400, "User already exists")

    new_user = {
        "username": username,
        "password": password,  # In a real application, make sure to hash the password
        "email": email
    }
    User.insert_one(new_user)

    return jsonify({"user": username}), 201

@auth_bp.route("/logout")
def logout():
    session.clear()
    return redirect("/")
