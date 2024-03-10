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
# def fetch_bots_names():
#     bot_names = [bot.name for bot in Bot.query.all()]
#     return jsonify({
#         'ok': True, 
#         'msg':'Success',
#         'data': bot_names
#     })
def index():

    topics = ['geography', 'history', 'sports', 'movies']
    difficulties=['easy', 'medium', 'hard']
    numberOfQuestions=[1, 2, 3, 4, 5]

    session['topics'] = topics
    session['difficulties'] = difficulties
    session['numberOfQuestions'] = numberOfQuestions

    return render_template('index.html', topics=topics, difficulties=difficulties, numberOfQuestions=numberOfQuestions)

# def index():
#     # Connect to the database
#     conn = psycopg2.connect(database="test_db",
#                             user="root",
#                             password="root",
#                             host="localhost", port="5432")
  
#     # create a cursor
#     cur = conn.cursor()
  
#     # Select all products from the table
#     cur.execute('''SELECT
# 	* FROM clues OFFSET floor(random() * (
# 		SELECT
# 			COUNT(*)
# 			FROM clues))
#     LIMIT 1;''')
  
#     # # Fetch the data
#     data = cur.fetchall()

#     # Select all products from the table
#     cur.execute('''SELECT DISTINCT * from seasons
#         order by start_date;''')
  
#     # Fetch the data
#     seasons = cur.fetchall()

#     cur.execute('''select DISTINCT value from clues order by value asc;''')

#     clue_values = cur.fetchall()

#     # cur.execute('''select distinct categorytitle from clues group by categorytitle order by categorytitle desc;''')
#     cur.execute('''select distinct categorytitle from clues order by categorytitle desc;''')

#     categories = cur.fetchall()
  
#     # # close the cursor and connection
#     cur.close()
#     conn.close()

#     session['answer_data'] = data
#     session['seasons'] = seasons
#     session['clue_values'] = clue_values
#     return render_template('index.html', data=data, seasons=seasons, clue_values=clue_values, categories=categories)
    # return render_template('index.html', data=data)


@app.route('/filterQuiz', methods=['POST', 'GET'])
def handle_user_data():
    if request.method == 'POST':
        # Get the data from the JSON body of the request
        data = request.get_json()
        print(data)
        
        topic = data.get('topic')
        difficulty = data.get('difficulty')

        # Perform any necessary backend processing with the received data
        response = {
            'message': 'Data received successfully!',
            'accept': 'application/json',
            'topic': topic,
            'difficulty': difficulty,
        }

        # question = grabQuestionsFromChatGPT(difficulty, topic)
        # answer = grabAnswerFromChatGPT(question)

        question=Question.mockGrabQuestionsFromChatGPT(difficulty, topic)
        answer=Answer.mockGrabAnswerFromChatGPT(question)

        numberOfQuestions=5

        # questions, answers = Quiz.getMultipleQuestionsAndAnswers(numberOfQuestions, difficulty, topic)
        questions, answers = Quiz.mockGetMultipleQuestionsAndAnswers(numberOfQuestions)


        # for i in range(0, len(questions)):
        #     choices = parseChoice(question)[1:]
        #     questions[i].set_choices(choices)

        print("questions")
        print(questions)

        print("answers")
        print(answers)

        print("questions")
        print(questions)



        questions=[json.loads(question.toJSON()) for question in  questions]
        print("new questions")
        print(questions)
        answers=[json.loads(answer.toJSON()) for answer in answers]
        [print(answer) for answer in answers]
        print("---help")

        questionsAndAnswers=[questions, answers]

        answer=Question.parseChoice(answer)

        print(questionsAndAnswers)

        # optionA=choices[0]
        # optionB=choices[1]
        # optionC=choices[2]
        # optionD=choices[3]

        print("----sending----")

        return {"topic": topic, "difficulty": difficulty, "questions": questions, "answer": answer[0]}

        
        # response.headers["Content-Type"] = "application/json"
        # Return the response as JSON
        # return {"topic": topic, "difficulty": difficulty, "question": question, "answer": answer[0], "optionA": optionA, "optionB": optionB, "optionC": optionC, "optionD": optionD}
    
# @app.route('/filterQuiz', methods=['POST'])
# def filter():
#     topic=request.form['topic']
#     difficulty=request.form['difficulty']
#     numberOfQuestions=request.form['nofq']

#     print("--topic----")
#     print(topic)

#     print(topic, difficulty, numberOfQuestions)
#     return render_template('index.html', topic=topic, difficulty=difficulty, numberOfQuestions=numberOfQuestions)


        # Connect to the database
    # conn = psycopg2.connect(database="test_db",
    #                         user="root",
    #                         password="root",
    #                         host="localhost", port="5432")
  
    # # create a cursor
    # cur = conn.cursor()
  
    # # Select all products from the table
    # cur.execute('''SELECT
	# * FROM clues OFFSET floor(random() * (
	# 	SELECT
	# 		COUNT(*)
	# 		FROM clues
    #             WHERE ))
    # LIMIT 1;''')
  
    # # Fetch the data
    # data = cur.fetchall()
  
    # # close the cursor and connection
    # cur.close()
    # conn.close()

# @app.route('/filter', methods=['POST'])
# def filter():
#     from_season=request.form['from season']
#     to_season=request.form['to season']

#         # Connect to the database
#     conn = psycopg2.connect(database="test_db",
#                             user="root",
#                             password="root",
#                             host="localhost", port="5432")
  
#     # create a cursor
#     cur = conn.cursor()
  
#     # Select all products from the table
#     cur.execute('''SELECT
# 	* FROM clues OFFSET floor(random() * (
# 		SELECT
# 			COUNT(*)
# 			FROM clues
#                 WHERE ))
#     LIMIT 1;''')
  
#     # Fetch the data
#     data = cur.fetchall()
  
#     # close the cursor and connection
#     cur.close()
#     conn.close()


@app.route('/', methods=['POST'])
def submit():
    data = session.get("answer_data",None)
    if request.method == 'POST':
        # answer= request.form['answer']
        # correctAnswer = data[0][-1]
        # question = data[0][-2]
        # question_id = data[0][0]
        # # answer=answer.lower().replace('the ', '')
        # correctAnswer=correctAnswer.lower().replace('the ', '').replace('<', '')
        # isAnswerCorrect = answer == correctAnswer
        isAnswerCorrect=True
        # category = data[0][5]

            # Connect to the database
        conn = psycopg2.connect(database="test_db",
                            user="root",
                            password="root",
                            host="localhost", port="5432")
  
        # create a cursor
        cur = conn.cursor()

        # cur.execute(
        #     "INSERT INTO user_answer (user_answer, given_question, user_id, question_id, correct_answer, is_user_correct, category) VALUES (%s, %s, %s, %s, %s, %s, %s)",
        #       (answer, question, 1, question_id, correctAnswer, isAnswerCorrect, category))
    
        # conn.commit()

        if(isAnswerCorrect):
            return render_template("index.html", message='Correct!', data=data)
        else:
            return render_template("index.html", message='Incorrect!', data=data)

if __name__ == '__main__':
    app.secret_key = 'super secret key'
    app.config['SESSION_TYPE'] = 'filesystem'
    app.run()