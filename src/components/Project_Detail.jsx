import React, { useContext, useEffect, useRef, useState } from "react";
import Sidebar from "./sidebar";
import { useNavigate, useParams } from "react-router";
import { database } from "../../configuration";
import { get, push, ref, remove, set, update } from "firebase/database";
import { projcontext } from "../context/proj";
import toast, { Toaster } from "react-hot-toast";
import Tasks from "./Tasks";

const ProjectDetail = () => {
  const nav = useNavigate();
  const timeoutRef = useRef(null);
  const prjcont = useContext(projcontext);
  const [Project, setProject] = useState({});
  const params = useParams();
  
  const getoneproject = async () => {
    const db = ref(database, `projects/${params.id}`);
    try {
      const snapshot = await get(db);
      if (snapshot.exists()) {
        setProject(snapshot.val());
      } else {
        console.log("Aucune donnée trouvée !");
      }
    } catch (error) {
      console.error("Erreur :", error);
    }
  };
 

  const delete_handler = async() => {
    try {
      const dbRef = ref(database, `projects/${params.id}`);

       await  remove(dbRef)
  
        console.log("projet supprimée avec succès");
      
        prjcont.getallprojects();
        toast.success("Projet supprimer avec succés");
     
      setTimeout(() => {
        toast.dismiss();
        nav("/");
      }, 1000);
         
      
     
    } catch (error) {
      console.error("Erreur :", error)
    }    
      
  };


  useEffect(() => {
    getoneproject();
  }, [params.id]);

   

  return (
    <div className="h-screen bg-gray-100 flex gap-2">
      <Sidebar />
      <Toaster position="top-center" reverseOrder={false} />
      <div className=" w-200  mt-5  flex flex-col gap-5 gap-5  p-2">
       <div className="self-center font-bold text-lg">Project Details</div> 
        <div className=" flex justify-between ">
          <div className="text-black ">{Project && Project.Title}</div>
          <button
            onClick={delete_handler}
            className="bg-red-500 rounded-md p-2 cursor-pointer"
          >
            Delete
          </button>
        </div>
        <div className="text-black ">{Project && Project.Date}</div>
        <div className="text-black ">{Project && Project.Description}</div>
        <div className="bg-[#D6D3D1] rounded-md h-[3px] w-120 ml-auto mr-auto"></div>
        <Tasks projid={params.id}/>
      </div>
    </div>
  );
};

export default ProjectDetail;
