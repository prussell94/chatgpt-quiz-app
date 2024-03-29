from flask import Flask, request, jsonify

from triviaQuiz import Question, Quiz, Answer
import json
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import psycopg2

app = Flask(__name__)

ENV = 'dev'

if ENV == 'dev':
    app.debug = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://root:root@localhost:5432/chatgpt_basic_quiz_db'

else:
    app.debug = False
    app.config['SQLALCHEMY_DATABASE_URI'] = ''

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)

# example
# conn = psycopg2.connect(database="test_db",
#                         user="root",
#                         password="root",
#                         host="localhost", 
#                         port="5432")

# PostgreSQL connection configuration
conn = psycopg2.connect(
    database="chatgpt_basic_quiz_db",
    user="root",
    password="root",
    host="localhost",
    port="5432"
)

cursor = conn.cursor()

@app.route("/members")
def members():
    return {"members": ["Member 1", "Member 2", "Member 3"]}

@app.route("/api/data")
def api_data():
    return {"questions": ["question 1", "question 2", "question 3"]}

@app.route('/api/submit-form', methods=['POST', 'GET'])
def submit_form():
    # Retrieve form data from the request
    form_data = request.json 

    print(form_data)
    questions, _ = Quiz.getMultipleQuestionsAndAnswers(int(form_data['numberOfQuestions']), form_data['difficulty'], form_data['topic'])    
    # Process the form data (e.g., save to database)
    # For demonstration purposes, let's just echo back the received data

    question_arr = []
    for i in range(len(questions)):
        onlyQuestions = questions[i]
        question_json = onlyQuestions.to_json()
        question_json_d = json.dumps(question_json)
        question_arr.append(question_json_d)

    # Return a JSON response
    return jsonify(question_arr)

@app.route('/addQuestionToDatabase', methods=['POST', 'GET'])
def add_data():
    data = request.get_json()
    question_answered = data['questionAnswered']
    print("question answered that is passed to database")
    print(question_answered)
    
    try:
        cursor.execute("INSERT INTO Questions (question_topic, question_difficulty, correct_answer, question_text, options) VALUES (%s, %s, %s, %s, %s)", 
                       (question_answered['topic'], question_answered['difficulty'], question_answered['answer']['correctAnswer'], 
                        question_answered['question'], question_answered['choices'][1:]))
        # cursor.execute("INSERT INTO questions (correct_answer) VALUES (%s)", (question_answered,))
        cursor.execute("INSERT INTO Quizzes ()")
        conn.commit()
        return jsonify({"message": "Data added successfully"}), 201
    except psycopg2.Error as e:
        conn.rollback()
        print("Error adding data:", e)
        return jsonify({"message": "Error adding data to the database"}), 500
    finally:
        cursor.close()

# @app.route('/api/retrieve-question', methods=['POST'])
# def submit_form():
#     # Retrieve form data from the request
#     form_data = request.json  # Assuming JSON data is sent from the frontend
    
    # Return a JSON response
    # return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True)

