import { useState } from "react";
import {
  useGetReadyStudentsForPlacementQuery,
  useUpdatePlacedInfoMutation,
} from "../../redux/api/authApi";
import Loader from "../common-components/loader/Loader";
import profile from "../../assets/images/profileImgDummy.jpeg";
import { Dialog } from "@headlessui/react";
import { toast } from "react-toastify";
import { CheckCircle, XCircle, Clock } from "lucide-react";

const PlacementRecords = () => {
  const { data = {}, refetch, isLoading, error } = useGetReadyStudentsForPlacementQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    pollingInterval: 10000, // Poll every 15 seconds
  });
  const students = data?.data || [];
  
  // Debug logging
  console.log('PlacementRecords - Data:', data);
  console.log('PlacementRecords - Students:', students);
  console.log('PlacementRecords - Loading:', isLoading);
  console.log('PlacementRecords - Error:', error);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [remark, setRemark] = useState("");
  const [result, setResult] = useState("Pending");

  const [updateInterviewRecord, { isLoading: isUpdating }] = useUpdatePlacedInfoMutation();

  const handleUpdateClick = (studentId, interview) => {
    setSelectedInterview({ studentId, ...interview });
    setRemark(interview.remark || "");
    setResult(interview.result || "Pending");
    setIsUpdateModalOpen(true);
  };


  const handleUpdateSubmit = async () => {
    try {
      await updateInterviewRecord({
        studentId: selectedInterview.studentId,
        interviewId: selectedInterview._id,
        remark,
        result,
      }).unwrap();

      toast.success("Interview updated successfully");
      setIsUpdateModalOpen(false);
      await refetch();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update interview");
    }
  };

  // const handleUpdateSubmit = async () => {
  //   try {
  //     await updateInterviewRecord({
  //       studentId: selectedInterview.studentId,
  //       interviewId: selectedInterview._id,
  //       remark,
  //       result,
  //     }).unwrap();

  //     toast.success("Interview updated successfully");
  //     setIsUpdateModalOpen(false);
  //   } catch (err) {
  //     console.error(err);
  //     toast.error("Failed to update interview");
  //   }
  // };

  const renderBadge = (status) => {
    const base = "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium";
    switch (status) {
      case "Selected":
        return <span className={`${base} bg-green-100 text-green-700`}><CheckCircle className="w-4 h-4" />Selected</span>;
      case "Rejected":
        return <span className={`${base} bg-red-100 text-red-700`}><XCircle className="w-4 h-4" />Rejected</span>;
      default:
        return <span className={`${base} bg-yellow-100 text-yellow-700`}><Clock className="w-4 h-4" />Pending</span>;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading placement records</p>
          <p className="text-gray-500">{error?.data?.message || 'Something went wrong'}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6 p-4">
        {students.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No placement records found</p>
            <p className="text-gray-400 text-sm mt-2">Students with interview records will appear here</p>
          </div>
        ) : (
          students.map((student) => (
          <div
            key={student._id}
            className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition duration-300 flex flex-col md:flex-row p-6 gap-6"
          >
            {/* Left Side - Profile Info */}
            <div className="flex-shrink-0 flex flex-col items-center text-center md:w-60">
              <img
                src={student.image || profile}
                alt="profile"
                className="w-24 h-24 rounded-full object-cover ring-2 ring-indigo-500 mb-2"
              />
              <h2 className="text-lg font-semibold text-gray-800 capitalize">
                {student.firstName} {student.lastName}
              </h2>
              <p className="text-sm text-gray-500">{student.email}</p>
              <p className="text-sm text-gray-500">{student.studentMobile}</p>

              <div className="mt-4 text-sm text-gray-600 space-y-1">
                <p><strong>Course:</strong> {student.course}</p>
                <p><strong>Tech:</strong> {student.techno}</p>
                <p><strong>Gender:</strong> {student.gender}</p>
                <p><strong>Stream:</strong> {student.stream}</p>
              </div>
            </div>

            {/* Right Side - Interview Info */}
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-indigo-600 mb-3">📋 Interview History</h3>
              {student.interviewRecord?.length > 0 ? (
                <div className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-indigo-300 pr-1">
                  {student.interviewRecord.map((interview) => (
                    <div
                      key={interview._id}
                      className="min-w-[250px] bg-gray-50 rounded-lg border border-gray-200 p-4 shadow-sm flex flex-col justify-between"
                    >
                      <div className="text-sm text-gray-700 space-y-1 mb-2">
                        <p><strong>🏢 Company:</strong> {interview.companyName}</p>
                        <p><strong>📅 Date:</strong> {new Date(interview.interviewDate).toLocaleDateString()}</p>
                        <p><strong>📍 Location:</strong> {interview.location}</p>
                        <p><strong>💼 Profile:</strong> {interview.jobProfile}</p>
                        <p><strong>📝 Remark:</strong> {interview.remark || "—"}</p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        {renderBadge(interview.result)}
                        <button
                          className="bg-gradient-to-r from-green-500 to-green-600 text-white text-xs px-3 py-1.5 rounded hover:opacity-90"
                          onClick={() => handleUpdateClick(student._id, interview)}
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-red-500 italic">No interviews found</p>
              )}
            </div>
          </div>
          ))
        )}
      </div>

      {/* Modal */}
      <Dialog open={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)} className="fixed z-50 inset-0">
        <div className="flex items-center justify-center min-h-screen px-4 bg-black bg-opacity-30">
          <Dialog.Panel className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 space-y-5">
            <Dialog.Title className="text-xl font-semibold text-gray-800">Update Interview</Dialog.Title>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Remark</label>
                <textarea
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Result</label>
                <select
                  value={result}
                  onChange={(e) => setResult(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                >
                  <option value="Pending">Pending</option>
                  <option value="Selected">Selected</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setIsUpdateModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateSubmit}
                  disabled={isUpdating}
                  className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-md hover:opacity-90 disabled:opacity-50"
                >
                  {isUpdating ? "Submitting..." : "Save"}
                </button>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default PlacementRecords;