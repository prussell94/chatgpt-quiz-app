import EventCard from './EventCard';
import Event from './HEvent';
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

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

const EventList = () => {
    const [events, setEvents] = useState(eventsData);

  return (
    <div className="eventList">
        <DndProvider backend={HTML5Backend}>
            {events.map((event) => <Event event={event} />)}
        </DndProvider>
      {/* <EventCard />
      <EventCard />
      <EventCard /> */}
    </div>
  )
}

export default EventList;
