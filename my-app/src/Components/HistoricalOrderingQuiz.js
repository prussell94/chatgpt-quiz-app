import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import '../App.css';

const eventsData = [
  {
    id: 1,
    name: 'Gary Goodspeed',
    date: '11/22/1963'
  },
  {
    id: 2,
    name: 'Little Cato',
    date: '03/15/1943'
  },
  {
    id: 3,
    name: 'KVN',
    thumb: '01/02/1893'
  },
  {
    id: 4,
    name: 'Mooncake',
    thumb: '05/12/2004'
  },
  {
    id: 5,
    name: 'Quinn Ergon',
    thumb: '12/23/1989'
  }
]

const HistoricalOrderingQuiz = () => {
  const [events, setEvents] = useState(eventsData);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedEvents = Array.from(events);
    const [reorderedEvent] = reorderedEvents.splice(result.source.index, 1);
    reorderedEvents.splice(result.destination.index, 0, reorderedEvent);
    setEvents(reorderedEvents);
  };

  const handleSubmit = () => {
    // Implement validation and feedback logic
  };

  return (
    <div className="App">
      <h1>Historical Events Quiz</h1>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="events">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="events-container"
            >
              {events.map((event, index) => (
                <Draggable key={event.id} draggableId={event.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="event"
                    >
                      {event.name}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default HistoricalOrderingQuiz;