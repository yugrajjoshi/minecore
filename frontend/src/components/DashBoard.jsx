import React from "react";
import { useState } from "react";
import LineOverview from "./DashLineChart";

function DashBoard() {
    return(
    <>
      <section className="flex flex-col m-2 w-full h-full shadow-lg  bg-gray-300 rounded-lg p-5">
        <h1 className="flex text-2xl text-black w-35 font-bold mb-4">Dashboard</h1> 
        <div className="flex-1 w-full h-full  bg-gray-2300  text-white drop-shadow-lg rounded-lg " >
            <LineOverview />
        </div>
      </section>
    
    
    
    </>
    
    );
}
export default DashBoard;