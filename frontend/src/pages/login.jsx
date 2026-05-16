import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage(){
    const [userType, setUserType] = useState("USER");
    const navigate = useNavigate();

    const[username,setUsername] = useState("");
    const[password,setPassword] = useState("");
    const[error,setError] = useState("");
    const[loading,setLoading] = useState(false);

   // Function to handle form submission
   const handleLogin = async(e) =>{
        e.preventDefault();
        setError("");
        setLoading(true);
        
        try{
            const response = await fetch("/api/accounts/login/",{
                method: "POST",
                headers:{
                    "Content-Type": "application/json",},
                    body: JSON.stringify({
                        username,
                        password,
                        userType
                    }),
                });

                const data= await response.json();

                if(!response.ok){
                    setError(data.message || "Login failed");
                    return;
                }
                // Handle successful login (e.g., store token, redirect)
                localStorage.setItem("username",data.username);
                localStorage.setItem("userType",data.userType);

                if(data.isAdmin){
                    navigate("/adminhome");
                }
                else{navigate("/userhome")}
            }
            catch(err){
                setError("An error occurred. Please try again.");
            }
            finally{
                setLoading(false);
            }
        };



    const handleUserTypeChange = (type) => {
        setUserType(type);
    };

    return(<>
      <main className="flex flex-row  items-center justify-center h-screen bg-black">
        <div className="flex flex-col items-center justify-center w-1/2 h-screen bg-white">
            <img
            src="/src/assets/logo.png"
            alt="Welcome"
            className="w-full h-full object-cover rounded-lg"
            
            />
        </div>
        <div className="flex flex-col items-center  justify-center w-1/2 h-screen bg-white">
             <div className="flex flex-col items-center justify-center w-[70%] bg-zinc-100  rounded-lg shadow-lg">
             <div className="flex flex-col items-center p-10 w-full h-full bg-zinc-300 rounded-lg shadow-lg">
                <h1 className="text-zinc-700 font-extrabold text-4xl" >WELCOME!</h1>
                <div className="flex flex-row rounded-4xl  w-full h-15 m-3 bg-gray-300 p-1 relative">
                    <div className={`absolute  h-15 w-[calc(50%-4px)] bg-white rounded-4xl transition-all duration-300 ${userType === "ADMIN" ? "left-1" : "left-[calc(50%+2px)]"}`}></div>
                    <button 
                    className="w-full h-15  text-gray-700 rounded-4xl  relative z-10 font-medium"
                    onClick={() => handleUserTypeChange("ADMIN")}
                    >
                        Admin
                    </button>
                    <button 
                    className="w-full h-15 text-gray-700 rounded-4xl relative z-10 font-medium"
                    onClick={() => handleUserTypeChange("USER")}
                    >
                        USER
                    </button>
                </div>
                <div className=" w-full h-full p-5 rounded ">
                    <form 
                    onSubmit={handleLogin}
                    className="flex flex-col items-center w-full h-full  gap-5">
                        <label className="self-start text-gray-700 font-medium ">Login as {userType}</label>
                        <label className="self-start -mb-3 ml-2 text-gray-700 font-medium">Username</label>
                        <input 
                        type="text" 
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full h-15 rounded-2xl focus:outline-none bg-white border-gray-300 px-3"/>
                        <label className="self-start -mb-3 ml-2 text-gray-700 font-medium">Password</label>
                        <input 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full h-15 rounded-2xl focus:outline-none border bg-white border-gray-300 px-3"/>
                        {userType === "USER" && <p className="text-gray-600 text-sm self-start ml-3 ">Use the credentials provided by your administrator</p>}
                        {userType === "ADMIN" && <p className="text-gray-600 text-sm self-start ml-3 ">Use your admin credentials to login</p>}
                        <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full h-15 bg-white transition-all duration-300 text-zinc-700 font-bold rounded-4xl hover:bg-gray-100">{loading? "Logging in...":"Login"}</button>
                        <a href="/forgot-password" className="  rounded-4xl self-end text-blue-500 hover:underline">Forgot Password?</a>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                    </form>
                </div>
             </div>

             </div>
        </div>
      </main>

    </>);
}

export default LoginPage;
