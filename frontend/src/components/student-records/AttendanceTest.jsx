/* eslint-disable react/prop-types */
import { useGetStudentAttendanceQuery } from "../../redux/api/authApi";

const AttendanceTest = ({ studentId }) => {
  const { data, isLoading, error } = useGetStudentAttendanceQuery({
    studentId: studentId || 'STD001',
    month: '2025-01'
  });

  if (isLoading) return <div>Loading attendance...</div>;
  if (error) return <div>Error: {JSON.stringify(error)}</div>;

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h3 className="font-bold mb-2">Attendance API Test</h3>
      <pre className="text-xs bg-white p-2 rounded overflow-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
};

export default AttendanceTest;