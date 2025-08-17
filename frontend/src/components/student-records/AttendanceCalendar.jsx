/* eslint-disable react/prop-types */
import { useState, useMemo } from 'react';
import { FiEye, FiCalendar, FiCheckCircle, FiXCircle } from 'react-icons/fi';

const AttendanceCalendar = ({ attendanceData, onDateClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const { daysInMonth, firstDayOfMonth, monthName, year } = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const monthName = currentDate.toLocaleString('default', { month: 'long' });
    
    return { daysInMonth, firstDayOfMonth, monthName, year };
  }, [currentDate]);

  const attendanceMap = useMemo(() => {
    const map = {};
    if (attendanceData?.attendance) {
      attendanceData.attendance.forEach(record => {
        const date = new Date(record.date).getDate();
        map[date] = record;
      });
    }
    return map;
  }, [attendanceData]);

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const renderCalendarDays = () => {
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const attendance = attendanceMap[day];
      const isPresent = attendance?.is_present === 1;
      const hasData = !!attendance;
      
      days.push(
        <div
          key={day}
          className={`h-10 flex items-center justify-center text-sm font-medium rounded-lg cursor-pointer transition-all duration-200 relative ${
            hasData
              ? isPresent
                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                : 'bg-red-100 text-red-800 hover:bg-red-200'
              : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
          }`}
          onClick={() => hasData && onDateClick(attendance)}
        >
          {day}
          {hasData && (
            <div className="absolute -top-1 -right-1">
              {isPresent ? (
                <FiCheckCircle className="w-3 h-3 text-green-600" />
              ) : (
                <FiXCircle className="w-3 h-3 text-red-600" />
              )}
            </div>
          )}
        </div>
      );
    }
    
    return days;
  };

  return (
    <div className="bg-white rounded-xl p-6" style={{ boxShadow: '0 0 22px 6px rgba(0, 0, 0, 0.09)' }}>
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-100">
            <FiCalendar className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Attendance Calendar</h3>
            <p className="text-sm text-gray-600">Click on dates to view details</p>
          </div>
        </div>
        <button
          onClick={() => onDateClick(null)}
          className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors"
        >
          <FiEye className="w-4 h-4" />
          View All
        </button>
      </div>

      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigateMonth(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h4 className="text-lg font-semibold text-gray-900">
          {monthName} {year}
        </h4>
        <button
          onClick={() => navigateMonth(1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Days of Week Header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="h-8 flex items-center justify-center text-xs font-semibold text-gray-500">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {renderCalendarDays()}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-100 rounded border border-green-200"></div>
          <span className="text-xs text-gray-600">Present</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-100 rounded border border-red-200"></div>
          <span className="text-xs text-gray-600">Absent</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-50 rounded border border-gray-200"></div>
          <span className="text-xs text-gray-600">No Data</span>
        </div>
      </div>
    </div>
  );
};

export default AttendanceCalendar;