import React, { useState, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import ItemTypes from './ItemTypes';

// import { ItemTypes } from './ItemTypes';

  
const HEvent = ({ event , index}) => {

  const ref = useRef(null);

    const [{ isDragging }, drag, preview] = useDrag({
      type: ItemTypes.EVENT,
      // item: (event) => ({ id: event.id }),
      item: { id: event.id, index },


      // item: () => ({id}),
      // item: { type: ItemTypes.EVENT, id: event.id },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    });

    return (
      <>
      {isDragging && <div>{event.name}</div>}
      <div
        ref={preview}
        style={{ opacity: isDragging ? 0 : 1 }}
      >
        <div ref={drag}>
          {event.name}
        </div>
      </div>
    </>
    );
  };

  export default HEvent;
