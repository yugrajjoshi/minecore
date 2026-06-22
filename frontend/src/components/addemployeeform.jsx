import { useState } from "react";
import { X, User, Phone, Briefcase, Calendar, Info } from "lucide-react";

function AddEmployeeForm({ onClose, onEmployeeAdded }) {
  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    designation: "",
    employment_type: "Full-Time",
    marital_status: "Single",
    date_of_birth: "",
    joining_date: new Date().toISOString().split("T")[0],
    is_active: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.full_name.trim()) {
      setError("Full name is required.");
      return;
    }

    // Clean empty date values to null
    const cleanedData = { ...formData };
    if (!cleanedData.date_of_birth) {
      cleanedData.date_of_birth = null;
    }
    if (!cleanedData.joining_date) {
      cleanedData.joining_date = null;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/accounts/employees/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cleanedData),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(
          errData.detail || errData.error || "Failed to add employee"
        );
      }

      // Successfully added
      if (onEmployeeAdded) {
        onEmployeeAdded();
      }
      onClose();
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      {/* Modal Card */}
      <div className="relative w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-150 px-6 py-4 bg-zinc-900 text-white">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-gray-300" />
            <h2 className="text-xl font-bold">Add New Employee</h2>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="rounded-full p-1.5 hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          {error && (
            <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm font-medium text-red-700 border border-red-200">
              <Info className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label htmlFor="full_name" className="text-xs font-bold uppercase tracking-wider text-zinc-600">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative flex items-center">
                <User className="absolute left-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  name="full_name"
                  id="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  className="h-10 w-full rounded-lg border border-gray-250 bg-gray-50 pl-10 pr-3 text-sm outline-none transition duration-150 focus:border-zinc-500 focus:bg-white focus:ring-1 focus:ring-zinc-500"
                  required
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="phone_number" className="text-xs font-bold uppercase tracking-wider text-zinc-600">
                Phone Number
              </label>
              <div className="relative flex items-center">
                <Phone className="absolute left-3 h-4 w-4 text-gray-400" />
                <input
                  type="tel"
                  name="phone_number"
                  id="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  placeholder="e.g. +1234567890"
                  className="h-10 w-full rounded-lg border border-gray-250 bg-gray-50 pl-10 pr-3 text-sm outline-none transition duration-150 focus:border-zinc-500 focus:bg-white focus:ring-1 focus:ring-zinc-500"
                />
              </div>
            </div>

            {/* Designation */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="designation" className="text-xs font-bold uppercase tracking-wider text-zinc-600">
                Designation
              </label>
              <div className="relative flex items-center">
                <Briefcase className="absolute left-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  name="designation"
                  id="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  placeholder="e.g. Software Engineer"
                  className="h-10 w-full rounded-lg border border-gray-250 bg-gray-50 pl-10 pr-3 text-sm outline-none transition duration-150 focus:border-zinc-500 focus:bg-white focus:ring-1 focus:ring-zinc-500"
                />
              </div>
            </div>

            {/* Employment Type */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="employment_type" className="text-xs font-bold uppercase tracking-wider text-zinc-600">
                Employment Type
              </label>
              <select
                name="employment_type"
                id="employment_type"
                value={formData.employment_type}
                onChange={handleChange}
                className="h-10 w-full rounded-lg border border-gray-250 bg-gray-50 px-3 text-sm outline-none transition duration-150 focus:border-zinc-500 focus:bg-white focus:ring-1 focus:ring-zinc-500"
              >
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Contract">Contract</option>
                <option value="Intern">Intern</option>
              </select>
            </div>

            {/* Marital Status */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="marital_status" className="text-xs font-bold uppercase tracking-wider text-zinc-600">
                Marital Status
              </label>
              <select
                name="marital_status"
                id="marital_status"
                value={formData.marital_status}
                onChange={handleChange}
                className="h-10 w-full rounded-lg border border-gray-250 bg-gray-50 px-3 text-sm outline-none transition duration-150 focus:border-zinc-500 focus:bg-white focus:ring-1 focus:ring-zinc-500"
              >
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </select>
            </div>

            {/* Date of Birth */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="date_of_birth" className="text-xs font-bold uppercase tracking-wider text-zinc-600">
                Date of Birth
              </label>
              <div className="relative flex items-center">
                <Calendar className="absolute left-3 h-4 w-4 text-gray-400" />
                <input
                  type="date"
                  name="date_of_birth"
                  id="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                  className="h-10 w-full rounded-lg border border-gray-250 bg-gray-50 pl-10 pr-3 text-sm outline-none transition duration-150 focus:border-zinc-500 focus:bg-white focus:ring-1 focus:ring-zinc-500 text-gray-700"
                />
              </div>
            </div>

            {/* Joining Date */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="joining_date" className="text-xs font-bold uppercase tracking-wider text-zinc-600">
                Joining Date
              </label>
              <div className="relative flex items-center">
                <Calendar className="absolute left-3 h-4 w-4 text-gray-400" />
                <input
                  type="date"
                  name="joining_date"
                  id="joining_date"
                  value={formData.joining_date}
                  onChange={handleChange}
                  className="h-10 w-full rounded-lg border border-gray-250 bg-gray-50 pl-10 pr-3 text-sm outline-none transition duration-150 focus:border-zinc-500 focus:bg-white focus:ring-1 focus:ring-zinc-500 text-gray-700"
                />
              </div>
            </div>

            {/* Status Switch */}
            <div className="flex items-center gap-3 py-2 md:col-span-2">
              <input
                type="checkbox"
                name="is_active"
                id="is_active"
                checked={formData.is_active}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-zinc-700 focus:ring-zinc-500 cursor-pointer"
              />
              <label htmlFor="is_active" className="text-sm font-semibold text-zinc-700 select-none cursor-pointer">
                Set employee status as Active
              </label>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 border-t border-gray-150 pt-4 mt-6">
            <button
              onClick={onClose}
              type="button"
              className="h-10 rounded-lg border border-gray-200 px-4 text-sm font-semibold text-zinc-700 transition-colors duration-200 hover:bg-gray-50 cursor-pointer"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-10 rounded-lg bg-zinc-900 px-5 text-sm font-bold text-white transition-colors duration-200 hover:bg-zinc-800 flex items-center justify-center min-w-[120px] cursor-pointer"
              disabled={loading}
            >
              {loading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                "Add Employee"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEmployeeForm;
