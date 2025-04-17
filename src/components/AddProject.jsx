import React, { use, useContext, useEffect, useRef, useState } from "react";
import Sidebar from "./sidebar";
import { useNavigate } from "react-router";
import { push, ref, set } from "firebase/database";
import { database } from "../../configuration";
import { projcontext } from "../context/proj";

import { toast, Bounce, ToastContainer } from "react-toastify";


const AddProject = () => {
  const proj = useContext(projcontext);
   const [visible, setVisible] = useState(false);
  const valuesref = useRef({ Title: "", Description: "", Date: "", Tasks: [] });
const [done, setdone] = useState(false)
  const nav = useNavigate();
const [message, setmessage] = useState("")
  const add_handler = (event) => {
    event.preventDefault();
    const dbRef = ref(database, "projects");
    const missingFields = [];
    if (!valuesref.current.Title) missingFields.push("Title");
    if (!valuesref.current.Description) missingFields.push("Description");
    if (!valuesref.current.Date) missingFields.push("Date");

    if (missingFields.length > 0) {
      const message =
        missingFields.length === 3
          ? "Project Details"
          : missingFields.join(", ");
          setVisible(true)
       toast.warn(`${message} required`, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      }); 
    } else {
     
      push(dbRef, valuesref.current)
        .then(() => {
          console.log("Données envoyées avec succès");
          proj.getallprojects()
          setdone(true)
         
          
        })
        .catch((error) => console.error("Erreur :", error));
    }
  };



useEffect(() => {

  if(done){
    const id=proj.AllProjects[proj.AllProjects.length-1].id
  nav(`/${id}`);}
},[proj.AllProjects])

  return (
    <div className="h-screen bg-gray-100 flex flex-row">
      <Sidebar />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      /> 
      <form className="ml-20 mt-20 flex flex-col gap-5" onSubmit={add_handler}>
        <div className=" flex flex-col gap-2 ">
          <div className="">Title</div>
          <input
            type="text"
            placeholder="Enter Project Name"
            className="h-10 w-100 bg-gray-200 rounded-md pl-2"
            onChange={(e) => (valuesref.current.Title = e.target.value)}
          />
        </div>
        <div className=" flex flex-col gap-2 ">
          <div className="">Description</div>
          <textarea
            placeholder="Enter Project Description"
            className="h-20 w-100  bg-gray-200 rounded-md pt-2 pl-2"
            onChange={(e) => (valuesref.current.Description = e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 ">
          <div className="">Date</div>
          <input
            type="date"
            className="h-10 w-100  bg-gray-200 rounded-md pl-2"
            onChange={(e) => (valuesref.current.Date = e.target.value)}
          />
        </div>
        <div className="flex flex-row gap-3 justify-center items-center mt-5">
          <div className="cursor-pointer" onClick={() => nav("/")}>
            Cancel
          </div>

          <button
            type="submit"
            className="h-10 w-30 bg-red-500 rounded-md cursor-pointer"
          >
            Save
          </button>
       
        </div>
      </form>
    </div>
  );
};

export default AddProject;
