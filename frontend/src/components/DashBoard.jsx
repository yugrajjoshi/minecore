import React from "react";
import { useState } from "react";
import LineOverview from "./DashLineChart";

function DashBoard() {
    return(
    <>
      <section className="w-full h-full bg-zinc-800 rounded-lg p-5">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div className="w-full h-full bg-white/20 border-black drop-shadow-2xl text-white border rounded-lg " >
            <LineOverview />
        </div>
      </section>
    
    
    
    </>
    
    );
}
export default DashBoard;