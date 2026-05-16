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
            <div className=" flex flex-col w-full h-full  items-start justify-between p-5">
				<nav className=" flex flex-col gap-5  items-center justify-between ">
					<Link to="/" className="flex items-center gap-2 text-sm font-medium text-zinc-600 transition hover:text-zinc-900">
						<Home size={20} />
						Home
					</Link>

					<Link to="/login" className="flex items-center gap-2 text-sm font-medium text-zinc-600 transition hover:text-zinc-900">
						<LogIn size={16} />
						Login
					</Link>
				</nav>
			</div>
		</dev>
	);
}

export default NavBar;