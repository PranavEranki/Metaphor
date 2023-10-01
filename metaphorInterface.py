from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from constants import METAPHOR_API_KEY # contains our private key!

app = Flask(__name__)

CORS(app)

METAPHOR_API_BASE = ""

headers = {
    'x-api-key': METAPHOR_API_KEY,
    'Content-Type': 'application/json'
}

@app.route('/search', methods=['POST'])
def search_metaphor():
    data = request.json
    query = data.get('query', '')
    
    
    response = requests.post("https://api.metaphor.systems/search", json={"query": query}, headers=headers)
    
    print("search complete")
    if response.status_code == 200:
        return jsonify(response.json()), 200
    else:
        return jsonify({"error": "Failed to fetch data from Metaphor API"}), 500

@app.route('/reprompt', methods=['POST'])
def reprompt():
    selected_urls = request.json['selected_urls']
    total_urls = len(selected_urls)
    
    results_per_url = min(30 // total_urls, 10)
    # 1 url = 10, 2 = 10, 3 = 10, 4 = 7, 5 = 6, etc... can't exceed 30 total.
    all_results = []

    for url in selected_urls:
        response = requests.post(
            "https://api.metaphor.systems/findSimilar",
            headers=headers,
            json={"url": url, "numResults": results_per_url}
        )
        results = response.json().get('results', [])
        all_results.extend(results)

    print("results complete")
    return jsonify({"results": all_results})

if __name__ == '__main__':
    app.run(debug=True)
