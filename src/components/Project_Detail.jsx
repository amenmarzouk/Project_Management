import React, { useContext, useEffect, useRef, useState } from "react";
import Sidebar from "./sidebar";
import { useNavigate, useParams } from "react-router";
import { database } from "../../configuration";
import { get, push, ref, remove, update } from "firebase/database";
import { projcontext } from "../context/proj";
import toast, { Toaster } from "react-hot-toast";

const ProjectDetail = () => {
  const nav = useNavigate();
  const projcon = useContext(projcontext);
  const [Project, setProject] = useState({});
  const taskref = useRef();
  console.log("fff", taskref.current);

  const params = useParams();
  const getoneproject = async () => {
    const db = ref(database, `projects/${params.id}`);
    try {
      const snapshot = await get(db);
      if (snapshot.exists()) {
        console.log("Données", snapshot.val());

        setProject(snapshot.val());
      } else {
        console.log("Aucune donnée trouvée !");
      }
    } catch (error) {
      console.error("Erreur :", error);
    }
  };
  const add_handler = (event) => {
    event.preventDefault();
    const dbRef = ref(database, `projects/${params.id}`);
    if (Project.Tasks) {
      update(dbRef, { Tasks: [...Project.Tasks, taskref.current] })
        .then(() => {
          console.log("Données envoyées avec succès");
          getoneproject();
        })
        .catch((error) => console.error("Erreur :", error));
    } else {
      update(dbRef, { Tasks: [taskref.current] })
        .then(() => {
          console.log("Données envoyées avec succès");
          getoneproject();
        })
        .catch((error) => console.error("Erreur :", error));
    }
  };
  const clear_handler = (id) => {
    const dbRef = ref(database, `projects/${params.id}`);

    const newTasks = Project.Tasks.filter((task) => task.id !== id);
    console.log("eze", Project.Tasks);

    update(dbRef, { Tasks: newTasks })
      .then(() => {
        console.log("Task supprimée avec succès");
        getoneproject();
      })
      .catch((error) => console.error("Erreur :", error));
  };
  const delete_handler = () => {
    const dbRef = ref(database, `projects/${params.id}`);

    remove(dbRef)
      .then(() => {
        console.log("projet supprimée avec succès");

        projcon.getallprojects();
        toast.success("Projet supprimer avec succés");
        setTimeout(() => {
          nav("/");
        }, 1000);
      })
      .catch((error) => console.error("Erreur :", error));
  };
  const genid = Math.random().toString(36);

  useEffect(() => {
    getoneproject();
  }, [params.id]);
  return (
    <div className="h-screen bg-gray-100 flex gap-2">
      <Sidebar />
      <Toaster position="top-center" reverseOrder={false} />
      <div className=" w-200  mt-5  flex flex-col gap-5 gap-5  p-2">
        <div className=" flex justify-between ">
          <div className="text-black ">{Project && Project.Title}</div>
          <button
            onClick={delete_handler}
            className="bg-gray-500 rounded-md py-2 px-1 cursor-pointer"
          >
            Delete
          </button>
        </div>
        <div className="text-black ">{Project && Project.Date}</div>
        <div className="text-black ">{Project && Project.Description}</div>
        <div className="bg-[#D6D3D1] rounded-md h-[3px] w-120 ml-auto mr-auto"></div>
        <div className="">Tasks</div>
        <form className="flex gap-5" onSubmit={add_handler}>
          <input
            type="text"
            placeholder="Enter a TASK"
            className="h-10 w-100 bg-gray-200 rounded-md pl-2"
            onChange={(e) => {
              taskref.current = { id: genid, name: e.target.value };
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
        {Project.Tasks &&
          Project.Tasks.map((task) => (
            <div
              key={task.id}
              className="bg-gray-200 rounded-md p-2 flex justify-between"
            >
              <div className="">{task.name}</div>
              <button className="" onClick={() => clear_handler(task.id)}>
                clear
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProjectDetail;
