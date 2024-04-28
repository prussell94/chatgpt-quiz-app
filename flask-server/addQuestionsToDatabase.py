
from QuizQuestionsGenerator import QuizQuestionsGenerator
from openai import OpenAI
from flask import Flask


app = Flask(__name__)

class Event():
    @staticmethod
    def grabEventFromChatGPT(topicCache):
        with open('../api-key.txt', 'r') as file:
            content = file.read()
            api_key=content

        client = OpenAI(api_key=api_key)

        quizQuestionsGenerator = QuizQuestionsGenerator(5)
        createQuestionsCommand = quizQuestionsGenerator.createCommand()

        model_id = "gpt-3.5-turbo"
        completion = client.chat.completions.create(model=model_id,
        messages=[
            {"role": "user", "content": createQuestionsCommand}
        ])

        questions = completion.choices[0].message.content
        print("questions ------ ")
        print(questions)

        events = QuizQuestionsGenerator.readRetrieval()
        return events
    
    if __name__ == "__main__":
        app.run(debug=True)

    
