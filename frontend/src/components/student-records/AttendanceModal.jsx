/* eslint-disable react/prop-types */
import { FiX, FiClock, FiCalendar, FiCheckCircle, FiXCircle, FiUser } from 'react-icons/fi';

const AttendanceModal = ({ isOpen, onClose, attendanceRecord, studentData }) => {
  if (!isOpen) return null;

  const formatTime = (timeString) => {
    if (!timeString) return 'N/A';
    return new Date(timeString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateDuration = (inTime, outTime) => {
    if (!inTime || !outTime) return 'N/A';
    const start = new Date(inTime);
    const end = new Date(outTime);
    const diff = end - start;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              attendanceRecord?.is_present === 1 ? 'bg-green-100' : 'bg-red-100'
            }`}>
              {attendanceRecord?.is_present === 1 ? (
                <FiCheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <FiXCircle className="w-5 h-5 text-red-600" />
              )}
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Attendance Details</h3>
              <p className="text-sm text-gray-600">Daily attendance record</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiX className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Student Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <FiUser className="w-5 h-5 text-gray-600" />
              <h4 className="font-semibold text-gray-900">Student Information</h4>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Name:</span>
                <span className="text-sm font-medium text-gray-900">
                  {studentData?.firstName} {studentData?.lastName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Student ID:</span>
                <span className="text-sm font-medium text-gray-900">{attendanceRecord?.stdId || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Year:</span>
                <span className="text-sm font-medium text-gray-900">{attendanceRecord?.year || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Attendance Status */}
          <div className={`rounded-lg p-4 ${
            attendanceRecord?.is_present === 1 ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
          }`}>
            <div className="flex items-center gap-3 mb-3">
              {attendanceRecord?.is_present === 1 ? (
                <FiCheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <FiXCircle className="w-5 h-5 text-red-600" />
              )}
              <h4 className={`font-semibold ${
                attendanceRecord?.is_present === 1 ? 'text-green-900' : 'text-red-900'
              }`}>
                {attendanceRecord?.is_present === 1 ? 'Present' : 'Absent'}
              </h4>
            </div>
            <p className={`text-sm ${
              attendanceRecord?.is_present === 1 ? 'text-green-700' : 'text-red-700'
            }`}>
              {attendanceRecord?.is_present === 1 
                ? 'Student was present on this day' 
                : 'Student was absent on this day'
              }
            </p>
          </div>

          {/* Date Information */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="flex items-center gap-3 mb-3">
              <FiCalendar className="w-5 h-5 text-blue-600" />
              <h4 className="font-semibold text-blue-900">Date Information</h4>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-blue-700">Date:</span>
                <span className="text-sm font-medium text-blue-900">
                  {formatDate(attendanceRecord?.date)}
                </span>
              </div>
            </div>
          </div>

          {/* Time Information */}
          {attendanceRecord?.is_present === 1 && (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <FiClock className="w-5 h-5 text-gray-600" />
                <h4 className="font-semibold text-gray-900">Time Information</h4>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">In Time:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {formatTime(attendanceRecord?.in_time)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Out Time:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {formatTime(attendanceRecord?.out_time)}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200">
                  <span className="text-sm text-gray-600">Duration:</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {calculateDuration(attendanceRecord?.in_time, attendanceRecord?.out_time)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceModal;