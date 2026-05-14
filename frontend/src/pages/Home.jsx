import NavBar from "../components/NavBar";
import DashBoard from "../components/DashBoard";

function HomePage() {
    return (
        <main className="flex flex-row w-full h-screen bg-zinc-50 text-zinc-900">
            <div className="w-64 h-full  shadow-lg "><NavBar /></div>
            <div className="w-full    p-4 ">
            <div className="flex-1 w-2/3    rounded-lg bg-white/90 shadow-lg"><DashBoard /></div>
            </div>
        </main>
    );
}

export default HomePage;