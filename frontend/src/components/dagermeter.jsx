import React from "react";
import { useState } from "react";
import {LineDotRightHorizontal} from 'lucide-react'
import DangerList from "./DangerList";

function DangerBlock(){

    const[status,setStatus] =useState("NOMINAL");
    const[activestate,setACtivestate] = useState("ACTIVE");
    const[active,setActive] = useState(false);
    
    return(<>
    <main className="flex flex-col gap-2 w-full h-full rounded-lg p-2 bg-gray-500 " >
        <div className="flex flex-row justify-between shadow-lg bg-gray-400 rounded-lg w-full p-1" >
        <h1 className="font-bold text-black/60   text-2xl p-2" >STATUS</h1>
        <div className={`flex gap-4 justfy-between text-2xl  w-1/2 items-center justify-center  pl-4  rounded-2xl font-bold ${status === "NOMINAL" ? "text-green-400" : "text-red-600"}  h-full`}>{status}
        <LineDotRightHorizontal/>
        </div>
        </div>
        <div className=" flex gap-1 w-full  h-15 rounded-4xl" >
            <button 
            className={`w-1/3 h-full rounded-4xl transition-all duration-300 shadow-lg ${activestate === "ACTIVE" ? "bg-gray-300 text-red-500 " : "bg-gray-400"} `} 
            onClick={() => { setACtivestate("ACTIVE"); setActive(true); }}
            >ACTIVE</button>
            <button 
            className={`w-1/3 h-full rounded-4xl transition-all duration-300 shadow-lg ${activestate === "RESOLVED" ? "bg-gray-300 text-yellow-600 " : "bg-gray-400"} `} 
            onClick={() => { setACtivestate("RESOLVED"); setActive(true); }}
            >RESOLVED</button>
            <button 
            className={`w-1/3 h-full rounded-4xl transition-all duration-300 shadow-lg ${activestate === "HISTORY" ? "bg-gray-300 text-blue-500 " : "bg-gray-400"} `} 
            onClick={() => { setACtivestate("HISTORY"); setActive(true); }}
            >HISTORY</button>
        </div>
        <div className="w-full border h-full shadow-inner shadow-black rounded-lg">
         <DangerList />
         </div>
    </main>
    
    </>);
}

export default DangerBlock;