/* eslint-disable react/prop-types */
import { useState } from "react";
import { useUpdatePlacementMutation } from "../../redux/api/authApi";
import { toast } from "react-toastify";

const PlacementModal = ({ isOpen, onClose, studentId }) => {
  const [placementData, setPlacementData] = useState({
    companyName: "",
    salary: "",
    location: "",
    jobProfile: "",
    hrEmail: "",
    contactNumber: "",
    position: "",
    technology: "",
    jobType: "",
  });

  const [updatePlacement] = useUpdatePlacementMutation();

  const handleSubmit = async () => {
    try {
      await updatePlacement({ id: studentId, data: placementData }).unwrap();
      toast.success("Placement updated successfully");
      onClose();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update placement");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl py-8 px-10 w-[90%] max-w-3xl min-h-[85vh] max-h-[95vh] overflow-y-auto relative shadow-2xl">
        <h2 className="text-2xl font-semibold text-center text-orange-600 mb-8">Update Placement Info</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Company Name */}
          <div className="relative w-full">
            <input
              type="text"
              value={placementData.companyName}
              onChange={(e) =>
                setPlacementData((prev) => ({ ...prev, companyName: e.target.value }))
              }
              className="peer h-12 w-full border-2 border-gray-300 rounded-md px-3 py-2 leading-tight focus:outline-none focus:border-black focus:ring-0 transition-all duration-200"
              placeholder=" "
            />
            <label className={`absolute left-3 bg-white px-1 transition-all duration-200 pointer-events-none ${
              placementData.companyName ? "text-xs -top-2 text-black" : "text-gray-400 top-2"
            }`}>
              Company Name <span className="text-black">*</span>
            </label>
          </div>

          {/* Job Profile */}
          <div className="relative w-full">
            <input
              type="text"
              value={placementData.jobProfile}
              onChange={(e) =>
                setPlacementData((prev) => ({ ...prev, jobProfile: e.target.value }))
              }
              className="peer h-12 w-full border-2 border-gray-300 rounded-md px-3 py-2 leading-tight focus:outline-none focus:border-black focus:ring-0 transition-all duration-200"
              placeholder=" "
            />
            <label className={`absolute left-3 bg-white px-1 transition-all duration-200 pointer-events-none ${
              placementData.jobProfile ? "text-xs -top-2 text-black" : "text-gray-400 top-2"
            }`}>
              Job Profile <span className="text-black">*</span>
            </label>
          </div>

          {/* Salary */}
          <div className="relative w-full">
            <input
              type="number"
              value={placementData.salary}
              onChange={(e) =>
                setPlacementData((prev) => ({ ...prev, salary: e.target.value }))
              }
              className="peer h-12 w-full border-2 border-gray-300 rounded-md px-3 py-2 leading-tight focus:outline-none focus:border-black focus:ring-0 transition-all duration-200"
              placeholder=" "
            />
            <label className={`absolute left-3 bg-white px-1 transition-all duration-200 pointer-events-none ${
              placementData.salary ? "text-xs -top-2 text-black" : "text-gray-400 top-2"
            }`}>
              Salary <span className="text-black">*</span>
            </label>
          </div>

          {/* Location */}
          <div className="relative w-full">
            <input
              type="text"
              value={placementData.location}
              onChange={(e) =>
                setPlacementData((prev) => ({ ...prev, location: e.target.value }))
              }
              className="peer h-12 w-full border-2 border-gray-300 rounded-md px-3 py-2 leading-tight focus:outline-none focus:border-black focus:ring-0 transition-all duration-200"
              placeholder=" "
            />
            <label className={`absolute left-3 bg-white px-1 transition-all duration-200 pointer-events-none ${
              placementData.location ? "text-xs -top-2 text-black" : "text-gray-400 top-2"
            }`}>
              Location <span className="text-black">*</span>
            </label>
          </div>

          {/* HR Email */}
          <div className="relative w-full">
            <input
              type="email"
              value={placementData.hrEmail}
              onChange={(e) =>
                setPlacementData((prev) => ({ ...prev, hrEmail: e.target.value }))
              }
              className="peer h-12 w-full border-2 border-gray-300 rounded-md px-3 py-2 leading-tight focus:outline-none focus:border-black focus:ring-0 transition-all duration-200"
              placeholder=" "
            />
            <label className={`absolute left-3 bg-white px-1 transition-all duration-200 pointer-events-none ${
              placementData.hrEmail ? "text-xs -top-2 text-black" : "text-gray-400 top-2"
            }`}>
              HR Email <span className="text-black">*</span>
            </label>
          </div>

          {/* Contact Number */}
          <div className="relative w-full">
            <input
              type="tel"
              value={placementData.contactNumber}
              onChange={(e) =>
                setPlacementData((prev) => ({ ...prev, contactNumber: e.target.value }))
              }
              className="peer h-12 w-full border-2 border-gray-300 rounded-md px-3 py-2 leading-tight focus:outline-none focus:border-black focus:ring-0 transition-all duration-200"
              placeholder=" "
            />
            <label className={`absolute left-3 bg-white px-1 transition-all duration-200 pointer-events-none ${
              placementData.contactNumber ? "text-xs -top-2 text-black" : "text-gray-400 top-2"
            }`}>
              Contact Number <span className="text-black">*</span>
            </label>
          </div>

          {/* Position */}
          <div className="relative w-full">
            <input
              type="text"
              value={placementData.position}
              onChange={(e) =>
                setPlacementData((prev) => ({ ...prev, position: e.target.value }))
              }
              className="peer h-12 w-full border-2 border-gray-300 rounded-md px-3 py-2 leading-tight focus:outline-none focus:border-black focus:ring-0 transition-all duration-200"
              placeholder=" "
            />
            <label className={`absolute left-3 bg-white px-1 transition-all duration-200 pointer-events-none ${
              placementData.position ? "text-xs -top-2 text-black" : "text-gray-400 top-2"
            }`}>
              Position <span className="text-black">*</span>
            </label>
          </div>

          {/* Technology */}
          <div className="relative w-full">
            <input
              type="text"
              value={placementData.technology}
              onChange={(e) =>
                setPlacementData((prev) => ({ ...prev, technology: e.target.value }))
              }
              className="peer h-12 w-full border-2 border-gray-300 rounded-md px-3 py-2 leading-tight focus:outline-none focus:border-black focus:ring-0 transition-all duration-200"
              placeholder=" "
            />
            <label className={`absolute left-3 bg-white px-1 transition-all duration-200 pointer-events-none ${
              placementData.technology ? "text-xs -top-2 text-black" : "text-gray-400 top-2"
            }`}>
              Technology <span className="text-black">*</span>
            </label>
          </div>

          {/* Job Type */}
          <div className="md:col-span-2 relative w-full">
            <select
              value={placementData.jobType}
              onChange={(e) =>
                setPlacementData((prev) => ({ ...prev, jobType: e.target.value }))
              }
              className="peer h-12 w-full border-2 border-gray-300 rounded-md px-3 py-2 bg-white leading-tight focus:outline-none focus:border-black focus:ring-0 appearance-none transition-all duration-200"
            >
              <option value="" disabled hidden>Select</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
            <label className={`absolute left-3 bg-white px-1 transition-all duration-200 pointer-events-none ${
              placementData.jobType ? "text-xs -top-2 text-black" : "text-gray-400 top-2"
            }`}>
              Job Type <span className="text-black">*</span>
            </label>
          </div>
          
          {/* Action Buttons */}
          <div className="md:col-span-2 flex justify-end space-x-4 mt-10">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-5 py-2 bg-brandYellow text-white rounded-md hover:bg-orange-600 transition"
            >
              Update
            </button>
          </div>
        </div>
        
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl text-gray-400 hover:text-gray-700"
        >
          &times;
        </button>
      </div>
    </div>
  );
};



export default PlacementModal;