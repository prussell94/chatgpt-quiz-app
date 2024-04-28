import re
import uuid
from openai import OpenAI
from dateutil import parser

"""
This class generates the questions that will be asked to ChatGPT. ChatGPT will then 
generate the events and their dates.
"""

class QuizQuestionsGenerator:
    def __init__(self, numberOfEvents=5, topic='any topic', yearRange='') -> None:
        self.numberOfEvents = numberOfEvents
        self.topic = topic
        self.yearRange = yearRange

    def createCommand(self):
        # Implement the logic for creating the command here
        topicCommand = '' if self.topic == '' else 'on the topic of ' + self.topic  
        yearRangeCommand = '' if self.yearRange == '' else 'The events should have occurred in the years ' + self.yearRange
        return "Can you give me "+str(self.numberOfEvents) + " historical events "+ topicCommand + " that occurred and the date that they occurred? " + yearRangeCommand + ". Can you return each answer in the format Event**: {Event} Date**:{Date}. The Date needs to be exact with a year, month and day. These events should be obscure."
    
    def createQuery(topic, firstYear, lastYear, numberOfQuestions):
        topicQuery= '' if topic == '' else 'topic = ' + topic + ' and '
        yearQuery= '' if firstYear == '' or lastYear == '' else "CAST(formatted_date AS DATE) BETWEEN '" + str(firstYear) + "-01-01' AND '" + str(lastYear)+"-12-31' order by RANDOM()"
     
        query = "select * from questions where " + topicQuery + yearQuery + " LIMIT " +  str(numberOfQuestions)
        print('query ' + query)
        return query; 
    
    def readRetrieval(retrievedEvents, topic):
        # pattern = r"Event \d+: (.*?)Date: (.*?)"
        pattern = r"Event \d+: (.*?) Date: (.*?)$"
        # pattern = r"Event(?:\d+|\s\d+): (.*?)\s*Date(?:\d+|\s\d+)?: (.*?)\n\n"

        print("matching------------------")
        # Find all matches using the pattern
        matches = re.findall(pattern, retrievedEvents, re.MULTILINE)

        events = []

        # Print the extracted information
        for match in matches:
            event = match[0]
            date = match[1]
            print(f"Event: {event} Date: {date}")
            random_id = str(uuid.uuid4())
            event = Event(random_id, event, date, topic)
            events.append(event)
        # events = re.split(r'\n\s*Event \d+: ', retrievedEvents)[1:]

        # events = []

        # for event in events:
        #     match = re.match(r'^(\d+):\s*(.*?)\nDate: (.*?)\n', event, re.DOTALL)
        #     if match:
        #         random_id = uuid.uuid4()
        #         event = Event(random_id, match.group(1), match.group(3))
        #         events.append(event)

        return events
    
    def is_valid_date(date_str):
        try:
            parser.parse(date_str)
            return True
        except ValueError:
            return False

    
class Event():
    def __init__(self, id, event_description, date, topic=''):
        self.id=id
        self.event_description=event_description
        self.date=date
        self.topic=topic

    @staticmethod
    def grabEventFromChatGPT(topic):
        with open('../api-key.txt', 'r') as file:
            content = file.read()
            api_key=content

        client = OpenAI(api_key=api_key)

        quizQuestionsGenerator = QuizQuestionsGenerator(5)
        questionsCommand = quizQuestionsGenerator.createCommand()

        model_id = "gpt-3.5-turbo"
        completion = client.chat.completions.create(model=model_id,
        messages=[
            {"role": "user", "content": questionsCommand}
        ])

        questions = completion.choices[0].message.content
        print("questions ------ ")
        print(questions)

        events = QuizQuestionsGenerator.readRetrieval(questions, topic)
        return events