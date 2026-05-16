import NavBar from "../components/NavBar";
import DashBoard from "../components/DashBoard";
import DangerBlock from "../components/dagermeter";
import CurrentShiftDetails from "../components/CurrentShiftDetials";
import EquipmentDetails from "../components/Equipmentdetails";

function HomePage() {
    return (
        <main className="flex flex-row w-full bg-zinc-800 text-zinc-900">
            <div className="flex flex-col  w-64   shadow-2xl "><NavBar /></div>
            <div className="flex flex-col h-full  w-full" >
            <div className="flex flex-row  w-full h-3/5  bg-zinc-800  p-4 ">
            <div className="flex w-2/3 rounded-lg"><DashBoard className="" /></div>
            <div className="shadow-lg w-1/3  m-2 rounded-2xl " ><DangerBlock /></div>
            </div>
            <div className="flex flex-row h-full w-full  p-4 ">
                <div className="w-2/3  pl-1 pr-4 " ><CurrentShiftDetails /></div>
                <div className="w-1/3 border " ><EquipmentDetails /></div>
            </div>
            </div>

        </main>
    );
}

export default HomePage;