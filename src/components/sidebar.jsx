import React, { use, useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { projcontext } from "../context/proj";

import { IoHome } from "react-icons/io5";

const Sidebar = () => {
const prjcont=useContext(projcontext)
  const nav = useNavigate();





    useEffect(() => {
      prjcont.getallprojects();
    console.log("run1");
    },[])
  return (
    <div className="h-full w-60 bg-[#1C1917] flex flex-col gap-7  "> 
    <IoHome  className="ml-5 mt-5 cursor-pointer" color="white" size={20} onClick={()=>nav("/")}/>


<div className=" flex  flex-col gap-5 items-center">
        <div className="text-white text-lg">All Projects</div>
        <button className=" h-10 w-30 bg-blue-500 rounded-md cursor-pointer" onClick={()=>  nav('/add')}>+ Add Project</button>
        {prjcont.AllProjects &&prjcont.AllProjects.map((project) => (
          <Link  to={{pathname:`/${project.id}`}} className="text-white" key={project.id}>{project.Title}</Link>
        ))}
      </div>
</div>
      


  );
};

export default Sidebar;
