from flask import Flask, request, jsonify

from triviaQuiz import Question, Quiz, Answer
import json

app = Flask(__name__)

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
        print("length of questions---" + str(len(questions)))
        print(questions[i])
        onlyQuestions = questions[i]
        print("questions only ------ " + str(onlyQuestions))
        question_json = onlyQuestions.to_json()
        print(type(onlyQuestions))
        question_json_d = json.dumps(question_json)
        question_arr.append(question_json_d)

    print("question_arr---")
    print(question_arr)
    # questions_json = json.dumps(question_arr)

    # print(questions_json)

    # response = {
    #     'message': 'Form data received successfully',
    #     'data': questions_json
    # }

    print("josnify-------")
    print(jsonify(question_arr))
    # Return a JSON response
    return jsonify(question_arr)

# @app.route('/api/retrieve-question', methods=['POST'])
# def submit_form():
#     # Retrieve form data from the request
#     form_data = request.json  # Assuming JSON data is sent from the frontend
    
#     # Process the form data (e.g., save to database)
#     # For demonstration purposes, let's just echo back the received data
#     response = {
#         'message': 'Form data received successfully',
#         'data': form_data
#     }
    
    # Return a JSON response
    # return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True)

