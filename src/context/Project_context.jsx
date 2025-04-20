import { get, orderByKey, ref } from "firebase/database";

import { database } from "../../configuration";
import { projcontext } from "./proj";
import { useEffect, useState } from "react";
import { createContext } from "react";


const ProjectProvider = ({ children }) => {

  
    const [AllProjects, setAllProjects] = useState()

  const getallprojects = async () => {
    const db = ref(database, "projects");

    try {
      const snapshot = await get(db)
      if (snapshot.exists()) {
        console.log("Données récupérées :", );
    
        const projects = Object.entries(snapshot.val()).map(([id, project]) => ({
            id, 
            ...project, 
          }));
    setAllProjects(projects)
      } else {
        setAllProjects([])
        console.log("Aucune donnée trouvée !");
      }
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  const c={ getallprojects , AllProjects,setAllProjects}


  return (
  <projcontext.Provider value={c}>
    {children}
    </projcontext.Provider>)
};

export default ProjectProvider;