import React from "react";
import { useState } from "react";


function DangerList(){

    const[status,setStatus] =useState("NOMINAL");
    const[activestate,setACtivestate] = useState("ACTIVE");
    const[active,setActive] = useState(false);
    
    return(<>
    <main className="flex flex-col gap-2 w-full h-full rounded-2xl p-2 bg-gray-400 " >  

    </main>
    
    </>)

}

export default DangerList;