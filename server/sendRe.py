from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/getResult')
def result():
    result_data = {"result": "Sample Video Result Here1"}
    return jsonify(result=result_data)

if __name__ == "__main__":
    app.run(debug=True)
