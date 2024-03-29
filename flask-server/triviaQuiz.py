import re
import json
from openai import OpenAI

class Question():
    def __init__(self, question_id, question, choices, topic, answer):
        self.question_id=question_id
        self.question=question
        self.choices=choices
        self.topic=topic
        self.answer=answer

    def to_json(self):
        return {
            "question_id": self.question_id,
            "question": self.question,
            "choices": self.choices,
            "topic": self.topic,
            "answer": self.answer.to_json()
        }
    
    def set_choices(self, choices):
        self._choices=choices

    def set_answer(self, answer):
        self._answer=answer

    def grabQuestionsFromChatGPT(difficulty, topic):
        with open('../api-key.txt', 'r') as file:
            content = file.read()
            api_key=content
        client = OpenAI(api_key=api_key)

        model_id = "gpt-3.5-turbo"
        completion = client.chat.completions.create(model=model_id,
        messages=[
            {"role": "user", "content": "Please generate a multiple choice question of very " +difficulty+ " difficulty relating to the topic of " + topic}
        ])
        response = completion.choices[0].message.content
        print(response)
        return response
    
    def mockGrabQuestionsFromChatGPT(difficulty, topic):
        return "Which movie holds the record for the most Oscar nominations? A) Gone with the Wind B) The Lord of the Rings: The Return of the King C) La La Land D) Titanic"
    
    def parseChoice(question):
        # Use re.split() with a regular expression pattern
        result = re.split(r'\s*(?:A\)|B\)|C\)|D\))\s*', question)

        # Filter out empty strings from the result
        result = [part.strip() for part in result if part]

        # options= question.split("?")[1].split(")")
        return result
    
    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, 
            sort_keys=True, indent=4)

class Answer():
    def __init__(self, correctAnswer, userResponse=''):
        self.userResponse=userResponse

        result = re.split(r'\s*(?:A\)|B\)|C\)|D\))\s*', correctAnswer)

        self.correctAnswer=result[1]

    def set_correctAnswer(self, correctAnswer):
        self._correctAnswer=correctAnswer

    def grabAnswerFromChatGPT(question):
        with open('../api-key.txt', 'r') as file:
            # Read the entire content of the file
            content = file.read()
            api_key=content
        client = OpenAI(api_key=api_key)

        model_id = "gpt-3.5-turbo"
        completion = client.chat.completions.create(model=model_id,
            messages=[
                {"role": "user", "content": question}
            ])
        response = completion.choices[0].message.content
        print(response)
        return response
    
    def mockGrabAnswerFromChatGPT(question):
        return "B) The Lord of the Rings: The Return of the King"
    
    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, 
            sort_keys=True, indent=4)
    
    def to_json(self):
        return {
            "userResponse": self.userResponse,
            "correctAnswer": self.correctAnswer
        }

class Quiz():
    def __init__(self, questions, answers, score):
        self.questions=questions
        self.answers=answers
        self.score=score


    def mockGetMultipleQuestionsAndAnswers(numberOfQuestions):
        questionString = "Which movie holds the record for the most Oscar nominations? A) Gone with the Wind B) The Lord of the Rings: The Return of the King C) La La Land D) Titanic"
        answerString="B) The Lord of the Rings: The Return of the King"
        choices=Question.parseChoice(questionString)

        result = re.split(r'\s*(?:A\)|B\)|C\)|D\))\s*', answerString)

        # Filter out empty strings from the result
        result = [part.strip() for part in result if part]

        questions=[]
        answers=[]

        for i in range(0, numberOfQuestions):

            ##mock behaviour
            mockAnswer=Answer(result[0])
            mockQuestion=Question(i+1, questionString, choices, "movies", mockAnswer)

            questions.append(mockQuestion)
            answers.append(mockAnswer)

        return questions, answers


    def getMultipleQuestionsAndAnswers(numberOfQuestions, difficulty, topic):
    
        questions=[]
        answers=[]

        for i in range(0, numberOfQuestions):

            questionString=Question.grabQuestionsFromChatGPT(difficulty, topic)

            choices=Question.parseChoice(questionString)
            answer=Answer(Answer.grabAnswerFromChatGPT(questionString))
            question=Question(1, questionString, choices, topic, answer)
            questions.append(question)
            answers.append(answer)

        return questions, answers
    