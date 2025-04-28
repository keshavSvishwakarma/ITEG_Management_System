import company from "../../../assets/icons/company-icon.png";
import position from "../../../assets/icons/position-icon.png";
import loca from "../../../assets/icons/location-icon.png";
import date from "../../../assets/icons/calendar-icon.png";
import attendence from "../../../assets/icons/attendence-card-icon.png";
import level from "../../../assets/icons/level-card-icon.png";
import permission from "../../../assets/icons/permission-card-icon.png";
import placed from "../../../assets/icons/placement-card-icon.png";
import back from "../../../assets/icons/back-icon.png";
// import address from "../../../assets/icons/company-icon.png"
// import reason from "../../../assets/icons/company-icon.png"
// import profileEdit from "../../../assets/icons/company-icon.png"
import profilePlaceholder from "../../../assets/images/profile-img.png";
import { useNavigate, useLocation } from "react-router-dom";
import { Chart } from "react-google-charts";
import { useEffect, useState } from "react";

const rawGraphData = [
  ["Month", "Attendance"],
  ["Jan", 100],
  ["Feb", 90],
  ["Mar", 75],
  ["Apr", 80],
  ["May", 60],
  ["Jun", 50],
  ["Jul", 40],
  ["Aug", 30],
  ["Sep", 30],
  ["Oct", 20],
  ["Nov", 20],
  ["Dec", 10],
];

// Function to assign colors dynamically
const getColor = (attendance) => {
  if (attendance > 80) return "#4285F4"; // Blue
  if (attendance >= 50) return "#FBBC05"; // Yellow
  return "#EA4335"; // Red
};

// Transform data to include color and tooltip
const graphData = [
  [
    "Month",
    "Attendance",
    { role: "style" },
    { role: "tooltip", type: "string" },
  ],
  ...rawGraphData.slice(1).map(([month, attendance]) => [
    month,
    attendance,
    `color: ${getColor(attendance)}; stroke-color: none; stroke-width: 0;`,
    `Attendance: ${attendance}%`, // Tooltip content
  ]),
];

const options = {
  title: "Monthly Attendance",
  chartArea: { width: "70%" },
  bar: {
    groupWidth: "40%", // Reduce bar width
  },
  hAxis: { title: "Months" },
  vAxis: {
    title: "Attendance (%)",
    ticks: [0, 20, 40, 60, 80, 100],
    minValue: 0,
  },
  legend: { position: "none" },
  enableInteractivity: true, // Enables hover tooltips
};

export default function StudentProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const { student } = location.state || {};
  const [studentData, setStudentData] = useState(student || {});

  useEffect(() => {
    if (student) {
      setStudentData(student);
    } else {
      console.log("No student data received via navigation state.");
    }
  }, [student]);

  if (!studentData || Object.keys(studentData).length === 0) {
    return (
      <div className="w-[70vw] px-8 py-5 bg-gray-100 min-h-screen">
        <div className="flex items-center gap-5">
          <img
            className="h-5 cursor-pointer"
            src={back}
            alt="back"
            onClick={() => navigate(-1)}
          />
          <h3 className="text-xl font-bold">Student Profile</h3>
        </div>
        <p className="mt-4">No student data available.</p>
      </div>
    );
  }

  return (
    <>
      <div className="w-[80vw] px-8 py-5 bg-gray-100 min-h-screen">
        <div className="flex items-center gap-5">
          <img
            className="h-5 cursor-pointer"
            src={back}
            alt="back"
            onClick={() => navigate(-1)}
          />
          <h3 className="text-xl font-bold">Student Profile</h3>
        </div>

        <div className="grid grid-cols-3 gap-6 h-screen mt-6">
          {/* Left Column (75%) */}
          <div className="col-span-2 py-8">
            <div className="grid grid-cols-4 gap-4">
              <div className="p-4 bg-[#9BAEF5] text-white rounded-xl shadow">
                <div className="flex justify-between">
                  <p>Attendance</p>
                  <img className="h-5" src={attendence} alt="attendance-icon" />
                </div>
                <h3 className="text-2xl py-2">
                  93<span className="text-sm">%</span>{" "}
                  {/* Replace with actual data */}
                </h3>
                <p>Overall from starting</p>
              </div>
              <div className="p-4 bg-[#F5B477] text-white rounded-xl shadow">
                <div className="flex justify-between">
                  <p>Current Level</p>
                  <img className="h-5" src={level} alt="level-icon" />
                </div>
                <h3 className="text-2xl py-2">
                  {studentData.level || "N/A"} {/* Display level from data */}
                </h3>
                <p>Overall from starting</p>
              </div>
              <div className="p-4 bg-[#C23F7E] text-white rounded-xl shadow">
                <div className="flex justify-between">
                  <p>Permission</p>
                  <img className="h-5" src={permission} alt="permission-icon" />
                </div>
                <h3 className="text-2xl py-2">
                  {studentData.permissionStatus || "N/A"}{" "}
                  {/* Display permission status */}
                </h3>
                <p>Overall from starting</p>
              </div>
              <div className="p-4 bg-[#3FC260] text-white rounded-xl shadow">
                <div className="flex justify-between">
                  <p>Placement Info</p>
                  <img className="h-5" src={placed} alt="placement-icon" />
                </div>
                <h3 className="text-2xl py-2">
                  {studentData.placementStatus || "Not Placed"}{" "}
                  {/* Display placement status */}
                </h3>
                <p>Overall from starting</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="p-4 border col-span-1 bg-white rounded-xl shadow">
                <h2 className="text-lg font-semibold">Placement Info</h2>
                <div className="py-6">
                  <div className="flex h-10 items-center">
                    <img
                      className="h-5 pr-3"
                      src={company}
                      alt="company-icon"
                    />
                    <p className="text-gray-500 text-lg">
                      Company: {studentData.company || "N/A"}{" "}
                      {/* Display company */}
                    </p>
                  </div>
                  <div className="flex h-10 items-center">
                    <img
                      className="h-5 pr-3"
                      src={position}
                      alt="position-icon"
                    />
                    <p className="text-gray-500 text-lg">
                      Position: {studentData.position || "N/A"}{" "}
                      {/* Display position */}
                    </p>
                  </div>
                  <div className="flex h-10 items-center">
                    <img className="h-5 pr-3" src={loca} alt="location-icon" />
                    <p className="text-gray-500 text-lg">
                      Location: {studentData.location || "N/A"}{" "}
                      {/* Display location */}
                    </p>
                  </div>
                  <div className="flex h-10 items-center">
                    <img className="h-5 pr-3" src={date} alt="calendar-icon" />
                    <p className="text-gray-500 text-lg">
                      Date: {studentData.placementDate || "N/A"}{" "}
                      {/* Display placement date */}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 border col-span-2 bg-white rounded-xl shadow">
                <h2 className="text-lg font-semibold">Attendance</h2>
                <Chart
                  chartType="ColumnChart"
                  width="100%"
                  height="250px"
                  data={graphData} // You might want dynamic attendance data here
                  options={options}
                />
              </div>
            </div>
          </div>

          {/* Right Column (25%) */}
          <div className="col-span-1 flex flex-col gap-6">
            {/* Profile Section (75% Height) */}
            <div className="flex-1 bg-white rounded-2xl shadow p-6 flex flex-col items-center text-center">
              <img
                src={studentData.profilePhoto || profilePlaceholder}
                alt="Profile"
                className="rounded-full w-24 h-24 mb-4 object-cover"
                onError={(e) => {
                  e.target.onerror = null; // Prevent infinite loop
                  e.target.src = profilePlaceholder;
                }}
              />
              <h2 className="text-lg font-semibold">{studentData.name}</h2>
              <p className="text-gray-500">{studentData.email || "N/A"}</p>
              <div className="mt-4 space-y-2">
                <p className="text-gray-700">
                  📞 {studentData.mobile || "N/A"}
                </p>
                <p className="text-gray-700">
                  📍 {studentData.address || studentData.village || "N/A"}
                </p>
              </div>
            </div>

            {/* Permission Section (25% Height) */}
            <div className="h-1/4 bg-white rounded-2xl shadow p-6">
              <h2 className="text-lg font-semibold">Permission</h2>
              <p>Date - {studentData.permissionDate || "N/A"}</p>
              <p>Reason - {studentData.permissionReason || "N/A"}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

