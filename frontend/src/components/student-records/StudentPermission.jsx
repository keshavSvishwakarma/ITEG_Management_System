import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetPermissionStudentQuery,
} from "../../redux/api/authApi";
import Loader from '../common-components/loader/Loader';
import CommonTable from '../common-components/table/CommonTable';
import Pagination from '../common-components/pagination/Pagination';
import SearchAndFilters from '../common-components/search-filters/SearchAndFilters';
import PageNavbar from "../common-components/navbar/PageNavbar";
// import { HiArrowNarrowLeft } from "react-icons/hi";

const StudentPermission = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const {
    data,
    isLoading,
    isError,
    error,
  } = useGetPermissionStudentQuery();

  const students = data?.data || [];
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [selectedResults, setSelectedResults] = useState([]);

  const toTitleCase = (str) =>
    str
      ?.toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  // Dynamic options from data
  const dynamicTrackOptions = useMemo(() => {
    return [...new Set(students.map((s) => toTitleCase(s.track || "")))].filter(Boolean);
  }, [students]);

  const filtersConfig = [
    {
      title: "Track",
      options: dynamicTrackOptions,
      selected: selectedTracks,
      setter: setSelectedTracks,
    },
    {
      title: "Result",
      options: ["Pass", "Fail", "Pending"],
      selected: selectedResults,
      setter: setSelectedResults,
    },
  ];

  const filteredData = students.filter((student) => {
    const searchableValues = Object.values(student)
      .map((val) => String(val ?? "").toLowerCase())
      .join(" ");
    if (!searchableValues.includes(searchTerm.toLowerCase())) return false;

    const track = toTitleCase(student.track || "");
    const matchesTrack = selectedTracks.length === 0 || selectedTracks.includes(track);

    const matchesResult = selectedResults.length === 0 ||
      selectedResults.includes(student.result || "Pending");

    return matchesTrack && matchesResult;
  });

  // Calculate pagination for filtered data
  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const columns = [
    {
      key: "fullName",
      label: "Full Name",
      render: (row) => toTitleCase(`${row.firstName} ${row.lastName}`),
    },
    {
      key: "fatherName",
      label: "Father Name",
      render: (row) => toTitleCase(row.fatherName || "N/A"),
    },
    {
      key: "studentMobile",
      label: "Mobile Number",
      render: (row) => row.studentMobile || "N/A",
    },
    {
      key: "course",
      label: "Course",
      render: (row) => toTitleCase(row.course || "N/A"),
    },
    {
      key: "track",
      label: "Track",
      render: (row) => toTitleCase(row.track || "N/A"),
    },
    {
      key: "remark",
      label: "Remark",
      render: (row) => row.permissionDetails?.remark || "N/A",
    },
    {
      key: "requested_by",
      label: "Approved By",
      render: (row) => {
        const approvedBy = row.permissionDetails?.approved_by || row.permissionDetails?.requested_by;
        if (!approvedBy) return "N/A";
        
        // If it's an object with name property
        if (typeof approvedBy === 'object' && approvedBy.name) {
          return toTitleCase(approvedBy.name);
        }
        
        // If it's a string
        if (typeof approvedBy === 'string') {
          return toTitleCase(approvedBy);
        }
        
        return "N/A";
      },
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader />
      </div>
    );
  }

  return (
  <>
   <div className="min-h-screen bg-white">
       <PageNavbar
        title="Dummy Student"
        subtitle="Manage and track student permission requests"
        showBackButton={false}
      />
       {/* <div className="flex items-center gap-3">
              <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                {students.length} Records
              </div>
            </div> */}

      {/* ❌ Error */}
      {isError && (
        <div className="text-center text-red-600 font-medium py-4 px-6">
          Error: {error?.data?.message || "Something went wrong."}
        </div>
      )}

      {/* ⚠️ No Data */}
      {!isError && students.length === 0 && (
        <div className="text-center text-gray-500 py-6 px-6">
          No student permissions found.
        </div>
      )}

      {/* ✅ Data Table */}
      {!isError && students.length > 0 && (
        <div className="mt-1 border bg-[var(--backgroundColor)] shadow-sm rounded-lg">
          <div className="px-6">
            <SearchAndFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filtersConfig={filtersConfig}
              allData={students}
              selectedRows={[]}
              sectionName="permission-students"
            />
          </div>
          
          <CommonTable
            data={paginatedData}
            columns={columns}
            actionButton={null}
            onRowClick={(row) => {
              localStorage.setItem("lastSection", "permission");
              navigate(`/student-profile/${row._id}`, { state: { student: row } });
            }}
          />
          
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredData.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  </>
  );
};

export default StudentPermission;



// import {
//   useGetPermissionStudentQuery,
// } from "../../redux/api/authApi";
// import Loader from '../common-components/loder/Loader';
// const StudentPermission = () => {
//   const {
//     data,
//     isLoading=true,
//     isError,
//     error,
//   } = useGetPermissionStudentQuery();

//   const students = data?.data || [];

//   return (
//     <>
//       <div>
//         {/* Loading State */}
//         <div className="min-h-screen flex items-center justify-center bg-white">
//       {isLoading ? <Loader /> : <div>Your Content Here</div>}
//     </div>

//         {/* Error State */}
//         {isError && (
//           <div className="text-center text-red-600 font-medium py-4">
//             Error: {error?.data?.message || "Something went wrong."}
//           </div>
//         )}

//         {/* No Data */}
//         {!isLoading && !isError && students.length === 0 && (
//           <div className="text-center text-gray-500 py-6">
//             No student permissions found.
//           </div>
//         )}

//         {/* Student Permission List */}
//         {students.length > 0 && (
//           <div>
       

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {students.map((student, index) => (
//                 <div
//                   key={student._id || index}
//                   className="bg-white rounded-2xl shadow-lg p-5 border hover:shadow-xl transition"
//                 >
//                   <div className="mb-3">
//                     <h3 className="text-lg font-semibold text-gray-800">
//                       {student.firstName} {student.lastName}
//                     </h3>
//                     <p className="text-sm text-gray-500">
//                       PRN: {student.prkey || "N/A"}
//                     </p>
//                   </div>

//                   <div className="text-sm text-gray-700 space-y-1">
//                     <p>
//                       <span className="font-medium">Remark:</span>{" "}
//                       {student.permissionDetails?.remark || "N/A"}
//                     </p>
//                     <p>
//                       <span className="font-medium">Approved By:</span>{" "}
//                       {student.permissionDetails?.approved_by || "N/A"}
//                     </p>
//                     <p>
//                       <span className="font-medium">Upload Date:</span>{" "}
//                       {student.permissionDetails?.uploadDate
//                         ? new Date(student.permissionDetails.uploadDate).toLocaleDateString()
//                         : "N/A"}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default StudentPermission;

