import { useParams, useNavigate } from "react-router-dom";
import { useGetAdmittedStudentsByIdQuery, useGetReportCardQuery } from "../../redux/api/authApi";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { FaUserGroup } from "react-icons/fa6";
import Loader from "../common-components/loader/Loader";
import logo from '../../assets/images/doulLogo.png';
import { RiEdit2Fill } from "react-icons/ri";

export default function StudentReport() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: studentData, isLoading, isError } = useGetAdmittedStudentsByIdQuery(id);
  const { data: reportCardData, isLoading: reportLoading, isError: reportError } = useGetReportCardQuery(id);

  console.log('Report Card Data:', reportCardData);

  // Debug logs
  console.log('Current user role:', localStorage.getItem('role'));
  console.log('Current token:', localStorage.getItem('token'));
  console.log('Student ID:', id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader />
      </div>
    );
  }

  if (isError || !studentData) {
    return <div className="p-4 text-red-500">Error loading student data.</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Professional Header */}
      <div className="sticky top-0 z-10">
        <div className="py-2 sm:py-4 ">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
            <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
              <button
                onClick={() => window.history.back()}
                className="group flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200 text-gray-700 hover:text-gray-900"
              >
                <HiArrowNarrowLeft className="text-base sm:text-lg group-hover:-translate-x-1 transition-transform" />
                <span className="text-xs sm:text-sm font-medium">Back</span>
              </button>
              <div className="h-6 sm:h-8 w-px bg-gray-300 hidden sm:block"></div>
              <div className="flex-1 sm:flex-none">
                <h1 className="text-lg sm:text-2xl font-bold text-black">Student Report Card</h1>
                <p className="text-gray-600">Comprehensive performance report for {studentData.firstName} {studentData.lastName}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  console.log('Navigating to:', `/student/${id}/report/edit`);
                  try {
                    navigate(`/student/${id}/report/edit`);
                  } catch (error) {
                    console.error('Navigation error:', error);
                    // Fallback: try relative navigation
                    navigate('edit');
                  }
                }}
                className="p-2 bg-orange-400 text-white rounded-full text-2xl font-medium hover:bg-orange-500 transition-colors"
              >
                <RiEdit2Fill />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* A4 Page with Grey Background */}
      <div className="min-h-screen p-6">
        <div className="mx-auto bg-[#F9FAFB] shadow-xl p-6 w-[60vw]">

          {/* Header with Logos and Title */}
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={logo} alt="ITEG Logo" className="h-20 object-contain" />
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <h1 className="text-xl font-bold text-black">Report Card</h1>
            </div>
            <div className="text-right text-sm text-gray-600">
              <p>Academic Year</p>
              <p className="font-semibold text-gray-800">Session 2024-25</p>
            </div>
          </div>

          {/* White Box 1 - Personal Information */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div className="md:col-span-2 space-y-4">
                <div className="flex items-center gap-2">
                  <FaUserGroup className="text-blue-500 text-2xl" />
                  <div>
                    <label className="text-sm font-medium text-gray-600">Full Name</label>
                    <p className="text-sm font-semibold text-gray-800">{studentData.firstName} {studentData.lastName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FaUserGroup className="text-blue-500 text-2xl" />
                  <div>
                    <label className="text-sm font-medium text-gray-600">Course</label>
                    <p className="text-sm font-semibold text-gray-800">{studentData.course || "N/A"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FaUserGroup className="text-blue-500 text-2xl" />
                  <div>
                    <label className="text-sm font-medium text-gray-600">Email</label>
                    <p className="text-sm font-semibold text-gray-800">{studentData.email || "N/A"}</p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 space-y-4">
                <div className="flex items-center gap-2">
                  <FaUserGroup className="text-blue-500 text-2xl" />
                  <div>
                    <label className="text-sm font-medium text-gray-600">Father's Name</label>
                    <p className="text-sm font-semibold text-gray-800">{studentData.fatherName || "N/A"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FaUserGroup className="text-blue-500 text-2xl" />
                  <div>
                    <label className="text-sm font-medium text-gray-600">Contact Number</label>
                    <p className="text-sm font-semibold text-gray-800">{studentData.studentMobile || "N/A"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FaUserGroup className="text-blue-500 text-2xl" />
                  <div>
                    <label className="text-sm font-medium text-gray-600">Address</label>
                    <p className="text-sm font-semibold text-gray-800">{studentData.address || "N/A"}</p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-1 flex justify-center">
                <img
                  src={studentData.profileImage || "https://via.placeholder.com/80x80/4F46E5/FFFFFF?text=Student"}
                  alt="Student Photo"
                  className="w-20 h-20 rounded-full object-cover border-2 border-gray-200 shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* White Box 2 - Stepper */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Level Progress</h3>
            <div className="grid grid-cols-6 gap-4">
              {/* Stepper Column - 80% */}
              <div className="col-span-5">
                <div className="relative">
                  {/* Background Connecting Line */}
                  <div className="absolute top-3 left-3 right-3 h-1 bg-gray-300"></div>

                  {/* Progress Line (Green) */}
                  <div
                    className="absolute top-3 left-3 h-1 bg-green-600"
                    style={{
                      width: `${((studentData.currentLevel ? ['1A', '1B', '1C', '2A', '2B', '2C'].indexOf(studentData.currentLevel) : -1) / 5) * 100}%`
                    }}
                  ></div>

                  {/* Steps */}
                  <div className="flex justify-between relative">
                    {['1A', '1B', '1C', '2A', '2B', '2C'].map((level, index) => {
                      const currentLevelIndex = studentData.currentLevel ?
                        ['1A', '1B', '1C', '2A', '2B', '2C'].indexOf(studentData.currentLevel) : -1;
                      const isPassed = currentLevelIndex > index;
                      const isCurrent = currentLevelIndex === index;

                      return (
                        <div key={level} className="flex flex-col items-center">
                          <div className={`flex items-center justify-center rounded-full text-xs font-medium relative z-10 ${isPassed
                              ? 'w-6 h-6 bg-green-600 text-white'
                              : isCurrent
                                ? 'w-6 h-6 bg-yellow-500 text-white'
                                : 'w-6 h-6 bg-gray-300'
                            }`}>
                            {isPassed ? '✓' : isCurrent ? level : ''}
                          </div>
                          <span className="text-xs text-gray-500 mt-2">{level}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Trophy Column - 20% */}
              <div className="col-span-1 flex justify-center items-start">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center w-10 h-10 text-white text-2xl font-medium">
                    🏆
                  </div>
                  <span className="text-xs text-gray-500">Goal</span>
                </div>
              </div>
            </div>
          </div>

          {/* Three Separate White Boxes with Gaps */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            {/* Technical Skills Box */}
            <div className="col-span-1 bg-white rounded-lg shadow-md p-6">
              <h4 className="text-lg font-bold text-gray-800 mb-4">Technical Skills</h4>
              <div className="space-y-3">
                {reportCardData?.technicalSkills?.length > 0 ? reportCardData.technicalSkills.map((tech, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">{tech.skillName}</span>
                      <span className="text-xs text-gray-500">{tech.totalPercentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-[#FDA92D] h-2 rounded-full" style={{ width: `${tech.totalPercentage}%` }}></div>
                    </div>
                  </div>
                )) : (
                  <div className="text-center text-gray-500">
                    <span>N/A</span>
                  </div>
                )}
              </div>
            </div>

            {/* Soft Skills Box */}
            <div className="col-span-1 bg-white rounded-lg shadow-md p-6">
              <h4 className="text-lg font-bold text-gray-800 mb-4">Soft Skills</h4>
              <div className="space-y-2">
                {reportCardData?.softSkills?.categories?.length > 0 ? reportCardData.softSkills.categories.map((category, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-600">{category.title}</span>
                      <span className="text-xs text-gray-500">{category.score}/{category.maxMarks}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${(category.score / category.maxMarks) * 100}%` }}></div>
                    </div>
                  </div>
                )) : (
                  <div className="text-center text-gray-500">
                    <span>N/A</span>
                  </div>
                )}
              </div>
            </div>

            {/* Discipline Box */}
            <div className="col-span-1 bg-white rounded-lg shadow-md p-6">
              <h4 className="text-lg font-bold text-gray-800 mb-4">Discipline</h4>
              <div className="space-y-2">
                {reportCardData?.discipline?.categories?.length > 0 ? reportCardData.discipline.categories.map((category, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-600">{category.title}</span>
                      <span className="text-xs text-gray-500">{category.score}/{category.maxMarks}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-red-500 h-1.5 rounded-full" style={{ width: `${(category.score / category.maxMarks) * 100}%` }}></div>
                    </div>
                  </div>
                )) : (
                  <div className="text-center text-gray-500">
                    <span>N/A</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}