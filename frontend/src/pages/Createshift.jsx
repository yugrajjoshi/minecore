import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";

// Helper functions for date generation
const getTodayString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
};

const getNextDayString = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    date.setDate(date.getDate() + 1);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
};

// Django CSRF token helper
const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
};

function CreateShift() {
    // Form states
    const [shiftType, setShiftType] = useState("Morning");
    const [startDate, setStartDate] = useState(getTodayString());
    const [endDate, setEndDate] = useState(getTodayString());
    const [startTime, setStartTime] = useState("08:00");
    const [endTime, setEndTime] = useState("16:00");
    const [note, setNote] = useState("");
    
    // Status states
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [previousShifts, setPreviousShifts] = useState([]);

    // Fetch previous shifts
    const fetchPreviousShifts = async () => {
        try {
            const response = await fetch("/api/shifts/list/", {
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error("Failed to fetch previous shifts");
            }
            const data = await response.json();
            setPreviousShifts(data);
        } catch (err) {
            console.error("Error fetching previous shifts:", err);
        }
    };

    useEffect(() => {
        fetchPreviousShifts();
    }, []);

    // Handle shift type change
    const handleShiftTypeChange = (type) => {
        setShiftType(type);
        if (type === "Morning") {
            const today = getTodayString();
            setStartDate(today);
            setEndDate(today);
            setStartTime("08:00");
            setEndTime("16:00");
        } else if (type === "Night") {
            const today = getTodayString();
            setStartDate(today);
            setEndDate(getNextDayString(today));
            setStartTime("21:00");
            setEndTime("06:00");
        }
    };

    // Handle start date change
    const handleStartDateChange = (dateVal) => {
        setStartDate(dateVal);
        if (shiftType === "Night") {
            setEndDate(getNextDayString(dateVal));
        }
    };

    // Reset Form
    const handleReset = (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        handleShiftTypeChange("Morning");
        setNote("");
    };

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await fetch("/api/shifts/create/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": getCookie("csrftoken") || ""
                },
                credentials: 'include',
                body: JSON.stringify({
                    shift_type: shiftType,
                    shift_start_date: startDate,
                    shift_end_date: endDate,
                    shift_start_time: startTime,
                    shift_end_time: endTime,
                    note: note
                })
            });

            let data = {};
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                data = await response.json();
            }

            if (!response.ok) {
                throw new Error(data.message || `Request failed with status ${response.status}`);
            }
            setSuccess(data.message || "Shift created successfully!");
            fetchPreviousShifts();
        } catch (err) {
            setError(err.message || "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex h-screen w-full overflow-hidden bg-gray-300 text-zinc-900">
            <div className="h-screen w-64 shrink-0 overflow-hidden shadow-2xl">
                <NavBar />
            </div>
            <section className="flex min-w-0 flex-1 flex-col gap-5 overflow-y-auto p-5">
                <header className="flex items-center justify-between rounded-lg bg-gray-500 px-5 py-4 shadow-lg">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Create Shift</h1>
                        <p className="text-sm text-gray-100">Create new shifts for employees</p>
                    </div>
                </header>
                <div className="flex h-full">
                    <div className="w-2/3 h-full">
                        <div className="flex flex-col border border-gray-500 w-full h-full">
                            <div className="flex bg-gray-500 justify-between items-center p-2 h-15">
                                <h1 className="font-bold text-white pl-5">Create New Shift</h1>
                                <button 
                                    onClick={handleReset}
                                    className="bg-gray-500 rounded-2xl hover:bg-gray-600 transition-colors cursor-pointer text-white p-2"
                                >
                                    Reset
                                </button>
                            </div>
                            <div className="flex m-1 h-full">
                                <form onSubmit={handleSubmit} className="flex flex-col w-full h-full p-5">
                                    <div className="h-4/5 w-full flex gap-5 p-2">
                                        <div className="h-full w-full flex flex-col justify-between p-3">
                                            <div className="p-2 h-30 rounded-2xl shadow-lg shadow-black/30 w-full">
                                                <label htmlFor="shift_type" className="font-bold p-2">ShiftType</label>
                                                <select 
                                                    id="shift_type" 
                                                    value={shiftType}
                                                    onChange={(e) => handleShiftTypeChange(e.target.value)}
                                                    className="shadow-inner shadow-black/40 rounded-3xl w-full bg-gray-400 p-2"
                                                >
                                                    <option value="Morning">Morning</option>
                                                    <option value="Night">Night</option>
                                                </select>
                                            </div>
                                            <div className="flex gap-2 w-full">
                                                <div className="p-2 h-30 w-2/4 flex flex-col rounded-2xl shadow-lg shadow-black/30">
                                                    <label htmlFor="shift_start_date" className="font-bold p-2">Shift Start Date</label>
                                                    <input  
                                                        type="date"
                                                        id="shift_start_date"
                                                        value={startDate}
                                                        onChange={(e) => handleStartDateChange(e.target.value)}
                                                        disabled={shiftType === "Morning"}
                                                        className="shadow-inner shadow-black/40 rounded-3xl w-full bg-gray-400 p-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    />
                                                </div>
                                                <div className="p-2 h-30 w-2/4 flex flex-col rounded-2xl shadow-lg shadow-black/30">
                                                    <label htmlFor="shift_end_date" className="font-bold p-2">Shift End Date</label>
                                                    <input  
                                                        type="date"
                                                        id="shift_end_date"
                                                        value={endDate}
                                                        onChange={(e) => setEndDate(e.target.value)}
                                                        disabled={shiftType === "Morning" || shiftType === "Night"}
                                                        className="shadow-inner shadow-black/40 rounded-3xl w-full bg-gray-400 p-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    />
                                                </div>
                                            </div>
                                            <div className="w-full">
                                                <div className="flex flex-col shadow-lg p-3 rounded-2xl shadow-black/30 gap-2">
                                                    <label className="font-bold p-2">Shift Time</label>
                                                    <div className="flex flex-row gap-2">
                                                        <input 
                                                            type="time"
                                                            value={startTime}
                                                            onChange={(e) => setStartTime(e.target.value)}
                                                            className="rounded-2xl shadow-inner shadow-black/40 bg-gray-400 w-1/2 p-2 h-10"
                                                        />
                                                        <input 
                                                            type="time"
                                                            value={endTime}
                                                            onChange={(e) => setEndTime(e.target.value)}
                                                            className="rounded-2xl shadow-inner shadow-black/40 bg-gray-400 w-1/2 p-2 h-10"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 w-full mt-4">
                                        {success && <p className="text-green-700 font-bold text-center">{success}</p>}
                                        {error && <p className="text-red-700 font-bold text-center">{error}</p>}
                                        <div className="flex justify-between items-center p-2 h-20 rounded-2xl shadow-lg shadow-black/30 w-full col-start-1 col-span-2">
                                            <input 
                                                type="text"
                                                placeholder="Note:"
                                                value={note}
                                                onChange={(e) => setNote(e.target.value)}
                                                className="rounded-2xl w-1/2 shadow-inner shadow-black/40 bg-gray-400 p-2 h-10" 
                                            />
                                            <button 
                                                type="submit" 
                                                disabled={loading}
                                                className="bg-gray-500 rounded-2xl hover:bg-gray-600 transition-colors cursor-pointer text-white p-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {loading ? "Creating..." : "Create Shift"}
                                            </button>
                                        </div>
                                    </div>
                                </form>  
                            </div>
                        </div>
                    </div>
                    <div className="border h-full w-1/3">
                        <div className=" w-full h-full flex flex-col">
                            <h1 className="font-bold bg-gray-500 h-15 w-full text-white p-4 flex items-center">Previous Shift Details</h1>
                            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-gray-100">
                                {previousShifts.length === 0 ? (
                                    <p className="text-gray-500 text-center text-sm">No shifts recorded yet.</p>
                                ) : (
                                    previousShifts.map((shift) => (
                                        <div key={shift.id} className="p-3 bg-white rounded-xl shadow-md flex justify-between items-center border border-gray-200">
                                            <div>
                                                <p className="font-semibold text-zinc-800 text-sm">{shift.shift_id}</p>
                                                <p className="text-xs text-gray-500">{shift.shift_type} Shift</p>
                                                <p className="text-[10px] text-gray-400 mt-1">
                                                    {shift.shift_start_date} ({shift.shift_start_time}) to {shift.shift_end_date} ({shift.shift_end_time})
                                                </p>
                                            </div>
                                            <div>
                                                <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                                                    shift.status === "Ongoing" 
                                                        ? "bg-amber-100 text-amber-700 border border-amber-300"
                                                        : shift.status === "Completed"
                                                        ? "bg-green-100 text-green-700 border border-green-300"
                                                        : "bg-blue-100 text-blue-700 border border-blue-300"
                                                }`}>
                                                    {shift.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default CreateShift;
