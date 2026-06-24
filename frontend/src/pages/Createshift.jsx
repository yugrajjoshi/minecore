import React from "react";
    import NavBar from "../components/NavBar";

function CreateShift(){
    return(
        <main className="flex h-screen w-full overflow-hidden bg-gray-300 text-zinc-900">
            <div className="h-screen w-64 shrink-0 overflow-hidden shadow-2xl">
                <NavBar />
            </div>
            <section className="flex min-w-0 flex-1 flex-col gap-5 overflow-y-auto p-5">
                    <header className="flex items-center  justify-between rounded-lg bg-gray-500 px-5 py-4 shadow-lg">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Create Shift</h1>
                        <p className="text-sm text-gray-100">Create new shifts for employees</p>
                    </div>
                </header>
                <div className="flex h-full"  >
                    <div className=" w-2/3 h-full" >
                    <div className  = "border border-gray-500 w-full h-full" >
                        <div  className="flex border bg-gray-500 justify-between  items-center p-2 h-15 " >
                            <h1 className=" font-bold   text-white pl-5 " >Create New Shift</h1>
                            <button className="bg-gray-500 rounded-2xl hover:bg-gray-600  transition-colors cursor-pointer text-white p-2" >Reset</button>
                        </div>
                        <form>
                            <div className="m-2 border" >
                                
                            </div>
                        </form>
                    </div>
                    </div>
                    <div className=" border h-full w-1/3" >
                    <div className =" border w-full h-full" >
                        <h1 className="font-bold bg-gray-500 h-15 w-full text-white p-2 " >Previous Shift Details</h1>
                        <div className="border">    
                        </div>
                    </div>
                    
                    </div>
                </div>
            </section>
        </main>
    )
}

export default CreateShift; 
