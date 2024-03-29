import React, { useState } from 'react';
// import { DndContext, SortableContext, useSortable } from '@dnd-kit/sortable';
import {
    DndContext,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    closestCorners,
  } from "@dnd-kit/core";
  import { arrayMove, sortableKeyboardCoordinates, SortableContext, useSortable } from "@dnd-kit/sortable";

function SortableComponent() {
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);
  const [sortedItems, setSortedItems] = useState(['A', 'B', 'C']);

  const handleSortEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const newItems = [...items];
      const movedItem = newItems.splice(active.id, 1)[0];
      newItems.splice(over.id, 0, movedItem);
      setItems(newItems);
    }
  };

  return (
    <DndContext onDragEnd={handleSortEnd}>
      <div style={{ border: '1px solid black', padding: '10px', marginBottom: '10px' }}>
        <SortableContext items={items}>
          {items.map((item, index) => (
            <SortableItem key={item} id={index}>
              {item}
            </SortableItem>
          )
          )}
        </SortableContext>
      </div>
      <div style={{ border: '10px solid black', padding: '10px' }}>
        <SortableContext items={sortedItems}>
          {sortedItems.map((item, index) => (
            <SortableItem key={item} id={index}>
              {item}
            </SortableItem>
          ))}
        </SortableContext>
      </div>
    </DndContext>
  );
}

function SortableItem({ id, children }) {
    const { attributes, listeners, setNodeRef, transform } = useSortable({ id });
  
    // Provide a default value for transform if it's null
    const { x = 0, y = 0 } = transform ?? {};
  
    return (
      <div
        ref={setNodeRef}
        style={{
          transform: `translate(${x}px, ${y}px)`, // Access properties of transform
          border: '1px solid gray',
          padding: '5px',
          margin: '5px',
          cursor: 'grab',
        }}
        {...attributes}
        {...listeners}
      >
        {children}
      </div>
    );
  }

export default SortableComponent;