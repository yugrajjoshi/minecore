import React from "react";
import UserTopBar from "../components/UserTopBar";

function UserHome(){
    return(
        <> 
        <main className="flex flex-col w-full h-screen bg-gray-300">
            <UserTopBar />
            <h1>User Home</h1>
        </main>
        </>
    );
}

export default UserHome;