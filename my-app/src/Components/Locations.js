import {
    SortableContext,
    verticalListSortingStrategy,
    horizontalListSortingStrategy,
    rectSwappingStrategy
  } from "@dnd-kit/sortable";
  
  import { Event } from "./Event";
//   import { Task } from "./Event";
  
//   import "./Column.css";
  
  export const Locations = ({ tasks }) => {
    return (
      <div className="draggableEventList">
        <SortableContext items={tasks} strategy={rectSwappingStrategy}>
          {tasks.map((task) => (
            <Event key={task.id} id={task.id} title={task.title} />
          ))}
        </SortableContext>
      </div>
    );
  };

  export default Locations;