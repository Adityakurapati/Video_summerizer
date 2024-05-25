from flask import Blueprint, request, jsonify, abort, redirect, url_for, current_app
import os

video_bp = Blueprint('video', __name__)

@video_bp.route('/view-summerizations', methods=["GET"])
def view_summarizations():
    username = request.args.get('user')
    if not username:
        return abort(400, "Username is required")

    from app.models.user import User
    from app.models.summarization import Summarization

    user = User.find_one({"username": username})
    if not user:
        return abort(404, "User not found")

    user_id = user["_id"]
    summarizations = Summarization.find({"user_id": user_id})

    result = []
    for summary in summarizations:
        result.append({
            "text": summary.get("result"),
            "video_link": summary.get("video_link")
        })

    return jsonify({"summarizations": result})

@video_bp.route('/uploadVideo', methods=['POST'])
def upload_video():
    if 'video' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['video']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and allowed_file(file.filename):
        filename = file.filename
        file.save(os.path.join(current_app.config['UPLOAD_FOLDER'], filename))
        return redirect(url_for('video.process_video', file=filename))
    else:
        return jsonify({'error': 'Invalid file format'}), 400

@video_bp.route('/processVideo')
def process_video():
    file = request.args.get('file')
    if not file:
        return jsonify({'message': 'No file specified'}), 400
    result = "Here Is The Summarization Of Video"
    return jsonify({'message': result})

def allowed_file(filename):
    allowed_extensions = current_app.config['ALLOWED_EXTENSIONS']
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_extensions
