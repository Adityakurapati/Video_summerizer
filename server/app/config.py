import os

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'default_secret_key')
    UPLOAD_FOLDER = 'uploads'
    ALLOWED_EXTENSIONS = {'mp4', 'avi', 'mkv', 'mov'}
    MONGO_URI = "mongodb+srv://QuickGlance:quick23@cluster0.cfmhwiy.mongodb.net/?retryWrites=true&w=majority&ssl=true&ssl_cert_reqs=CERT_NONE"
    GOOGLE_CLIENT_ID = "43571195800-skg4olbcqbvmpb9ab5d6pia06cau8fc5.apps.googleusercontent.com"
    OAUTHLIB_INSECURE_TRANSPORT = "1"
