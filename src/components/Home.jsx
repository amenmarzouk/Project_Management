import React, { useContext, useEffect, useState } from 'react';
import Sidebar from './sidebar';
import { Navigate, useNavigate } from 'react-router';
import { projcontext } from '../context/proj';


const Home = () => {
    const prjcont= useContext(projcontext);
    const nav=useNavigate()

    useEffect(() => {
        prjcont.getallprojects();
    },[])


    return (
        <div className='h-screen bg-gray-100 flex'>
            <Sidebar  />
            <div className='h-100 w-100 ml-80 mt-20 flex flex-col items-center justify-center gap-5'>
                <img src={'task.png'} width={100} height={100}/>
                <div>Select a project or get started with a new one</div>
              
                <button className=" h-10 w-30 bg-blue-500 rounded-md text-xs cursor-pointer" onClick={()=>nav('add')}>Create new Project</button>
            </div>
        </div>
        
    );
}

export default Home;
