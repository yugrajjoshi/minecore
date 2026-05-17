import { AlertTriangle, Clock3, LogOut, ShieldCheck, Users } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import DashBoard from "../components/DashBoard";
import DangerBlock from "../components/dagermeter";
import CurrentShiftDetails from "../components/CurrentShiftDetials";
import EquipmentDetails from "../components/Equipmentdetails";

const overviewCards = [
  {
    label: "Active Employees",
    value: "128",
    helper: "12 assigned to current shift",
    icon: Users,
    color: "bg-blue-100 text-blue-700",
  },
  {
    label: "Current Shift",
    value: "Morning",
    helper: "8:00 AM - 4:00 PM",
    icon: Clock3,
    color: "bg-amber-100 text-amber-700",
  },
  {
    label: "Safety Status",
    value: "Nominal",
    helper: "No critical alerts",
    icon: ShieldCheck,
    color: "bg-green-100 text-green-700",
  },
  {
    label: "Open Alerts",
    value: "03",
    helper: "2 medium, 1 low priority",
    icon: AlertTriangle,
    color: "bg-red-100 text-red-700",
  },
];

function HomePage() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "Admin";

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("isAdmin");
    navigate("/");
  };

  return (
    <main className="flex h-screen w-full overflow-hidden bg-gray-300 text-zinc-900">
      <div className="h-screen w-64 shrink-0 overflow-hidden shadow-2xl">
        <NavBar />
      </div>

      <section className="flex min-w-0 flex-1 flex-col gap-5 overflow-y-auto p-5">
        <header className="flex items-center justify-between rounded-lg bg-gray-500 px-5 py-4 shadow-lg">
          <div>
            <h1 className="text-2xl font-bold text-white">Admin Home</h1>
            <p className="text-sm text-gray-100">
              Monitor employees, shifts, equipment, and mine safety status.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/admin-profile"
              className="flex h-11 items-center gap-3 rounded-lg bg-gray-600 px-3 text-white transition-colors duration-200 hover:bg-gray-700"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-bold text-zinc-700">
                {username.charAt(0).toUpperCase()}
              </div>
              <span className="max-w-32 truncate text-sm font-semibold">
                {username}
              </span>
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="flex h-11 items-center gap-2 rounded-lg bg-white px-4 text-sm font-bold text-zinc-700 transition-colors duration-200 hover:bg-gray-100"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </header>
        <div className="grid flex-1 grid-cols-1 gap-5 xl:grid-cols-3">
          <div className="min-h-96 xl:col-span-2">
            <DashBoard />
          </div>

          <div className="min-h-96">
            <DangerBlock />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          <div className="min-h-96 xl:col-span-2">
            <CurrentShiftDetails />
          </div>

          <div className="min-h-96 overflow-hidden rounded-lg bg-gray-500 shadow-lg">
            <EquipmentDetails />
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
