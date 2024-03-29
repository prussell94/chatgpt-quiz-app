import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableEvent from './DraggableEvent';
import DroppableLocation from './DroppableLocation';

const initEvents = [
  { id: 1, name: 'Event 1', location: 'Location A' },
  { id: 2, name: 'Event 2', location: 'Location B' },
  { id: 3, name: 'Event 3', location: 'Location C' },
  { id: 4, name: 'Event 4', location: 'Location D' },
  { id: 5, name: 'Event 5', location: 'Location E' },
  { id: 6, name: 'Event 6', location: 'Location F' },
  { id: 7, name: 'Event 7', location: 'Location G' },
  { id: 8, name: 'Event 8', location: 'Location H' },
  // Add more events as needed
];

const initLocations = [
    { id: 1, name: 'Event 1', location: 'Location A' },
    { id: 2, name: 'Event 2', location: 'Location B' },
    { id: 3, name: 'Event 3', location: 'Location C' },
    { id: 4, name: 'Event 4', location: 'Location D' },
    { id: 5, name: 'Event 5', location: 'Location E' },
    { id: 6, name: 'Event 6', location: 'Location F' },
    { id: 7, name: 'Event 7', location: 'Location G' },
    { id: 8, name: 'Event 8', location: 'Location H' },
    ];

// function addEvent() {
//     events.push({id:9, name: 'Event 9', location: 'Location I'})
//     locations.push('Location I')
//     console.log("event and location added")
// }



function NewDraggableQuiz() {

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
    
    const [droppedEvents, setDroppedEvents] = useState([

    ]);
    
    const [locations, setLocations] = useState([
        { id: 1, name: 'Event 1', date: '11/22/1963', location: 'Location A' },
        { id: 2, name: 'Event 2', date: '11/08/1923', location: 'Location B' },
        { id: 3, name: 'Event 3', date: '11/08/1994', location: 'Location C' },
        { id: 4, name: 'Event 4', date: '11/07/1900', location: 'Location D' },
        { id: 5, name: 'Event 5', date: '03/08/2004', location: 'Location E' },
        { id: 6, name: 'Event 6', date: '11/18/1876', location: 'Location F' },
        { id: 7, name: 'Event 7', date: '05/08/1809', location: 'Location G' },
        { id: 8, name: 'Event 8', date: '11/08/2021', location: 'Location H' },
    ]);

    const [isVisible, setIsVisible] = useState(false);


    const maximumEventsReached = () => {
      setIsVisible(true);
    };

    function addEvent() {
        if(events.length < 10) {
            const newEvent = { id: events.length + 1, name: `Event ${events.length + 1}`, location: events.length+1 };
            setEvents(prevEvents => [...prevEvents, newEvent]);
            setLocations(prevLocations => [...prevLocations, newEvent.location]);
            console.log("Event and location added");
        }
        else {
            maximumEventsReached();
        }

      }

      const handleDrop = (droppedItem, newLocation) => {
        console.log("old location: " + droppedItem.name);
        console.log("new location: " + newLocation);
      
        // Update the location of the dropped event in the events array
        const updatedEvents = events.map(event => {
          if (event.id === droppedItem.id) {
            console.log("event--- " + event)
            return { ...event, location: newLocation };
          } else {
            return event;
          }
        });
      
        // Update the locations array
        const updatedLocations = locations.map(locationObj => {
          if (locationObj.id === newLocation.id) {
            // Update the location object with the new event details
            console.log("dropped item------")
            console.log(droppedItem)
            return { ...locationObj, name: droppedItem.name };
          } else {
            return locationObj;
          }
        });
      
        // Update the state with the new events and locations arrays
        setEvents(updatedEvents);
        setLocations(updatedLocations);

      };

    //   const updateDiv = (locationId, newBackgroundColor) => {
    //     // Find the location object in the state based on its ID
    //     const updatedLocations = locations.map(locationObj => {
    //       if (locationObj.id === locationId) {
    //         // Update the div properties as needed
    //         // Example: Update the background color
    //         return { ...locationObj, backgroundColor: newBackgroundColor };
    //       } else {
    //         return locationObj;
    //       }
    //     });

    //     // Update the state with the modified locations array
    //     setLocations(updatedLocations);
    // };

    //   const handleDrop = (droppedItem, newLocation) => {
    //     // Find the dropped item in the events array and update its location
    //     const updatedEvents = events.map(event =>
    //       event.id === droppedItem.id ? { ...event, location: newLocation } : event
    //       setLocations(prevLocations => [
    //         ...prevLocations.slice(0, 2), // Keep the elements before the index unchanged
    //         newLocation, // Replace the element at the specified index with the new location
    //         ...prevLocations.slice(2 + 1) // Keep the elements after the index unchanged
    //       ]);

        // Update the state with the new events array
    //     setEvents(updatedEvents);
    //   };
    
    //   const handleDrop = (droppedItem, newLocation) => {
    //     console.log("old location: " + droppedItem.location);
    //     console.log("new location: " + newLocation.id);
      


        
    //     // Find the dropped item in the events array and update its location
    //     const updatedEvents = events.map(event => {

    //         if (event.id === droppedItem.id) {
    //             console.log("event id equals dropped item id")
    //         // return { ...event, location: newLocation };
    //         // setLocations(prevLocations => [
    //         //     ...prevLocations.slice(0, 2), // Keep the elements before the index unchanged
    //         //     newLocation, // Replace the element at the specified index with the new location
    //         //     ...prevLocations.slice(2 + 1) // Keep the elements after the index unchanged
    //         // ]);
    //         console.log("new locations now " + locations.slice(0)[2].id)
              
    //         } else {
    //             return event;
    //         }
    //         setEvents(updatedEvents);

    //     });
    //     // Update the state with the new events array
    //     console.log("new location: " + newLocation);
    //   };
      
      return (
        <DndProvider backend={HTML5Backend}>
          <div>
            <h1>Sort Events by Location Quiz</h1>
            <div className="draggableEventList">
              {events.map(event => (
                <DraggableEvent key={event.id} event={event} />
              ))}
            </div>
            <button className="addEventButton" onClick={addEvent}>
              Add additional event
            </button>
            {isVisible && <p style={{ color: 'purple', marginLeft: '20px' }}>Maximum number of events reached - cannot add more</p>}
            <p style={{ marginLeft: '20px' }}>
              Sort events with first location being earliest
            </p>
            <div className="locationsList">
              {locations.map(location => (
                <DroppableLocation key={location} location={location} onDrop={(droppedItem) => handleDrop(droppedItem, location)} />
              ))}
            </div>
          </div>
        </DndProvider>
      );
}

export default NewDraggableQuiz;