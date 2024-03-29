import React, { useState } from 'react';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import '../App.css';
import NavigationBar from './NavigationBar';
import EventList from './EventList';
import Draggable from 'react-draggable';
import { DragDropContext } from 'react-dnd';
import NewDraggableQuiz from './NewDraggableQuiz';


const eventsData = [
  {
    id: 1,
    name: 'Gary Goodspeed',
    date: '11/22/63'
  },
  {
    id: 2,
    name: 'Little Cato',
    date: '03/16/1943'
  },
  {
    id: 3,
    name: 'KVN',
    date: '11/28/1894'
  },
  {
    id: 4,
    name: 'Mooncake',
    date: '10/13/2004'
  },
  {
    id: 5,
    name: 'Quinn Ergon',
    date: '03/16/1989'
  }
]

function DraggableApp() {
  const [events, updateEvents] = useState(eventsData);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(events);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateEvents(items);
  }

  return (

    <div className="App">
        <h3>Events</h3>

        <EventList>
        </EventList>

        {/* <DraggableItem></DraggableItem> */}

        <NewDraggableQuiz></NewDraggableQuiz>

      {/* <header className="App-header">
        <h3>Historical Events Ordering Quiz</h3>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="events">
            <EventList>
            </EventList>
            {(provided) => (
              <ul className="events" {...provided.droppableProps} ref={provided.innerRef}>
                {events.map(({id, name}, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <p>
                            { name }
                          </p>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </header> */}
    </div>

  );
}

export default DraggableApp;