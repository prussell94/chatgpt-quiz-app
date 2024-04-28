import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import "../App.css";

export const Event = ({ color, id, title, task, showAnswer }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    backgroundColor: color,
  };

  const date = task.date;
  const monthName = date.toLocaleString('default', { month: 'long' });

  return (
    <div className="events">
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="draggableEvent"
    >
      {title}
      {task.position_id}

    </div>
    <div className="trueAnswer">
    {showAnswer && <div className="answerDate">{monthName} {date.getDate()}, {date.getFullYear()}</div>}

    </div>
    </div>

    
  );
};

export default Event;