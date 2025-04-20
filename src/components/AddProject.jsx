import React, { use, useContext, useEffect, useRef, useState } from "react";
import Sidebar from "./sidebar";
import { useNavigate } from "react-router";
import { push, ref, set } from "firebase/database";
import { database } from "../../configuration";
import { projcontext } from "../context/proj";

import { toast, Bounce, ToastContainer } from "react-toastify";


const AddProject = () => {

  const prjcont = useContext(projcontext);
  



  const nav = useNavigate();

  const valuesref = useRef({ Title: "", Description: "", Date: "" });


 

  const add_handler = async (event) => {
    event.preventDefault();
  try {
    const missingFields = [];
    if (!valuesref.current.Title) missingFields.push("Title");
    if (!valuesref.current.Description) missingFields.push("Description");
    if (!valuesref.current.Date) missingFields.push("Date");
    if (missingFields.length > 0) {
      const message =
        missingFields.length === 3
          ? "Project Details"
          : missingFields.join(", ");
          toast.error(`${message} required`); 
    }else{
      const projectRef = ref(database, "projects");
      const pushed =await push(projectRef, valuesref.current)
           console.log("Données envoyées avec succès");
           prjcont.getallprojects()
           nav(`/${pushed.key}`);
    }
  
  } catch (error) {
    console.error("Erreur :", error)
  }
   
  };




  return (
    <div className="h-screen bg-gray-100 flex flex-row">
      <Sidebar />
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={true}
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
            placeholder="Enter Project Title"
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
            className="h-10 w-30 bg-purple-500 rounded-md cursor-pointer"
            data-dialog-target="dialog"

          >
            Save
          </button>
 
        </div>
      </form>
    </div>
  );
};

export default AddProject;
