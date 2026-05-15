import NavBar from "../components/NavBar";
import DashBoard from "../components/DashBoard";
import DangerBlock from "../components/dagermeter";

function HomePage() {
    return (
        <main className="flex flex-row w-full h-screen bg-zinc-800 text-zinc-900">
            <div className="flex flex-col  w-64 h-full  shadow-lg "><NavBar /></div>
            <div className="flex flex-row  w-full h-3/5 border bg-zinc-800  p-4 ">
            <div className="flex w-2/3 shadaow-lg rounded-lg"><DashBoard className=" " /></div>
            <div className="shadow-lg w-1/3 h-full m-2 rounded-2xl " ><DangerBlock /></div>
            </div>

        </main>
    );
}

export default HomePage;