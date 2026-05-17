import React from "react";
import logo from "../assets/logo.svg";


function UserTopBar() {

    const username = localStorage.getItem("username") || "User";
    const id = "0105CD231162"
    return(
        <>
            <div className="flex flex-row w-full bg-zinc-800 shadow-2xl justify-between items-center h-15">
                <div className="flex items-center justify-center w-1/5 h-15">
                    <img src={logo} alt="Logo" className="h-full w-full" />
                </div>
                <div className="flex items-center justify-center  w-40 h-full">
                    <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
                        <span  className="flex flex-col items-center gap-1">
                        <span className="text-white">{username}</span>
                        <span className="text-gray-500 text-xs ml-1">{id}</span>
                        </span>
                        <img src={""} alt="Logo" className="h-10 w-10 inline-block rounded-full border  ml-2" />
                        
                    </a>
                </div>
                
            </div>
        </>
    );
}

export default UserTopBar;