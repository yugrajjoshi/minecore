import { ClipboardList, Home, LogOut, UserRound, Users } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";

const navItems = [
  {
    label: "Home",
    path: "/adminhome",
    icon: Home,
  },
  {
    label: "Create Shift",
    path: "/createshift",
    icon: ClipboardList,
  },
  {
    label: "Manage Employees",
    path: "/manageemployees",
    icon: Users,
  },
  {
    label: "Admin Profile",
    path: "/admin-profile",
    icon: UserRound,
  },
];

function NavBar() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "Admin";

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("isAdmin");
    navigate("/");
  };

  return (
    <aside className="flex h-screen w-full flex-col overflow-hidden bg-zinc-800 text-gray-300 shadow-2xl">
      <div className="flex h-36 items-center justify-center border-b border-zinc-700 px-6">
        <img src={logo} alt="Minecore" className="h-24 w-24 object-contain" />
      </div>

      <nav className="flex flex-1 flex-col gap-2 overflow-hidden px-3 py-5">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                [
                  "flex h-12 items-center gap-3 rounded-lg px-4 text-sm font-medium transition-colors duration-200",
                  isActive
                    ? "bg-zinc-700 text-white"
                    : "text-gray-300 hover:bg-zinc-700 hover:text-white",
                ].join(" ")
              }
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-zinc-700 p-3">
        <NavLink
          to="/admin-profile"
          className="mb-3 flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition-colors duration-200 hover:bg-zinc-700 hover:text-white"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-700 text-sm font-bold text-white">
            {username.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="truncate font-semibold text-white">{username}</p>
            <p className="text-xs text-gray-400">Administrator</p>
          </div>
        </NavLink>

        <button
          type="button"
          onClick={handleLogout}
          className="flex h-11 w-full items-center gap-3 rounded-lg px-4 text-sm font-medium text-gray-300 transition-colors duration-200 hover:bg-red-500 hover:text-white"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default NavBar;
