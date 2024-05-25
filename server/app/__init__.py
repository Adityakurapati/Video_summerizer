from flask import Flask
from flask_cors import CORS
from app.utils.database import init_db

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config.from_object('app.config.Config')

    init_db(app)

    with app.app_context():
        from app.routes.auth import auth_bp
        from app.routes.video import video_bp

        app.register_blueprint(auth_bp)
        app.register_blueprint(video_bp)

    return app
