


import { useState } from "react";

export default function UserEditModal() {
  const [candidateName, setCandidateName] = useState("");
  const [interviewerName, setInterviewerName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  return (
    <div className=" w-auto max-w-3xl mx-auto">
      <div>
        <h2 className="bg-orange-400 text-2xl font-bold text-white p-4 rounded text-center w-full py-3 rounded-t-md border-t-4 border-blue-400">
          Schedule Interview
        </h2>
      </div>

      <div className="space-y-8 p-14">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Candidate Name"
            value={candidateName}
            onChange={(e) => setCandidateName(e.target.value)}
            className="w-full border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="text"
            placeholder="Interviewer Name"
            value={interviewerName}
            onChange={(e) => setInterviewerName(e.target.value)}
            className="w-full border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="date"
            placeholder="dd/mm/yy"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-orange-400"

            
          />
        </div>

        <div className="flex justify-self-end mt-6">
          <button className=" w-44 px-4 py-3 bg-gray-300 rounded-xl hover:bg-gray-400 mr-4">
            Cancel
          </button>
          <button className=" w-44 px-4 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
