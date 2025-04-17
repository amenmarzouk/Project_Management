import React, { useRef } from 'react';

import { database } from '../../configuration';
import { ref, update } from 'firebase/database';

const Tasks = (props) => {

    const taskref = useRef({id: "", name: ""});

    const clear_handler = (id) => {
        const dbRef = ref(database, `projects/${props.id}`);
    
        const newTasks = props.project.Tasks.filter((task) => task.id !== id);

    
        update(dbRef, { Tasks: newTasks })
          .then(() => {
            console.log("Task supprimée avec succès");
            props.getone();
          })
          .catch((error) => console.error("Erreur :", error));
      };
      const add_handler = (event) => {
        const genid = Math.random().toString(36);
        taskref.current.id = genid;
        event.preventDefault();
        const dbRef = ref(database, `projects/${props.id}`);
        if (props.project.Tasks) {
          update(dbRef, { Tasks: [...props.project.Tasks, taskref.current] })
            .then(() => {
              console.log("Données envoyées avec succès");
              props.getone();
            })
            .catch((error) => console.error("Erreur :", error));
        } else {
          update(dbRef, { Tasks: [taskref.current] })
            .then(() => {
              console.log("Données envoyées avec succès");
             props.getone();
            })
            .catch((error) => console.error("Erreur :", error));
        }
      };


    return (
        <div > 
            <div className="text-xl text-blue-800 font-bold ">Tasks</div>
        <form className="flex gap-5 mt-3" onSubmit={add_handler}>
          <input
            type="text"
            placeholder="Enter a TASK"
            className="h-10 w-100 bg-gray-200 rounded-md pl-2"
            onChange={(e) => {
              taskref.current = {name: e.target.value };
            }}
            required={true}
          />
          <button
            type="submit"
            className="bg-gray-500 rounded-md py-2 px-1 cursor-pointer"
          >
            Add Task
          </button>
        </form>
        {props.project.Tasks &&
          props.project.Tasks.map((task) => (
            <div
              key={task.id}
              className="bg-gray-200 rounded-md p-2 flex justify-between mt-2"
            >
              <div className="">{task.name}</div>
              <button className="" onClick={() => clear_handler(task.id)}>
                clear
              </button>
            </div>
          ))}
        </div>
    );
}

export default Tasks;
