from flask import Flask, render_template, request, session, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import psycopg2
from openai import OpenAI
from flask import jsonify 
from openai import OpenAI
from trivia.triviaQuiz import Question, Answer, Quiz
import json

app = Flask(__name__)

ENV = 'dev'

if ENV == 'dev':
    app.debug = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://root:root@localhost:5432/test_db'

else:
    app.debug = False
    app.config['SQLALCHEMY_DATABASE_URI'] = ''

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)

class User_Answer(db.Model):
    tablename__ = 'user_answer'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    question_id = db.Column(db.Integer)
    given_question = db.Column(db.String(400))
    user_answer = db.Column(db.String(200))
    correct_answer = db.Column(db.String(200))
    is_user_correct = db.Column(db.Boolean)
    category = db.Column(db.String(200))

    def __init__(self, user_id, question_id, given_question, user_answer, correct_answer, is_user_correct, category):
        self.user_id = user_id
        self.question_id = question_id
        self.given_question = given_question
        self.user_answer = user_answer
        self.correct_answer = correct_answer
        self.is_user_correct = is_user_correct
        self.category = category


@app.route('/')

def index():

    topics = ['geography', 'history', 'sports', 'movies']
    difficulties=['easy', 'medium', 'hard']
    numberOfQuestions=[1, 2, 3, 4, 5]

    session['topics'] = topics
    session['difficulties'] = difficulties
    session['numberOfQuestions'] = numberOfQuestions

    return render_template('index.html', topics=topics, difficulties=difficulties, numberOfQuestions=numberOfQuestions)

@app.route('/filterQuiz', methods=['POST', 'GET'])
def handle_user_data():
    if request.method == 'POST':
        # Get the data from the JSON body of the request
        data = request.get_json()
        
        topic = data.get('topic')
        difficulty = data.get('difficulty')

        # Perform any necessary backend processing with the received data
        response = {
            'message': 'Data received successfully!',
            'accept': 'application/json',
            'topic': topic,
            'difficulty': difficulty,
        }

        question=Question.mockGrabQuestionsFromChatGPT(difficulty, topic)
        answer=Answer.mockGrabAnswerFromChatGPT(question)

        numberOfQuestions=5

        # questions, answers = Quiz.getMultipleQuestionsAndAnswers(numberOfQuestions, difficulty, topic)
        questions, answers = Quiz.mockGetMultipleQuestionsAndAnswers(numberOfQuestions)

        questions=[json.loads(question.toJSON()) for question in  questions]

        answers=[json.loads(answer.toJSON()) for answer in answers]

        questionsAndAnswers=[questions, answers]

        answer=Question.parseChoice(answer)

        return {"topic": topic, "difficulty": difficulty, "questions": questions, "answer": answer[0]}

@app.route('/', methods=['POST'])
def submit():
    data = session.get("answer_data",None)
    if request.method == 'POST':

        isAnswerCorrect=True
        # category = data[0][5]

            # Connect to the database
        conn = psycopg2.connect(database="test_db",
                            user="root",
                            password="root",
                            host="localhost", port="5432")
  
        # create a cursor
        cur = conn.cursor()

        if(isAnswerCorrect):
            return render_template("index.html", message='Correct!', data=data)
        else:
            return render_template("index.html", message='Incorrect!', data=data)

if __name__ == '__main__':
    app.secret_key = 'super secret key'
    app.config['SESSION_TYPE'] = 'filesystem'
    app.run()