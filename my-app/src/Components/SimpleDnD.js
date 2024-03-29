import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ItemTypes = {
  BOX: 'box',
};

const DraggableItem = ({ id, text }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.BOX,
    item: { id },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: 'lightblue',
        padding: '8px',
        margin: '8px',
        cursor: 'move',
      }}
    >
      {text}
    </div>
  );
};

const DroppableArea = ({ children }) => {
  const [, drop] = useDrop({
    accept: ItemTypes.BOX,
    drop: () => {}, // Empty drop function to prevent the item from reverting
  });

  return (
    <div
      ref={drop}
      style={{
        width: '300px',
        minHeight: '100px',
        backgroundColor: 'lightgray',
        padding: '20px',
      }}
    >
      {children}
    </div>
  );
};

const SimpleDnD = () => {
  const [items, setItems] = useState([
    { id: 1, text: 'Item 1' },
    { id: 2, text: 'Item 2' },
    { id: 3, text: 'Item 3' },
  ]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: 'flex' }}>
        <DroppableArea>
          {items.map(item => (
            <DraggableItem key={item.id} id={item.id} text={item.text} />
          ))}
        </DroppableArea>
      </div>
    </DndProvider>
  );
};

export default SimpleDnD;