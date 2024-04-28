from flask import Flask, request, jsonify
from openai import OpenAI

from triviaQuiz import Question, Quiz, Answer
from historicalEvents import EventGenerator, Event
import json
from TopicCache import TopicCache
import psycopg2
from QuizQuestionsGenerator import QuizQuestionsGenerator
from datetime import datetime

from py2neo import Graph
import memgraph
from neo4j import GraphDatabase, RoutingControl

app = Flask(__name__)

# Connect to the database
conn = psycopg2.connect(
    host="localhost",
    port="5432",
    database="historicalOrdering_db",
    user="root",
    password="root"
)

# URI examples: "neo4j://localhost", "neo4j+s://xxx.databases.neo4j.io"
URI = "bolt://localhost:7687"
AUTH = ("root", "root")

with GraphDatabase.driver(URI, auth=AUTH) as client:
    client.verify_connectivity()
    print("seems to be connected!")
 
# Define correct URI and AUTH arguments (no AUTH by default)
# URI = "bolt://localhost:7687"
# AUTH = ("root", "root")
 
# with GraphDatabase.driver(URI, auth=AUTH) as client:
#     # Check the connection
#     client.verify_connectivity()
 
    # Create a user in the database
    # records, summary, keys = client.execute_query(
    #     "CREATE (u:User {name: $name, password: $password}) RETURN u.name AS name;",
    #     name="John",
    #     password="pass",
    #     database_="memgraph",
    # )
 
#     # Get the result
#     for record in records:
#         print(record["name"])
 
#     # Print the query counters
#     print(summary.counters)
 
#     # Find a user John in the database
#     records, summary, keys = client.execute_query(
#         "MATCH (u:User {name: $name}) RETURN u.name AS name",
#         name="John",
#         database_="memgraph",
#     )
 
#     # Get the result
#     for record in records:
#         print(record["name"])
 
#     # Print the query
#     print(summary.query)

# Create a connection to the Neo4j database
# uri = "bolt://localhost:7687"  # Bolt URI for local Neo4j instance
# username = "root"
# password = "root"

# # Create a Neo4j driver instance
# driver = GraphDatabase.driver(uri, auth=(username, password))

# # Define a function to execute a query
# def run_query(query, parameters=None):
#     with driver.session() as session:
#         result = session.run(query, parameters)
#         return result

# # Example usage: Run a query
# query = "CRE"
# # query = "MATCH (n) RETURN n LIMIT 5"
# result = run_query(query)

# Process the result
# for record in result:
#     print(record)

# Define correct URI and AUTH arguments (no AUTH by default)
# URI = "bolt://localhost:7687"
# AUTH = ("", "")
 
# with GraphDatabase.driver(URI, auth=AUTH) as client:
#     # Check the connection
#     client.verify_connectivity()
 
    # # Create a user in the database
    records, summary, keys = client.execute_query(
        "CREATE (u:User {name: $name, password: $password}) RETURN u.name AS name;",
        name="John",
        password="pass",
        database_="memgraph",
    )
 
    # Get the result
    for record in records:
        print("records----")
        print(record["name"])
 
    # Print the query counters
    print(summary.counters)
 
    # Find a user John in the database
    records, summary, keys = client.execute_query(
        "MATCH (u:User {name: $name}) RETURN u.name AS name",
        name="John",
        database_="memgraph",
    )
 
    # Get the result
    for record in records:
        print(record["name"])
 
    # Print the query
    print(summary.query)

def addResponseToMemgraph(transaction, events):

    print(events)
    print(len(events['tasks']))
    event_tasks=events['tasks']

    event1 = event_tasks[0]
    eventDescription1=event1['title']

    query = (
            "CREATE (e1:Event {name: $event1, description: $description1})"
            )
        
    records, summary, keys = transaction.execute_query(
            query,
            event1=event1,
            description1=eventDescription1,
            name="John",
            password="pass",
            database_="memgraph",
        )
    print("event tasks -----" + str(len(event_tasks)))
    for i in range(1, len(event_tasks)):

        event1 = event_tasks[i-1]
        event2 = event_tasks[i]

        print("adding events to memgraph database ------- ")
        eventDescription1=event1['title']
        eventDescription2=event2['title']

        print("event descriptions ")
        print(eventDescription1)
        print(eventDescription2)

        # transaction.run(
        #     "CREATE (e1:Event {name: $eventDescription1, description: $description1}), "
        #     "(e2:Event {name: $event2, description: $description2})", 
        #     event1=event1, description1=description1,
        #     event2=event2, description2=description2
        # )


        # Create two nodes representing events
        query = (
            "MATCH (previousNode:Event {description: $description1})"
            "CREATE (currentNode:Event {description: $description2, name: $event2})"
            "CREATE (previousNode)-[:NEXT]->(currentNode)"
            "RETURN previousNode, currentNode"
        )
        # query = (
        #     "CREATE (e1:Event {name: $event1, description: $description1}), "
        #     "(e2:Event {name: $event2, description: $description2}), "
        #     "(e1)-[:NEXT]->(e2)"
        #     )
        
        records, summary, keys = transaction.execute_query(
            query,
            event1=event1,
            description1=eventDescription1,
            event2=event2,
            description2=eventDescription2,
            name="John",
            password="pass",
            database_="memgraph",
        )

        # records, summary, keys = transaction.execute_query(
        # "MATCH (e1:Event {name: $event1}), (e2:Event {name: $event2}) "
        #         "CREATE (e1)-[:NEXT]->(e2)", event1="Event 1", event2="Event 2", 
        #     event1=event1, description1=eventDescription1,
        #     event2=event2, description2=eventDescription2,
        #     name="John",
        #     password="pass",
        #     database_="memgraph",
        # )

        print("records ------ ") 
        print(records)
        print()
        print(summary)
 
        # Get the result
        # for record in records:
        #     print(record["name"])

        #     print("adding the first event----")
        #     transaction.run("CREATE (e1:Event {name: $eventDescription1, id: $id1, date: $date1, order_id: $order_id1})", 
        #                 event1=eventDescription1, id1=event1['id'], date1=event1['date'],order_id=event1['order_id'])
            

        #     print("adding the second event----")

        #     transaction.run("CREATE (e2:Event {name: $eventDescription2, id: $id2, date: $date2, order_id: $order_id2})", 
        #                 event2=eventDescription2, id2=event2['id'], date2=event2['date'],order_id=event1['order_id'])

        # # # Create a relationship between the nodes to represent the "next" relationship
        #     transaction.run("MATCH (e1:Event {name: $event1}), (e2:Event {name: $event2}) "
        #         "CREATE (e1)-[:NEXT]->(e2)", event1="Event 1", event2="Event 2")
            
        #     print("trying to create relationship---")


def addQuestionsToDBWithLists(numberOfQuestionsList=5, topicList=[''], yearRangeList=['']):
    for topic in topicList:
        for yearRange in yearRangeList:
            addQuestionsToDB(numberOfQuestionsList, topic, yearRange)
            

def addQuestionsToDB(numberOfQuestions, topic='', yearRange=''):
    quizQuestionsGenerator = QuizQuestionsGenerator(numberOfQuestions, topic, yearRange)
    createQuestionsCommand = quizQuestionsGenerator.createCommand()

    with open('../api-key.txt', 'r') as file:
        content = file.read()
        api_key=content

    client = OpenAI(api_key=api_key)
    model_id = "gpt-3.5-turbo"
    completion = client.chat.completions.create(model=model_id,
    messages=[
        {"role": "user", "content": createQuestionsCommand}
    ])

    questions = completion.choices[0].message.content
    print("questions ------ ")
    print(questions)

    events = QuizQuestionsGenerator.readRetrieval(questions, topic)

    cursor = conn.cursor()

    print("events------")
    print(events)
    cursor.execute("CREATE TABLE IF NOT EXISTS questions (id SERIAL PRIMARY KEY, event_description VARCHAR(500) NOT NULL, date VARCHAR(50) NOT NULL, topic VARCHAR(50));")
    for i in range(0, len(events)):
        print("inserting into questions table " + events[i].event_description)
        print("date " + events[i].date)
        print("topic - " + topic)

        if QuizQuestionsGenerator.is_valid_date(events[i].date):
            events[i].date = events[i].date.strip().strip()
            date_obj = datetime.strptime( events[i].date, "%B %d, %Y")
            cursor.execute("INSERT INTO questions (event_description, date, topic) VALUES (%s, %s, %s)", (events[i].event_description, date_obj, topic))

            conn.commit()

topicCache = TopicCache(50)

@app.route("/members")
def members():
    return {"members": ["Member 1", "Member 2", "Member 3"]}

@app.route("/api/data")
def api_data():
    return {"questions": ["question 1", "question 2", "question 3"]}

@app.route('/api/create-new-quiz', methods=['POST', 'GET'])
def create_new_quiz():

    events = Event.getQuestionsFromDB(3, firstYear=1980, lastYear=2000)

    # events = EventGenerator.getEvents(3, topicCache)

    events_arr = []
    for i in range(len(events)):
        onlyEvents = events[i]
        events_json = onlyEvents.to_json()
        events_json_d = json.dumps(events_json)
        events_arr.append(events_json_d)

    # print("events array " + events_arr)

    return jsonify(events_arr)

@app.route('/api/add-new-event', methods=['POST', 'GET'])
def add_new_event():

    events = EventGenerator.getEvents(1, topicCache)

    events_arr = []
    for i in range(len(events)):
        onlyEvents = events[i]
        events_json = onlyEvents.to_json()
        events_json_d = json.dumps(events_json)
        events_arr.append(events_json_d)

    return jsonify(events_arr)

@app.route('/api/submit-form', methods=['POST', 'GET'])
def submit_form():
    # Retrieve form data from the request
    form_data = request.json 

    addResponseToMemgraph()

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

@app.route('/api/submit-answer', methods=['POST', 'GET'])
def submit_answer():
    # Retrieve form data from the request
    answer_data = request.json 

    print("answer_data------------")
    print(answer_data)

    # URI = "bolt://localhost:7687"
    # AUTH = ("root", "root")

    with GraphDatabase.driver(URI, auth=AUTH) as client:

    # driver = GraphDatabase.driver(uri, auth=(user, password))
        
        print("trying to add to memgraph-----------------")

        addResponseToMemgraph(client, answer_data)

    # questions, _ = Quiz.getMultipleQuestionsAndAnswers(int(form_data['numberOfQuestions']), form_data['difficulty'], form_data['topic'])    
    # Process the form data (e.g., save to database)
    # For demonstration purposes, let's just echo back the received data

    # question_arr = []
    # for i in range(len(questions)):
    #     onlyQuestions = questions[i]
    #     question_json = onlyQuestions.to_json()
    #     question_json_d = json.dumps(question_json)
    #     question_arr.append(question_json_d)
        
    # Return a JSON response
    return jsonify(answer_data)
    
    # Return a JSON response
    # return jsonify(response)

if __name__ == "__main__":

    # addQuestionsToDBWithLists(5, ['politics', 'history', 'sports', 'inventions', 'books' 'film', 'animals', 'television'],
    #                            ['1800-1820', '1820-1840', '1840-1860', '1860-1880', '1880-1900', '1900-1920', '1920-1940', '1940-1960', '1960-1980', '1980-2000', '2000-2020'])

    app.run(debug=True)

