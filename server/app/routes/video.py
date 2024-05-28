import logging
from flask import Blueprint, request, jsonify, abort, redirect, url_for, current_app
import os
import subprocess
import re
from pytube import YouTube
import assemblyai as aai
import google.generativeai as genai

# Configure logging
logging.basicConfig(level=logging.DEBUG)

video_bp = Blueprint('video', __name__)

@video_bp.route('/view-summarizations', methods=["GET"])
def view_summarizations():
    logging.debug('Received request to view summarizations')
    username = request.args.get('user')
    if not username:
        logging.warning('Username is required')
        return abort(400, "Username is required")

    from app.models.user import User
    from app.models.summarization import Summarization

    user = User.find_one({"username": username})
    if not user:
        logging.warning('User not found')
        return abort(404, "User not found")

    user_id = user["_id"]
    summarizations = Summarization.find({"user_id": user_id})

    result = []
    for summary in summarizations:
        result.append({
            "text": summary.get("result"),
            "video_link": summary.get("video_link")
        })

    logging.info('Summarizations retrieved successfully')
    return jsonify({"summarizations": result})

@video_bp.route('/uploadVideo', methods=['POST'])
def upload_video():
    logging.debug('Received request to upload video')
    if 'video' not in request.files:
        logging.warning('No file part in the request')
        return jsonify({'error': 'No file part'}), 400

    file = request.files['video']
    if file.filename == '':
        logging.warning('No selected file')
        return jsonify({'error': 'No selected file'}), 400

    if file and allowed_file(file.filename):
        filename = file.filename
        file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        logging.info(f'File saved: {file_path}')
        return redirect(url_for('video.process_video', file=filename))
    else:
        logging.warning('Invalid file format')
        return jsonify({'error': 'Invalid file format'}), 400

@video_bp.route('/processVideo', methods=['POST'])
def process_video():
    logging.debug('Received request to process video')
    data = request.get_json()
    logging.debug(f'Request data: {data}')
    youtube_url = data.get('youtube_url')

    if not youtube_url:
        logging.warning('No YouTube URL provided')
        return jsonify({'message': 'No YouTube URL provided'}), 400

    output_path = current_app.config['UPLOAD_FOLDER']
    logging.debug(f'Output path: {output_path}')
    wav_file = download_and_convert_audio_from_youtube(youtube_url, output_path)

    if wav_file:
        logging.info('Video processed successfully')
        return jsonify({'message': 'Video processed successfully', 'wav_file': wav_file})
    else:
        logging.error('Video processing failed')
        return jsonify({'message': 'Video processing failed'}), 500

def allowed_file(filename):
    allowed_extensions = current_app.config['ALLOWED_EXTENSIONS']
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_extensions

# Function to download audio from YouTube and convert to WAV format
def download_and_convert_audio_from_youtube(youtube_url, output_path):
    try:
        logging.debug(f'Starting download and conversion for URL: {youtube_url}')
        yt = YouTube(youtube_url)
        logging.debug('YouTube object created')

        audio_stream = yt.streams.filter(only_audio=True).first()
        logging.debug('Audio stream obtained')

        mp4_file = audio_stream.download(output_path=output_path, filename='outputlmao')
        logging.debug(f'MP4 file downloaded: {mp4_file}')

        wav_file = os.path.join(output_path, "ot.wav")
        logging.debug(f'Output WAV file path: {wav_file}')

        subprocess.run(['ffmpeg', '-i', mp4_file, '-vn', '-acodec', 'pcm_s16le', '-ar', '44100', '-ac', '2', wav_file], check=True)
        logging.debug('Conversion to WAV completed')

        os.remove(mp4_file)
        logging.debug('Temporary MP4 file removed')

        logging.info('Audio downloaded and converted to WAV successfully')
        return wav_file
    except Exception as e:
        logging.error(f'Error during download and conversion: {str(e)}')
        return None

# Function to convert local video file to WAV format
def convert_local_video_to_wav(video_path, output_path):
    try:
        logging.debug(f'Starting conversion for local video: {video_path}')
        wav_file = os.path.join(output_path, "ot.wav")

        subprocess.run(['ffmpeg', '-i', video_path, '-vn', '-acodec', 'pcm_s16le', '-ar', '44100', '-ac', '2', wav_file], check=True)
        logging.debug('Conversion to WAV completed')

        logging.info('Local video converted to WAV successfully')
        return wav_file
    except Exception as e:
        logging.error(f'Error during local video conversion: {str(e)}')
        return None

# Function to check if the input is a URL
def is_url(input_str):
    url_pattern = re.compile(
        r'^(https?:\/\/)?'  # http:// or https://
        r'((([a-z\d]([a-z\d-][a-z\d]))\.)+[a-z]{2,}|'  # domain name
        r'((\d{1,3}\.){3}\d{1,3}))'  # or ip (v4) address
        r'(\:\d+)?(\/[-a-z\d%_.~+])'  # port and path
        r'(\?[;&a-z\d%_.~+=-]*)?'  # query string
        r'(\#[-a-z\d_]*)?$', re.IGNORECASE)  # fragment locator
    return re.match(url_pattern, input_str) is not None

# Main function
if __name__ == "__main__":
    logging.debug('Starting main process')
    input_path = "/Users/Ronak/Downloads/Family.Guy.S14E14.Underage.Peter.720p.WEB-DL.x264-Pahe.ph.mkv"
    output_path = "./"

    if is_url(input_path):
        wav_file = download_and_convert_audio_from_youtube(input_path, output_path)
    else:
        wav_file = convert_local_video_to_wav(input_path, output_path)

    if wav_file:
        aai.settings.api_key = "YOUR_ASSEMBLYAI_API_KEY"
        transcriber = aai.Transcriber()
        transcript = transcriber.transcribe(wav_file)
        logging.debug(f'Transcription: {transcript.text}')

        if transcript.status == aai.TranscriptStatus.error:
            logging.error(transcript.error)
        else:
            logging.info(transcript.text)

        genai.configure(api_key="YOUR_GENAI_API_KEY")
        generation_config = {
            "temperature": 1,
            "top_p": 0.95,
            "top_k": 0,
            "max_output_tokens": 8192,
        }
        safety_settings = [
            {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
            {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
            {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
            {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
        ]
        model = genai.GenerativeModel(
            model_name="gemini-1.5-pro-latest",
            generation_config=generation_config,
            safety_settings=safety_settings
        )
        prompt_parts = [
            f"input: Lecture=\"\"\"{transcript.text}\"\"\"",
            "output: ",
            "input: create some notes with other understanding key points to study",
            "output: ",
        ]
        response = model.generate_content(prompt_parts)
        logging.debug(f'Generated content: {response.text}')
        os.remove(wav_file)
    else:
        logging.error('Audio conversion failed. Please check the input and try again.')


























# from flask import Blueprint, request, jsonify, abort, redirect, url_for, current_app
# import os
# from app.utils.video_processing import download_and_convert_audio_from_youtube  # Import the utility function
# import logging

# # Configure logging
# logging.basicConfig(level=logging.DEBUG)

# video_bp = Blueprint('video', __name__)

# @video_bp.route('/view-summarizations', methods=["GET"])
# def view_summarizations():
#     username = request.args.get('user')
#     if not username:
#         return abort(400, "Username is required")

#     from app.models.user import User
#     from app.models.summarization import Summarization

#     user = User.find_one({"username": username})
#     if not user:
#         return abort(404, "User not found")

#     user_id = user["_id"]
#     summarizations = Summarization.find({"user_id": user_id})

#     result = []
#     for summary in summarizations:
#         result.append({
#             "text": summary.get("result"),
#             "video_link": summary.get("video_link")
#         })

#     return jsonify({"summarizations": result})

# @video_bp.route('/uploadVideo', methods=['POST'])
# def upload_video():
#     if 'video' not in request.files:
#         return jsonify({'error': 'No file part'}), 400

#     file = request.files['video']
#     if file.filename == '':
#         return jsonify({'error': 'No selected file'}), 400

#     if file and allowed_file(file.filename):
#         filename = file.filename
#         file.save(os.path.join(current_app.config['UPLOAD_FOLDER'], filename))
#         return redirect(url_for('video.process_video', file=filename))
#     else:
#         return jsonify({'error': 'Invalid file format'}), 400

# @video_bp.route('/processVideo', methods=['POST'])
# def process_video():
#     data = request.get_json()
#     youtube_url = data.get('youtube_url')

#     if not youtube_url:
#         return jsonify({'message': 'No YouTube URL provided'}), 400

#     output_path = current_app.config['UPLOAD_FOLDER']  # Ensure this is set in your Flask config
#     wav_file = download_and_convert_audio_from_youtube(youtube_url, output_path)

#     if wav_file:
#         return jsonify({'message': 'Video processed successfully', 'wav_file': wav_file})
#     else:
#         return jsonify({'message': 'Video processing failed'}), 500

# def allowed_file(filename):
#     allowed_extensions = current_app.config['ALLOWED_EXTENSIONS']
#     return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_extensions
