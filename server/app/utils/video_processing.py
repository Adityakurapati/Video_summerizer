from pytube import YouTube
import os
import subprocess
import assemblyai as aai
import google.generativeai as genai
import re

# Function to download audio from YouTube and convert to WAV format
def download_and_convert_audio_from_youtube(youtube_url, output_path):
    try:
        # Create a YouTube object
        yt = YouTube(youtube_url)

        # Get the highest quality audio stream
        audio_stream = yt.streams.filter(only_audio=True).first()

        # Download the audio stream as MP4
        mp4_file = audio_stream.download(output_path=output_path, filename='outputlmao')

        # Define output file path for WAV file
        wav_file = os.path.join(output_path, "ot.wav")

        # Convert MP4 to WAV using FFmpeg
        subprocess.run(['ffmpeg', '-i', mp4_file, '-vn', '-acodec', 'pcm_s16le', '-ar', '44100', '-ac', '2', wav_file], check=True)

        # Remove the temporary MP4 file
        os.remove(mp4_file)

        print("Audio downloaded and converted to WAV successfully!")
        return wav_file
    except Exception as e:
        print("Error:", str(e))
        return None

# Function to convert local video file to WAV format
def convert_local_video_to_wav(video_path, output_path):
    try:
        # Define output file path for WAV file
        wav_file = os.path.join(output_path, "ot.wav")

        # Convert video to WAV using FFmpeg
        subprocess.run(['ffmpeg', '-i', video_path, '-vn', '-acodec', 'pcm_s16le', '-ar', '44100', '-ac', '2', wav_file], check=True)

        print("Local video converted to WAV successfully!")
        return wav_file
    except Exception as e:
        print("Error:", str(e))
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
    # Input: YouTube URL or local video file path
    input_path = "/Users/Ronak/Downloads/Family.Guy.S14E14.Underage.Peter.720p.WEB-DL.x264-Pahe.ph.mkv"  # or "path/to/local/video.mp4"
    # Output directory for the downloaded audio file
    output_path = "./"

    if is_url(input_path):
        # Download audio from YouTube and convert to WAV
        wav_file = download_and_convert_audio_from_youtube(input_path, output_path)
    else:
        # Convert local video file to WAV
        wav_file = convert_local_video_to_wav(input_path, output_path)

    # Check if audio conversion was successful
    if wav_file:
        aai.settings.api_key = "95869ed680b04600a079c79f69695973"
        transcriber = aai.Transcriber()
        transcript = transcriber.transcribe(wav_file)
        print("Transcription:", transcript.text)
        
        if transcript.status == aai.TranscriptStatus.error:
            print(transcript.error)
        else:
            print(transcript.text)

        genai.configure(api_key="AIzaSyD_sbiUhaenHrn2_RwBNft0kNuzvRU1leY")
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
        print("Generated content:", response.text)
    else:
        print("Audio conversion failed. Please check the input and try again.")