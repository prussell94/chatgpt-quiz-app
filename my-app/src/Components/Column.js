import {
    SortableContext,
    verticalListSortingStrategy,
    horizontalListSortingStrategy,
    rectSwappingStrategy,
  } from "@dnd-kit/sortable";
  import { useState } from "react";

  import { Event } from "./Event";
//   import { Task } from "./Event";
  
//   import "./Column.css";
  
  function checkAnswer() {  
  }


  export const Column = ({ id, tasks, setTasks, showAnswer }) => {

    console.log("tasks------")
    console.log(tasks);


//   const [newTasks, setNewTasks] = useState([
//     { id: 1, title: "Canadian Independence", order_id:1, backgroundColor: "" },
//     { id: 2, title: "Start of WW2" , order_id:2, backgroundColor: ""},
//     { id: 3, title: "Beatles break up", order_id:3, backgroundColor: "" },
//   ]);

        // Define a function to handle the click event
        const handleClick = () => {
            const updatedTasks = tasks.map(task => {
              // If task_id matches order_id, set backgroundColor to green, else red
              console.log("task order id" + task.order_id)
              console.log("task task id " + task.task_id)
              task.backgroundColor = task.id === task.order_id ? 'green' : 'red';
              return task;
            });

            console.log("updated tasks ---")
            console.log(updatedTasks)
            setTasks(updatedTasks);
          };

    return (
    //   <div className="draggableEventList">
    //     <SortableContext items={tasks} strategy={rectSwappingStrategy}>
    //       {tasks.map((task) => (
    //         <Event key={task.id} id={task.id} title={task.title} />
    //       ))}
    //     </SortableContext>
    //   </div>

    <div className="draggableEventList">
        <SortableContext items={tasks} strategy={rectSwappingStrategy}>
        {tasks.map((task) => (
        <Event color={task.backgroundColor} key={task.id} id={task.id} title={task.title} task={task} showAnswer={showAnswer} />
        ))}
        </SortableContext>
    </div>
    );
  };

  export default Column;


  