import React from "react";
import { useState } from "react";
import ReactVirtualizedTable from "./ShiftDetailsTable";


function CurrentShiftDetails(){
    
    return(
          <>
          <main className="flex w-full  h-full  bg-gray-500 rounded-lg p-2 shadow-lg">
          <div className="flex flex-col gap-2 w-full h-full" >
            <div className="flex  flex-row w-full gap-1 h-20 shadow-lg bg-gray-400   items-center justify-between  rounded-lg" >
                <h1 className=" flex items-center justify-center  text-2xl font-bold text-black/60 pl-4" >Shift Details</h1>
                <span className="shadow-inner shadow-black font-bold p-1 rounded" >Duration : 
                <span className="text-sm h-10 text-white font-medium p-1 rounded  ">  8:00 AM - 4:00 PM</span>
                </span>

                <span className="font-bold shadow-inner shadow-black p-1 rounded " >SETECTED SHIFT :
                <span className="text-sm h-10 text-white  p-1 rounded" >Morning Shift</span>
                </span>
                <button className="bg-gray-500 shadow-black/90 hover:bg-zinc-400 text-black font-bold rounded-2xl h-10 w-20 mr-2 shadow-sm" >Shifts </button>
                
            </div>

            <div className="w-full  border rounded-lg  h-100" >
                <ReactVirtualizedTable />
            </div>
          </div>

          </main>
          </>
    );
}

export default CurrentShiftDetails;