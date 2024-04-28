
from openai import OpenAI
import json
import random
from TopicCache import TopicCache
from QuizQuestionsGenerator import QuizQuestionsGenerator
import psycopg2

class Event():

    TOPICS = ["inventions", "sports", "entertainment", "science", "history", "politics", "animals", "biology", "geography"]

    def __init__(self, id, event_description, date):
        self.id=id
        self.event_description=event_description
        self.date=date
    
    def set_date(self, date):
        self._date=date

    def set_answer(self, answer):
        self._answer=answer

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, 
            sort_keys=True, indent=4)
    
    def to_json(self):
        return {
            "event_id": self.id,
            "event_description": self.event_description,
            "date": self.date
        }

    @staticmethod
    def getFirstYear(firstYear):
        return firstYear

    @staticmethod
    def getLastYear(firstYear, range):
        lastYear=firstYear+range
        return lastYear
    
    @staticmethod
    def getTopic():
        topic = random.choice(Event.TOPICS)
        return topic

    @staticmethod
    def getDifferentTopic(events):
        differentTopics = [item for item in Event.TOPICS if item not in events]
        return random.choice(differentTopics)
    
    @staticmethod
    def retrieveNewTopic(topicCache):
        with open('../api-key.txt', 'r') as file:
            content = file.read()
            api_key=content
        client = OpenAI(api_key=api_key)
        model_id = "gpt-3.5-turbo"
        completion = client.chat.completions.create(model=model_id,
        messages=[
            {"role": "user", "content": "Can you generate a random quiz topic"}
        ])
        topicResponse = completion.choices[0].message.content
        newTopic=topicResponse.split(":")[1].lower()

        return newTopic

    @staticmethod
    def retrieveItemAndCheck(topicCache, topic):
        topicCount=0
        if topic in topicCache.cache and topicCount<5:
            topic=Event.retrieveNewTopic(topicCache)
            topicCount=topicCount+1
            print("topic already in cache")
            print(topic)
            print(topicCount)
            Event.retrieveItemAndCheck(topicCache, topic)
        else:
            print("topic has not been used")
            print(topic)
            print(topicCount)
            print(topicCache.cache)
            topicCount=0
            topicCache.put(topic, topic)

    @staticmethod
    def getQuestionsFromDB(numberOfQuestions, topic='', firstYear='', lastYear=''):

        # Connect to the database
        conn = psycopg2.connect(
            host="localhost",
            port="5432",
            database="historicalOrdering_db",
            user="root",
            password="root"
        )

        # quizQuestionsGenerator = QuizQuestionsGenerator(numberOfQuestions, topic, yearRange)
        createQuestionsQuery = QuizQuestionsGenerator.createQuery('', firstYear, lastYear, numberOfQuestions)

        print("questions query " + createQuestionsQuery)

        # with open('../api-key.txt', 'r') as file:
        #     content = file.read()
        #     api_key=content

        # client = OpenAI(api_key=api_key)
        # model_id = "gpt-3.5-turbo"
        # completion = client.chat.completions.create(model=model_id,
        # messages=[
        #     {"role": "user", "content": createQuestionsCommand}
        # ])

        # questions = completion.choices[0].message.content
        # print("questions ------ ")
        # print(questions)

        # events = QuizQuestionsGenerator.readRetrieval(questions, topic)

        cursor = conn.cursor()

        cursor.execute(createQuestionsQuery)

        rows = cursor.fetchall()

        events=[]
        for row in rows:
            print(row)

            event = Event(row[0], row[1], row[4])
            events.append(event)

        cursor.close()
        conn.close()

        return events
    
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
        # client = OpenAI(api_key=api_key)

        firstYear=Event.getFirstYear(1800)
        lastYear=Event.getLastYear(firstYear, 200)

        model_id = "gpt-3.5-turbo"
        completion = client.chat.completions.create(model=model_id,
        messages=[
            {"role": "user", "content": "Can you generate a random quiz topic"}
        ])
        topicResponse = completion.choices[0].message.content

        # model_id = "gpt-3.5-turbo"
        # completion = client.chat.completions.create(model=model_id,
        # messages=[
        #     {"role": "user", "content": "Can you generate a random quiz topic"}
        # ])
        # topicResponse2 = completion.choices[0].message.content

        print("topic response----")
        print(topicResponse)
        firstTopic=topicResponse.split(":")[1].lower()
        # secondTopic=topicResponse2.split(":")[1]

        Event.retrieveItemAndCheck(topicCache, firstTopic)
        # topicCache = TopicCache(max_size=50)
        # if topicCache.get(firstTopic) is None:
        #     print("inserting topic ---- " + firstTopic)
        #     topicCache.put(firstTopic, firstTopic)
        # else:
        #     print("same topic again!!!!")
        #     newTopic=Event.retrieveNewTopic(topicCache)
        #     topicCache.put(newTopic, newTopic)

        # topicCache = TopicCache(max_size=50)
        # if topicCache.get(secondTopic) is None:
        #     topicCache.put(secondTopic, secondTopic)

        print("cache length---" + str(topicCache.length()))

        print("topic cache ---- ")
        print(topicCache)

        print("first topic " + firstTopic)
        # print("second topic " + secondTopic)

        # topic=Event.getTopic()
        # selectedTopics=[]
        # selectedTopics.append(topicResponse)
        # selectedTopics.append(topicResponse2)
        # topic2=Event.getDifferentTopic(selectedTopics)

        # if(topic == topic2):
        #     topic2=Event.getTopic()
        questionToChatGPT = "Can you generate an historical event along with the exact date? I would like your response to be in the format - Event: {event} Date: {date}. I would like the date of the event to be from " + str(firstYear) + " and " + str(lastYear) +". The topic is " + firstTopic
        model_id = "gpt-3.5-turbo"
        completion = client.chat.completions.create(model=model_id,
        messages=[
            {"role": "user", "content": questionToChatGPT}
        ])
        response = completion.choices[0].message.content
        print("question --- " + questionToChatGPT)
        print("res-- " +response)

        eventDescription = response.split("Event:")[1].split("Date:")[0]
        date = response.split("Date:")[-1]
        # event = Event()
        Event.validateResponseFromChatGPT(eventDescription, firstYear, lastYear, date, topicCache)
        print('final date ' + date)
        return eventDescription, date

    @staticmethod
    def validateResponseFromChatGPT(eventDescription, firstYear, lastYear, date, topicCache):
        print("date "+date)
        year=date.split(",")[1].strip().strip('.')
        if(int(year)<int(firstYear) or int(year) > int(lastYear)):
            eventDescription, date=Event.grabEventFromChatGPT(topicCache)
        return eventDescription, date
        
        
class EventGenerator():
    def __init__(self, events):
        self.events=events

    def getEvents(numberOfEvents, topicCache):
        events = []
        for i in range(numberOfEvents):
            eventDescription, date = Event.grabEventFromChatGPT(topicCache)
            event = Event(1, eventDescription, date)

            events.append(event)
        return events


