import { useState, useEffect } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import { Column } from "./Column.js";
import { Locations } from "./Locations.js";

import "../App.css";

function SortableQuiz() {
    const [events, setEvents] = useState([
        { id: 1, name: 'Event 1', date: '11/22/1963', location: 'Location A' },
        { id: 2, name: 'Event 2', date: '11/08/1923', location: 'Location B' },
        { id: 3, name: 'Event 3', date: '11/08/1994', location: 'Location C' },
        { id: 4, name: 'Event 4', date: '11/07/1900', location: 'Location D' },
        { id: 5, name: 'Event 5', date: '03/08/2004', location: 'Location E' },
        { id: 6, name: 'Event 6', date: '11/18/1876', location: 'Location F' },
        { id: 7, name: 'Event 7', date: '05/08/1809', location: 'Location G' },
        { id: 8, name: 'Event 8', date: '11/08/2021', location: 'Location H' },
        // Add more events as needed
      ]);

    const [isVisible, setIsVisible] = useState(false);
    const [isAnswerVisible, setIsAnswerVisible] = useState(false);


  const [tasks, setTasks] = useState([
    { id: 1, title: "Canadian Independence", order_id:1, backgroundColor: "", position_id:1, date: new Date(1867, 6, 1, 0, 0, 0, 0)},
    { id: 2, title: "Start of WW2" , order_id:2, backgroundColor: "", position_id:2, date: new Date(1939, 8, 1, 0, 0, 0, 0)},
    { id: 3, title: "Beatles break up", order_id:3, backgroundColor: "", position_id:3, date: new Date(1974, 11, 29, 0, 0, 0, 0)},
  ]);

  const [locations, setLocations] = useState([
    { id: 4, title: "Add tests to homepage" },
    { id: 5, title: "Fix styling in about section" },
    { id: 6, title: "Learn how to center a div" },
  ])


  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleMouseEnter = () => {
    setShowAnswer(true);
  };

  const handleMouseLeave = () => {
    setShowAnswer(false);
  };

  const [showAnswer, setShowAnswer] = useState(false);
  const [isSubmitAnswerDisabled, setIsSubmitAnswerDisabled] = useState(false);
  const [isAddEventDisabled, setIsAddEventDisabled] = useState(false);
  const [isShowAnswerDisabled, setIsShowAnswerDisabled] = useState(true);

    // Define a function to handle the click event
    const handleClick = () => {
      const sortedTasks = [...tasks].sort((a, b) => new Date(a.date) - new Date(b.date));

      const updatedTasks = tasks.map((task, index) => {
        // If task_id matches order_id, set backgroundColor to green, else red
        task.backgroundColor = task.position_id === sortedTasks[index].position_id ? 'green' : 'red';
        return task;
      });
      setIsShowAnswerDisabled(false);
      setIsSubmitAnswerDisabled(true);
      setIsAddEventDisabled(true);
      setTasks(updatedTasks);

      fetch('/api/submit-answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tasks: updatedTasks }),
      })
      .then(response => {
        if (response.ok) {
          console.log("response is ok")
          return response.json(); // Parse the response body
        } else {
          throw new Error('Error submitting form response not ok: ' + response.statusText);
        }
      })
      .catch(error => {
        // Handle error
        console.error('Error submitting form:', error.message);
      });
    };

    const showAnswerFn = () => {
      setIsAnswerVisible(true);
    }

    const addNewEvent = () => {
      fetch('/api/add-new-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        if (response.ok) {
          console.log("response is ok")
          return response.json(); // Parse the response body
        } else {
          throw new Error('Error submitting form response not ok: ' + response.statusText);
        }
      })
      .then(body => {
        // Handle success
  
        let events_array=[]
        for (let i = 0; i < body.length; i++) {
          let jsonData=JSON.parse(body[i])

          console.log("date ==="  + jsonData.date)
          let cleanDate = jsonData.date.replace(/AD$/, '').replace(/BC\s+/, 'BCE ').replace('.', '');

          console.log("cleaned date ==="  + cleanDate)

          let dateObject = new Date(cleanDate);
          let newOrderId=tasks[tasks.length - 1].order_id+1;
          let newEvent = { id:newOrderId, title: jsonData.event_description, order_id:newOrderId, backgroundColor: "", position_id:newOrderId, date: new Date(dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDay(), 0, 0, 0, 0)}
          events_array = [...events_array, newEvent];
          setTasks(prevTasks => [...prevTasks, newEvent]);
        }
      })
      .catch(error => {
        // Handle error
        console.error('Error submitting form:', error.message);
      });

    }

    const grabAndCreateNewQuiz = () => {
    
      fetch('/api/create-new-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        if (response.ok) {
          return response.json(); // Parse the response body
        } else {
          throw new Error('Error submitting form response not ok: ' + response.statusText);
        }
      })
      .then(body => {
        // Handle success
  
        let events_array=[]
        for (let i = 0; i < body.length; i++) {
          let jsonData=JSON.parse(body[i])

          console.log("date ==="  + jsonData.date)
          let cleanDate = jsonData.date.replace(/AD$/, '').replace(/BC\s+/, 'BCE ').replace('.', '');

          console.log("cleaned date ==="  + cleanDate)

          let dateObject = new Date(cleanDate);
          events_array[i] = { id: jsonData.event_id+i, title: jsonData.event_description, order_id:i+1, backgroundColor: "", position_id:i+1, date: new Date(dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDay(), 0, 0, 0, 0)}

          const originalTasks=[
            { id: 2, title: "Start of WW2" , order_id:2, backgroundColor: "", position_id:2, date: new Date(1939, 8, 1, 0, 0, 0, 0)},
            { id: 1, title: "Canadian Independence", order_id:1, backgroundColor: "", position_id:1, date: new Date(1867, 6, 1, 0, 0, 0, 0)},
            { id: 3, title: "Beatles break up", order_id:3, backgroundColor: "", position_id:3, date: new Date(1974, 11, 29, 0, 0, 0, 0)},
          ]
          setTasks(events_array)
          // setTasks(originalTasks)

          setIsAddEventDisabled(false);
          setIsSubmitAnswerDisabled(false);
          setShowAnswer(false);
          setIsShowAnswerDisabled(true);
          setIsAnswerVisible(false);

        }
      })
      .catch(error => {
        // Handle error
        console.error('Error submitting form:', error.message);
      });
    };

    const createNewQuiz = () => {
        setTasks([
          { id: 2, title: "Start of WW2" , order_id:2, backgroundColor: "", position_id:2, date: new Date(1939, 8, 1, 0, 0, 0, 0)},
          { id: 1, title: "Canadian Independence", order_id:1, backgroundColor: "", position_id:1, date: new Date(1867, 6, 1, 0, 0, 0, 0)},
          { id: 3, title: "Beatles break up", order_id:3, backgroundColor: "", position_id:3, date: new Date(1974, 11, 29, 0, 0, 0, 0)},
        ])

        setIsAddEventDisabled(false);
        setIsSubmitAnswerDisabled(false);
        setShowAnswer(false);
    };

  function addEvent(title, order_id, position_id, backgroundColor, date) {

    // Create new event
    let newDate = new Date(1929, 10, 29, 0, 0, 0, 0);
    const newEvent = {
      id: events.length + 1,
      title: "Black Tuesday signals the beginning of Great Depression",
      order_id: 4,
      position_id: 4,
      backgroundColor: "navajoWhite",
      date: newDate
    };

    setTasks([...tasks, newEvent]);

    // Sort tasks by date
    const sortedTasks = [...tasks, newEvent].sort((a, b) => new Date(a.date) - new Date(b.date));
  
    // Update tasks state with sorted array
    // setTasks(tasks);

  };

  const getOrderIdFromCurrentTasks = (tasks) => {
    console.log("before sorting " + tasks)
    setTasks(tasks.sort((a, b) => a.date - b.date));

    console.log("after sorting " + tasks.Date);
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getTaskPos = (id) => tasks.findIndex((task) => task.id === id);
  const getLocPos = (id) => locations.findIndex((task) => task.id === id);


  const handleDragEnd = (event) => {
    const { active, over } = event;
    console.log("handling drag event")

    if (!active || !over) return;

    if (active.id === over.id) return;

    setTasks((tasks) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);
  
      const updatedTasks = arrayMove(tasks, originalPos, newPos);
  
      // Update the position_id based on the new order of tasks
      updatedTasks.forEach((task, index) => {
        // Assuming position_id is 1-indexed
        task.position_id = index + 1;
      });
  
      return updatedTasks; // Return the updated tasks array
    });

    setLocations((tasks) => {
      const originalLocPos=getLocPos(active.id);
      const newLocPos = getLocPos(over.id);

      return arrayMove(tasks, originalLocPos, newLocPos);
    });

  };

  return (
    <div className="App">
      <h1>Historical Events Sorting Quiz</h1>
      {/* <Input onSubmit={addTask} /> */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
      {tasks && tasks.length > 0 && <div>{tasks[0].position_id}</div>}
              <Column id="toDo" tasks={tasks} setTasks={setTasks} showAnswer={isAnswerVisible} />
        {/* <Locations id="locations" tasks={locations} /> */}
        <div className="showAnswer"></div>
        <div class="buttonDiv">
          <button id="showAnswerBtn" disabled={isShowAnswerDisabled} class="historyBtn" onClick={showAnswerFn}>Show Correct Dates</button>
          <button id="checkAnswerBtn" disabled={isSubmitAnswerDisabled} class="historyBtn" onClick={handleClick}>Submit Answer</button>
          <button id="addEvent" disabled={isAddEventDisabled} class="historyBtn" onClick={() => addNewEvent()} >Add Event</button>
          <button id="newQuizBtn" class="historyBtn" onClick={() => grabAndCreateNewQuiz()} >Create New Quiz</button>
        </div>

      </DndContext>
      
    </div>
  );
}

export default SortableQuiz;