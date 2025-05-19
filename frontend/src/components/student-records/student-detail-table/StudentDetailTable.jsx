import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "../../common-components/pagination/Pagination";
import UserProfile from "../../common-components/user-profile/UserProfile";
import { useAdmitedStudentsQuery } from "../../../redux/api/authApi";
import CommonTable from "../../common-components/table/CommonTable";
import edit from "../../../assets/icons/edit-fill-icon.png";

const StudentDetailTable = () => {
  const { data = [], isLoading } = useAdmitedStudentsQuery();
  const location = useLocation();
  const selectedLevel = location.state?.level || null;
  const navigate = useNavigate();

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [selectedResults, setSelectedResults] = useState([]);
  const [selectedPercentages, setSelectedPercentages] = useState([]);

  const toTitleCase = (str) =>
    str
      ?.toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

<<<<<<< HEAD
  // Define dynamic filter config
=======
>>>>>>> 81e6086d0a4241236f42b9b6836a6d606fb426cb
  const filtersConfig = [
    {
      title: "Track",
      options: ["Harda", "Kannod", "Khategaon", "Nemawar"],
      selected: selectedTracks,
      setter: setSelectedTracks,
    },
    {
      title: "Result",
      options: ["Pass", "Fail"],
      selected: selectedResults,
      setter: setSelectedResults,
    },
    {
      title: "Interview",
      options: ["50-60%", "60-70%", "70-80%", "80-90%", "90-100%"],
      selected: selectedPercentages,
      setter: setSelectedPercentages,
    },
  ];

<<<<<<< HEAD
  // ✅ Add a new field 'latestLevel' to each student
=======
>>>>>>> 81e6086d0a4241236f42b9b6836a6d606fb426cb
  const enhancedData = data.map((student) => {
    const passedLevels = (student.level || []).filter(
      (lvl) => lvl.result === "Pass"
    );
<<<<<<< HEAD
    const latestPassedLevel = passedLevels.length > 0
      ? passedLevels[passedLevels.length - 1].levelNo
      : "1A";
=======
    const latestPassedLevel =
      passedLevels.length > 0
        ? passedLevels[passedLevels.length - 1].levelNo
        : "1A";
>>>>>>> 81e6086d0a4241236f42b9b6836a6d606fb426cb

    return {
      ...student,
      latestLevel: latestPassedLevel,
    };
  });

  const filteredData = enhancedData.filter((student) => {
    const matchesSearch =
      searchTerm === "" ||
      student.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTrack =
      selectedTracks.length === 0 ||
      selectedTracks.some(
        (track) => track.toLowerCase() === (student.track || "").toLowerCase()
      );

    const matchesResult =
      selectedResults.length === 0 || selectedResults.includes(student.result);

    const matchesPercentage =
      selectedPercentages.length === 0 ||
      selectedPercentages.some((range) => {
        const [min, max] = range.split("-").map((v) => parseFloat(v));
        return (
          student.interviewPercentage >= min &&
          student.interviewPercentage <= max
        );
      });

    const matchesLevel =
      !selectedLevel || student.latestLevel === selectedLevel;

    return (
      matchesSearch &&
      matchesTrack &&
      matchesResult &&
      matchesPercentage &&
      matchesLevel
    );
  });

  const columns = [
    {
      key: "fullName",
<<<<<<< HEAD
      label: "Full Name", render: (row) => toTitleCase(`${row.firstName} ${row.lastName}`),

=======
      label: "Full Name",
      render: (row) => toTitleCase(`${row.firstName} ${row.lastName}`),
>>>>>>> 81e6086d0a4241236f42b9b6836a6d606fb426cb
    },
    { key: "fatherName", label: "Father's Name" },
    { key: "studentMobile", label: "Mobile" },
    { key: "course", label: "Course" },
    { key: "latestLevel", label: "Level" },
    { key: "village", label: "Village" },
  ];
<<<<<<< HEAD
=======

>>>>>>> 81e6086d0a4241236f42b9b6836a6d606fb426cb
  const actionButton = (student) => (
    <button
      onClick={() =>
        navigate(`/student-profile/${student._id}`, { state: { student } })
      }
      className="px-3 py-1 rounded"
    >
      <img src={edit} alt="edit-icon" className="w-5 h-5" />
    </button>
  );

  return (
    <>
      <UserProfile showBackButton heading="Admitted Students" />
      {selectedLevel && (
        <div className="px-10 pb-5 text-md text-gray-700">
          Showing students of <strong>Level {selectedLevel}</strong>
        </div>
      )}
      <div className="border bg-white shadow-sm rounded-lg px-5">
        <Pagination
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filtersConfig={filtersConfig}
        />
      </div>
      <CommonTable
        columns={columns}
        data={filteredData}
        editable={true}
        pagination={true}
        rowsPerPage={rowsPerPage}
        isLoading={isLoading}
        actionButton={actionButton}
      />
    </>
  );
};

export default StudentDetailTable;

<<<<<<< HEAD




// import { useState } from "react";
// import Pagination from "../../common-components/pagination/Pagination";
// import UserProfile from "../../common-components/user-profile/UserProfile";
// import CommonTable from "../../common-components/table/CommonTable";
=======
>>>>>>> 81e6086d0a4241236f42b9b6836a6d606fb426cb


// import { useState } from "react";
// import Pagination from "../../common-components/pagination/Pagination";
// import UserProfile from "../../common-components/user-profile/UserProfile";
// import { useAdmitedStudentsQuery } from "../../../redux/api/authApi";
// import CommonTable from "../../common-components/table/CommonTable";
// import { useNavigate } from "react-router-dom";
// import edit from "../../../assets/icons/edit-fill-icon.png";

// const StudentDetailTable = () => {
//   const { data = [], isLoading } = useAdmitedStudentsQuery();
<<<<<<< HEAD
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedTracks, setSelectedTracks] = useState([]);
//   const [selectedResults, setSelectedResults] = useState([]);
//   const [selectedPercentages, setSelectedPercentages] = useState([]);
//   const navigate = useNavigate();
//   const queryParams = new URLSearchParams(location.search);
//   const selectedYear = queryParams.get("year") || "Unknown Year";

//   const filtersConfig = [
//     {
//       title: "Track",
//       options: ["Harda", "Kannod", "Khategaon", "Nemawar"],
//       selected: selectedTracks,
//       setter: setSelectedTracks,
//     },
//     {
//       title: "Result",
//       options: ["Pass", "Fail"],
//       selected: selectedResults,
//       setter: setSelectedResults,
//     },
//     {
//       title: "Interview",
//       options: ["50-60%", "60-70%", "70-80%", "80-90%", "90-100%"],
//       selected: selectedPercentages,
//       setter: setSelectedPercentages,
//     },
//   ];

//   const filteredData = data.filter((student) => {
//     const matchesSearch =
//       searchTerm === "" ||
//       student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       student.email?.toLowerCase().includes(searchTerm.toLowerCase());
=======

//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedTracks, setSelectedTracks] = useState([]);
//   const [selectedResults, setSelectedResults] = useState([]);
//   const [selectedPercentages, setSelectedPercentages] = useState([]);
//   const navigate = useNavigate();

//   const toTitleCase = (str) =>
//     str
//       ?.toLowerCase()
//       .split(" ")
//       .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//       .join(" ");

//   // Define dynamic filter config
//   const filtersConfig = [
//     {
//       title: "Track",
//       options: ["Harda", "Kannod", "Khategaon", "Nemawar"],
//       selected: selectedTracks,
//       setter: setSelectedTracks,
//     },
//     {
//       title: "Result",
//       options: ["Pass", "Fail"],
//       selected: selectedResults,
//       setter: setSelectedResults,
//     },
//     {
//       title: "Interview",
//       options: ["50-60%", "60-70%", "70-80%", "80-90%", "90-100%"],
//       selected: selectedPercentages,
//       setter: setSelectedPercentages,
//     },
//   ];

//   // ✅ Add a new field 'latestLevel' to each student
//   const enhancedData = data.map((student) => {
//     const passedLevels = (student.level || []).filter(
//       (lvl) => lvl.result === "Pass"
//     );
//     const latestPassedLevel = passedLevels.length > 0
//       ? passedLevels[passedLevels.length - 1].levelNo
//       : "1A";
>>>>>>> 81e6086d0a4241236f42b9b6836a6d606fb426cb

//     return {
//       ...student,
//       latestLevel: latestPassedLevel,
//     };
//   });

<<<<<<< HEAD
=======
//   const filteredData = enhancedData.filter((student) => {
//     const matchesSearch =
//       searchTerm === "" ||
//       student.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       student.email?.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesTrack =
//       selectedTracks.length === 0 ||
//       selectedTracks.some(
//         (track) => track.toLowerCase() === (student.track || "").toLowerCase()
//       );

>>>>>>> 81e6086d0a4241236f42b9b6836a6d606fb426cb
//     const matchesResult =
//       selectedResults.length === 0 || selectedResults.includes(student.result);

//     const matchesPercentage =
//       selectedPercentages.length === 0 ||
//       selectedPercentages.some((range) => {
//         const [min, max] = range.split("-").map((v) => parseFloat(v));
//         return (
//           student.interviewPercentage >= min &&
//           student.interviewPercentage <= max
//         );
//       });

//     return matchesSearch && matchesTrack && matchesResult && matchesPercentage;
//   });

<<<<<<< HEAD
//   const columns = [
//     { key: "profile", label: "Profile" },
//     { key: "fullName", label: "Full Name" },
//     { key: "fatherName", label: "Father's Name" },
//     { key: "mobileNo", label: "Mobile" },
//     { key: "course", label: "Course" },
//     { key: "level", label: "Level" },
//     { key: "village", label: "Village" },
//   ];

=======
//   // Define table columns
//   const columns = [
//     {
//       key: "fullName",
//       label: "Full Name", render: (row) => toTitleCase(`${row.firstName} ${row.lastName}`),

//     },
//     { key: "fatherName", label: "Father's Name" },
//     { key: "studentMobile", label: "Mobile" },
//     { key: "course", label: "Course" },
//     { key: "latestLevel", label: "Level" },
//     { key: "village", label: "Village" },
//   ];
>>>>>>> 81e6086d0a4241236f42b9b6836a6d606fb426cb
//   const actionButton = (student) => (
//     <button
//       onClick={() =>
//         navigate(`/student-profile/${student._id}`, { state: { student } })
//       }
//       className="px-3 py-1 rounded"
//     >
//       <img src={edit} alt="edit-icon" className="w-5 h-5" />
//     </button>
//   );
<<<<<<< HEAD

=======
>>>>>>> 81e6086d0a4241236f42b9b6836a6d606fb426cb
//   return (
//     <>
//       <UserProfile showBackButton heading="Admitted Students" />
//       <div className="border bg-white shadow-sm rounded-lg px-5">
//         <Pagination
//           rowsPerPage={rowsPerPage}
//           setRowsPerPage={setRowsPerPage}
//           searchTerm={searchTerm}
//           setSearchTerm={setSearchTerm}
//           filtersConfig={filtersConfig}
//         />
//       </div>
//       <CommonTable
//         columns={columns}
//         data={filteredData}
//         editable={true}
//         pagination={true}
//         rowsPerPage={rowsPerPage}
//         isLoading={isLoading}
//         actionButton={actionButton}
//       />
//     </>
//   );
// };

// export default StudentDetailTable;


