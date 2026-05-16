import React from "react";
import { useState, useEffect } from "react";
import LineOverview from "./DashLineChart";

function DashBoard() {

    

    return(
    <>
      <section className="flex flex-col m-2 w-full h-full shadow-lg  bg-gray-500 rounded-lg p-4">
        <h1 className="flex text-2xl text-black/70 w-35  font-bold mb-4">Dashboard</h1> 
        <div className="flex-1 w-full h-full  bg-gray-600 p-2  text-white shadow-inner shadow-black  rounded-lg " >
            <LineOverview />
        </div>
      </section>
    
    
    
    </>
    
    );
}
export default DashBoard;