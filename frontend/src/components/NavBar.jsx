import { useState } from "react";
import { Menu, X, Home, LogIn } from "lucide-react";
import { Link } from "react-router-dom";

function NavBar() {
	const[activeButton,setactiveButton] = useState("home");

	return (
		<dev className=" flex flex-col justify-between auto h-full bg-zinc-800 backdrop-blur-sm">
           <div className="flex justify-center  items-start  w-full h-45 " ><img
                  alt="logo.svg" 
                  src="src/assets/logo.svg"
                  />
                  <br/>
                </div>
            <div className=" flex flex-col w-full h-full border mt-5  p-5">
				<nav className=" flex flex-col h-1/2 w-full p-2 border justify-between ">
					<Link to="/adminhome" className=" border w-full flex  gap-5 text-gray-300 rounded-4xl p-3  transition-all duration-300 hover:bg-gray-700 hover:text-white">
						<Home size={20} />
						Home
					</Link>

					<Link to="/createshift" className=" border w-full flex  gap-5 text-gray-300 rounded-4xl p-3  transition-all duration-300 hover:bg-gray-700 hover:text-white">
						<Home size={20} />
						Create Shift
					</Link>
					
					<Link to="/login" className=" border w-full flex  gap-5 text-gray-300 rounded-4xl p-3  transition-all duration-300 hover:bg-gray-700 hover:text-white">
						<LogIn size={16} />
						Login
					</Link>
				</nav>
			</div>
		</dev>
	);
}

export default NavBar;