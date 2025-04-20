import React, { useRef, useState } from 'react';

import { database } from '../../configuration';
import { equalTo, get, orderByChild, push, query, ref, remove, set, update } from 'firebase/database';
import { useEffect } from 'react';

const Tasks = (props) => {

 
    const [tasks, setTasks] = useState();
const [value, setvalue] = useState({projectId: props.projid, name: ""})
    const getProjectTasks = () => { 
      const tasksRef = ref(database, 'tasks');
     
        const projectTasksQuery = query(tasksRef, orderByChild("projectId"), equalTo(props.projid));

        get(projectTasksQuery)
          .then((snapshot) => {
            if (snapshot.exists()) {
              const tasksData = snapshot.val();
              const tasksArray = Object.entries(tasksData).map(([id, task]) => ({
                id,
                ...task
              }))
              setTasks(tasksArray);
            }else {
              setTasks([]);
            }})
          .catch((error) => {
            console.error("Erreur :", error);
          })
      }
    

    const clear_handler = (id) => {
      const taskRef = ref(database, `tasks/${id}`);

        remove(taskRef)
        .then(() => {
          console.log("Task supprimée avec succès");
          getProjectTasks();
console.log("t",tasks);

        }).catch((error) => console.error("Erreur :", error));
     
      
      
          
      };
    
      const add_handler = (event) => {
      event.preventDefault();
      const taskRef = ref(database, 'tasks');
    
      push(taskRef, value)
        .then(() => {
          console.log("Task ajoutée avec succès");
getProjectTasks()
setvalue("")
        })
        .catch((error) => console.error("Erreur :", error));

      }

      useEffect(() => {
        
        getProjectTasks();
        setvalue("")
      }
      , [props.projid]);
      console.log("tasks", value);
      
    return (
        <div > 
            <div className="text-xl text-blue-800 font-bold ">Tasks</div>
        <form className="flex gap-5 mt-3" onSubmit={add_handler}>
          <input
            type="text"
            placeholder="Enter a TASK"
            className="h-10 w-100 bg-gray-200 rounded-md pl-2"
            value={value &&value.name}
            onChange={(e) => {
              setvalue({ projectId: props.projid, name: e.target.value });
            }}
            required={true}
          />
          <button
            type="submit"
            className="bg-yellow-600 rounded-md py-2 px-1 cursor-pointer"
          >
            Add Task
          </button>
        </form>
        {tasks &&
          tasks.map((task) => (
            <div
              key={task.id}
              className="bg-gray-200 rounded-md p-2 flex justify-between mt-2"
            >
              <div className="">{task.name}</div>
              <button className="cursor-pointer" onClick={() => clear_handler(task.id)}>
                clear
              </button>
            </div>
          ))}
        </div>
    );
}

export default Tasks;
