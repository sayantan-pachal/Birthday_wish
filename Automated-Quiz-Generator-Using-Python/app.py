from flask import Flask, jsonify, request
from flask_cors import CORS  # Allows your HTML file to talk to Python
from quiz_main import load_questions
from quiz import Quiz, Question

app = Flask(__name__)
CORS(app) # This is important so the browser doesn't block the request

@app.route('/api/questions', methods=['GET'])
def get_questions():
    # Uses your existing logic from quiz_main.py
    raw_data = load_questions("questions.csv", num_questions=5)
    
    # Transform objects into a list of dictionaries for the browser
    questions_for_web = []
    for q in raw_data:
        questions_for_web.append({
            "text": q.text,
            "options": q.options,
            "answer": q.answer
        })
    return jsonify(questions_for_web)

@app.route('/api/save', methods=['POST'])
def save_result():
    data = request.json # Receives {username, score}
    # Uses your existing logic from quiz.py to log to results.csv
    dummy_quiz = Quiz([]) 
    dummy_quiz.score = data['score']
    dummy_quiz.log_score(data['username'])
    return jsonify({"status": "success"})

if __name__ == '__main__':
    app.run(port=5000, debug=True)