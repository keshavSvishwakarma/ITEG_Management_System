import { useState } from "react";
import { FaCalendarAlt, FaClock } from "react-icons/fa";

const ScheduleButtonModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const candidates = [
    {
      id: 1,
      name: "Cooper, Kristin",
      interviewer: "Block, Marvin",
      phone: "9137934421",
      status: "Fail",
      age: 23,
    },
    {
      id: 2,
      name: "Flores, Juanita",
      interviewer: "Nguyen, Shane",
      phone: "9138434211",
      status: "Pass",
      age: 23,
    },
  ];

  const openModal = (candidate) => {
    setSelectedCandidate(candidate);
    setShowModal(true);
  };

  return (
    <div className="p-4 bg-[#F5F9FF] min-h-screen">
      <h1 className="text-xl font-semibold text-gray-700 mb-4">
        Interview Process
      </h1>
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <div className="flex gap-2 mb-2 sm:mb-0">
            <select className="border rounded px-2 py-1">
              <option>Show Entries 10</option>
            </select>
            <button className="bg-blue-500 text-white px-3 py-1 rounded">
              Download
            </button>
            <button className="bg-red-500 text-white px-3 py-1 rounded">
              Delete
            </button>
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="border px-3 py-1 rounded"
          />
        </div>

        <div className="flex gap-4 mb-4 border-b pb-2">
          {[
            "Total Registration",
            "Online Assessment",
            "Selected",
            "Rejected",
          ].map((tab) => (
            <button
              key={tab}
              className="text-gray-600 font-medium hover:text-blue-600"
            >
              {tab}
            </button>
          ))}
        </div>

        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">#</th>
              <th className="p-2">Candidate</th>
              <th className="p-2">Interviewer</th>
              <th className="p-2">Phone</th>
              <th className="p-2">Age</th>
              <th className="p-2">Status</th>
              <th className="p-2">Schedule Interview</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((c, index) => (
              <tr key={c.id} className="border-b">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{c.name}</td>
                <td className="p-2">{c.interviewer}</td>
                <td className="p-2">{c.phone}</td>
                <td className="p-2">{c.age}</td>
                <td className="p-2">
                  <span
                    className={`px-2 py-1 text-white rounded ${
                      c.status === "Pass" ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="p-2">
                  <button
                    onClick={() => openModal(c)}
                    className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600"
                  >
                    Schedule Interview
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 flex justify-between items-center text-sm">
          <span>Total Count 180</span>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5, 10].map((n) => (
              <button
                key={n}
                className="border rounded px-2 py-1 hover:bg-blue-100"
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4 bg-orange-400 text-white px-4 py-2 rounded-t-lg">
              Schedule Interview
            </h2>
            <input
              type="text"
              placeholder="Candidate Name"
              className="w-full border p-2 mb-2 rounded"
              defaultValue={selectedCandidate?.name}
            />
            <input
              type="text"
              placeholder="Interviewer Name"
              className="w-full border p-2 mb-2 rounded"
            />
            <div className="flex gap-2 mb-2">
              <div className="relative w-1/2">
                <input type="date" className="w-full border p-2 rounded" />
                <FaCalendarAlt className="absolute right-3 top-3 text-gray-400" />
              </div>
              <div className="relative w-1/2">
                <input type="time" className="w-full border p-2 rounded" />
                <FaClock className="absolute right-3 top-3 text-gray-400" />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="border px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button className="bg-orange-500 text-white px-4 py-2 rounded">
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleButtonModal;
