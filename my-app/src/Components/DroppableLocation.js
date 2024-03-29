import React from 'react';
import { useDrop } from 'react-dnd';
import ItemTypes from './ItemTypes';

const DroppableLocation = ({ location, onDrop }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.EVENT,
    // type: ItemTypes.EVENT,

    item: { id: location.id,
            name: location.name },

    drop: (item, monitor) => {
      // Get the dropped item's data
      const droppedItem = monitor.getItem();
      console.log("dropped item: " + item.name)
      // Call the onDrop callback with the dropped item and current location
      onDrop(droppedItem, location);
    },
    // hover(item) { // item is the dragged element
    //   const dragIndex = item.index;
    //   // current element where the dragged element is hovered on
    //   const hoverIndex = location.index;
    //   // If the dragged element is hovered in the same place, then do nothing
    //   if (dragIndex === hoverIndex) { 
    //     return;
    //   }
    //   // If it is dragged around other elements, then move the image and set the state with position changes
    //   // moveImage(dragIndex, hoverIndex);
    //   /*
    //     Update the index for dragged item directly to avoid flickering
    //     when the image was half dragged into the next
    //   */
    //   item.index = hoverIndex;
    // },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
      // Override monitor.canDrop() function
  // canDrop: (item) => {
  //       return (
  //         console.log("pleaseeeeeee")
  //       );
  //     }
  });



  const isActive = isOver && canDrop;

  return (
    <div
      className="location"
      ref={drop}
      style={{ border: isActive ? '3px solid green' : '2px solid black' }}
    >
    {location.name}

      {/* {location} */}
    </div>
  );
};

export default DroppableLocation;