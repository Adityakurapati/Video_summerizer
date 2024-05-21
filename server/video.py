from flask import Flask, request, jsonify, make_response  # Import make_response
from flask_cors import CORS  # Import CORS
import os
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'mp4', 'avi', 'mkv', 'mov'}  # Define allowed file extensions

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/uploadVideo', methods=['POST'])
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

@app.route('/getResult')
def result():
    result_data = {"result": "Sample Summerized Result Here1"}
    response = make_response(jsonify(result=result_data))
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

if __name__ == "__main__":
    app.run(debug=True)
