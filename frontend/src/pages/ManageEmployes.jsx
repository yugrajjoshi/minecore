import {useState, useEffect} from 'react'   

import { Filter, Pencil, Plus, Search, Trash2, UserCheck } from "lucide-react";
import NavBar from "../components/NavBar";
import AddEmployeeForm from "../components/addemployeeform";

function ManageEmployes() {
 
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuerry, setSearchQuerry] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isAddModelOpen, setIsAddModelOpen] = useState(false);


 const [NewEmployee, setNewEmployee] = useState({

  full_name: "",
  phone_number: "",
  designation:"",
  is_active: true,

 })






  const API_BASE_URL = "http://127.0.0.1:8000";
                          
  const fetchEmployees = async() => {
    try{
      setLoading(true);
      setError("");
      const res = await 
      fetch("/api/accounts/employees/");
      if(!res.ok){
        throw new Error(`Error ${res.status}:failde to fetch data`);
      }
      const data  = await res.json();
      setEmployees(data);
    }
    catch(err) {
      console.log(err);
      setError(err.message || "failed to load employees");
    }
    finally{setLoading(false);}
  };

  useEffect(() => {
    fetchEmployees(); 
  }, []);
 





  return (
    <main className="flex h-screen w-full overflow-hidden bg-gray-300 text-zinc-900">
      <div className="h-screen w-64 shrink-0 overflow-hidden shadow-2xl">
        <NavBar />
      </div>

      <section className="flex min-w-0 flex-1 flex-col gap-5 overflow-y-auto p-5">
        <header className="flex items-center justify-between rounded-lg bg-gray-500 px-5 py-4 shadow-lg">
          <div>
            <h1 className="text-2xl font-bold text-white">Manage Employees</h1>
            <p className="text-sm text-gray-100">
              View employee access, shifts, and current account status.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsAddModelOpen(true)}
            className="flex h-11 items-center gap-2 rounded-lg bg-white px-4 text-sm font-bold text-zinc-700 transition-colors duration-200 hover:bg-gray-100"
          >
            <Plus size={18} />
            Add Employee
          </button>
        </header>
          <div>
            {isAddModelOpen ? (
              <AddEmployeeForm 
                onClose={() => setIsAddModelOpen(false)} 
                onEmployeeAdded={fetchEmployees}
              />
            ) : null}
          </div>
          <div className="flex items-center justify-between gap-4 rounded-lg bg-white p-4 shadow-lg">
          <div className="flex h-11 w-full max-w-md items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-3">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search employees"
              className="h-full w-full bg-transparent text-sm outline-none"
            />
          </div>

          <button
            type="button"
            className="flex h-11 items-center gap-2 rounded-lg border border-gray-200 px-4 text-sm font-semibold text-zinc-700 transition-colors duration-200 hover:bg-gray-100"
          >
            <Filter size={18} />
            Filter
          </button>
        </div>
        

        <div className="overflow-x-auto rounded-lg bg-white shadow-lg">
          <table className="w-full border-collapse text-left">
            <thead className="bg-zinc-800 text-sm text-white">
              <tr>
                <th className="px-5 py-4 font-semibold">Employee</th>
                <th className="px-5 py-4 font-semibold">Employee ID</th>
                <th className="px-5 py-4 font-semibold">Phone Number</th>
                <th className="px-5 py-4 font-semibold">Designation</th>
                <th className="px-5 py-4 font-semibold">Status</th>
                <th className="px-5 py-4 text-right font-semibold">Actions</th>
              </tr>
            </thead>


                        <tbody className="divide-y divide-gray-200 text-sm">
              {employees.map((employee) => (
                <tr
                  key={employee.id}
                  className="transition-colors duration-200 hover:bg-gray-50"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 font-bold text-zinc-700">
                        {employee.full_name ? employee.full_name.charAt(0).toUpperCase() : "?"}
                      </div>
                      <div>
                        <p className="font-semibold text-zinc-900">
                          {employee.full_name}
                        </p>
                        <p className="text-xs text-gray-500">Record ID #{employee.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-700 font-mono text-sm font-semibold">
                    {employee.employee_id || "PENDING"}
                  </td>
                  <td className="px-5 py-4 text-gray-700">
                    {employee.phone_number || "Not specified"}
                  </td>
                  <td className="px-5 py-4 text-gray-700">
                    {employee.designation || "Not specified"}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                        employee.is_active
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {employee.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        className="rounded-lg p-2 text-green-700 transition-colors duration-200 hover:bg-green-100 cursor-pointer"
                        title="Toggle Status"
                      >
                        <UserCheck size={18} />
                      </button>
                      <button
                        type="button"
                        className="rounded-lg p-2 text-blue-700 transition-colors duration-200 hover:bg-blue-100 cursor-pointer"
                        title="Edit employee"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        type="button"
                        className="rounded-lg p-2 text-red-700 transition-colors duration-200 hover:bg-red-100 cursor-pointer"
                        title="Delete employee"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </section>
    </main>
  )
}

export default ManageEmployes;
