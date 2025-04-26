from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)   # <-- THIS is the magic line 🚀

OLLAMA_URL = 'http://localhost:11434/api/generate'

@app.route('/api/generate', methods=['POST'])
def proxy_generate():
    try:
        response = requests.post(OLLAMA_URL, json=request.json)
        return jsonify(response.json())
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
