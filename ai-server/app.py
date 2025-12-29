from flask import Flask, request, jsonify
from model import predict_resource

app = Flask(__name__)

@app.route("/")
def home():
    return jsonify({"message": "AI server running"})

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    total = data.get("totalQuantity")
    available = data.get("availableQuantity")

    if total is None or available is None:
        return jsonify({"error": "Missing data"}), 400

    result = predict_resource(total, available)

    return jsonify({
        "prediction": result
    })

if __name__ == "__main__":
    app.run(port=5001, debug=True)
