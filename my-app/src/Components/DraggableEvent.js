import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import '../App.css';

const DraggableEvent = ({ event, onDrop }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.EVENT,
    item: { id: event.id },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const eventStyles = {
    opacity: isDragging ? 0.5 : 1,
    cursor: 'pointer', // Change cursor to indicate draggable
  };

  // This function is called when the event is dropped onto a location
  const handleDrop = () => {
    onDrop(event); // Call the onDrop callback with the event data
  };

  return (
    <div
      className="draggableEvent"
      ref={drag}
      style={eventStyles}
      onClick={handleDrop} // Call handleDrop function when clicked
    >
      <div style={{ backgroundColor: isDragging ? 'lightblue' : 'white' }}>
        {event.name}
      </div>
    </div>
  );
};

export default DraggableEvent;