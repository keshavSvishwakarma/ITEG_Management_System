import { useState, useMemo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchAndFilters from "../common-components/search-filters/SearchAndFilters";
import {
  useAdmitedStudentsQuery,
} from "../../redux/api/authApi";
import Loader from "../common-components/loader/Loader";
import CommonTable from "../common-components/table/CommonTable";
import CreateInterviewModal from "./CreateInterviewModal";
import PageNavbar from "../common-components/navbar/PageNavbar";
import { buttonStyles } from "../../styles/buttonStyles";
import Pagination from "../common-components/pagination/Pagination";

const StudentDetailTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const { data = [], isLoading, refetch } = useAdmitedStudentsQuery(
    { page: currentPage, limit: itemsPerPage },
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
    }
  );
  const location = useLocation();
  const selectedLevel = location.state?.level || "1A"; // Default to 1A if no level is selected
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [activeTab, setActiveTab] = useState(`Level ${selectedLevel}`);
  // const [selectedRows, setSelectedRows] = useState([]);

  const levelTabs = ["Level 1A", "Level 1B", "Level 1C", "Level 2A", "Level 2B", "Level 2C", "Level's Cleared"];

  // Update active tab when selectedLevel changes
  useEffect(() => {
    if (selectedLevel === "cleared") {
      setActiveTab("Level's Cleared");
    } else {
      setActiveTab(`Level ${selectedLevel}`);
    }
  }, [selectedLevel]);

  const toTitleCase = (str) =>
    str
      ?.toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  // Count students per level
  // const studentCounts = useMemo(() => {
  //   const counts = {};
  //   data.forEach((student) => {
  //     const passedLevels = (student.level || []).filter(
  //       (lvl) => lvl.result === "Pass"
  //     );
  //     const latestLevel =
  //       passedLevels.length > 0
  //         ? passedLevels[passedLevels.length - 1].levelNo
  //         : "1A";
  //     counts[latestLevel] = (counts[latestLevel] || 0) + 1;
  //   });
  //   return counts;
  // }, [data]);

  // Dynamic options from data
  const dynamicTrackOptions = useMemo(() => {
    const students = data?.data || [];
    return [...new Set(students.map((s) => toTitleCase(s.track || "")))].filter(Boolean);
  }, [data]);

  const dynamicCourseOptions = useMemo(() => {
    const students = data?.data || [];
    return [...new Set(students.map((s) => (s.course || "").toUpperCase()))].filter(Boolean);
  }, [data]);

  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedAttempts, setSelectedAttempts] = useState([]);

  const filtersConfig = activeTab === "Level's Cleared" ? [
    {
      title: "Track",
      options: dynamicTrackOptions,
      selected: selectedTracks,
      setter: setSelectedTracks,
    },
    {
      title: "Course",
      options: dynamicCourseOptions,
      selected: selectedCourses,
      setter: setSelectedCourses,
    },
  ] : [
    {
      title: "Track",
      options: dynamicTrackOptions,
      selected: selectedTracks,
      setter: setSelectedTracks,
    },
    {
      title: "Course",
      options: dynamicCourseOptions,
      selected: selectedCourses,
      setter: setSelectedCourses,
    },
    {
      title: "Attempts",
      options: ["1", "2", "3", "4+"],
      selected: selectedAttempts,
      setter: setSelectedAttempts,
    },
  ];

  // Use regular admitted students data
  const currentData = data?.data || [];
  const currentLoading = isLoading;
  
  // Debug: Check data


  const enhancedData = currentData.map((student) => {
    // Get all level attempts grouped by levelNo
    const levelAttempts = {};
    (student.level || []).forEach(lvl => {
      if (!levelAttempts[lvl.levelNo]) {
        levelAttempts[lvl.levelNo] = [];
      }
      levelAttempts[lvl.levelNo].push(lvl);
    });

    // Check if the student has passed their current level
    const currentLevel = student.currentLevel || "1A";
    const currentLevelAttempts = levelAttempts[currentLevel] || [];

    // Check if any attempt for the current level has a Pass result
    const hasPassedCurrentLevel = currentLevelAttempts.some(lvl => lvl.result === "Pass");

    return {
      ...student,
      latestLevel: currentLevel,
      hasPassedCurrentLevel,
      levelAttempts
    };
  });

  const filteredData = enhancedData.filter((student) => {
    // Search term filter
    const searchableValues = Object.values(student)
      .map((val) => String(val ?? "").toLowerCase())
      .join(" ");
    if (!searchableValues.includes(searchTerm.toLowerCase())) return false;

    // Track filter
    const track = toTitleCase(student.track || "");
    const matchesTrack = selectedTracks.length === 0 || selectedTracks.includes(track);

    // Course filter
    const course = (student.course || "").toUpperCase();
    const matchesCourse = selectedCourses.length === 0 || selectedCourses.includes(course);

    // Attempts filter (only for non-cleared tabs)
    let matchesAttempts = true;
    if (activeTab !== "Level's Cleared") {
      const currentLevelAttempts = student.levelAttempts?.[selectedLevel] || [];
      const attemptCount = currentLevelAttempts.length;
      matchesAttempts = selectedAttempts.length === 0 || selectedAttempts.some(filter => {
        if (filter === "4+") return attemptCount >= 4;
        return attemptCount.toString() === filter;
      });
    }

    // Level progression filter
    let matchesLevel = true;
    if (activeTab === "Level's Cleared") {
      // Show students who have passed Level 2C
      const level2CAttempts = student.levelAttempts?.["2C"] || [];
      matchesLevel = level2CAttempts.some(lvl => lvl.result === "Pass");
    } else if (selectedLevel && selectedLevel !== "permission") {
      // Define level progression order
      const levelOrder = ["1A", "1B", "1C", "2A", "2B", "2C"];
      const currentLevelIndex = levelOrder.indexOf(selectedLevel);
      
      if (currentLevelIndex === 0) {
        // For Level 1A, show students who haven't passed 1A yet
        const level1AAttempts = student.levelAttempts?.["1A"] || [];
        matchesLevel = !level1AAttempts.some(lvl => lvl.result === "Pass");
      } else if (currentLevelIndex > 0) {
        // For other levels, check if student passed the previous level
        const previousLevel = levelOrder[currentLevelIndex - 1];
        const previousLevelAttempts = student.levelAttempts?.[previousLevel] || [];
        const hasPassedPrevious = previousLevelAttempts.some(lvl => lvl.result === "Pass");
        
        // And hasn't passed the current level yet
        const currentLevelAttempts = student.levelAttempts?.[selectedLevel] || [];
        const hasPassedCurrent = currentLevelAttempts.some(lvl => lvl.result === "Pass");
        
        matchesLevel = hasPassedPrevious && !hasPassedCurrent;
      }
    }

    return matchesTrack && matchesCourse && matchesAttempts && matchesLevel;
  });
  
  // Calculate count for each level tab
  const levelCounts = useMemo(() => {
    const counts = {};
    
    levelTabs.forEach(tab => {
      if (tab === "Level's Cleared") {
        // Count students who passed Level 2C
        counts[tab] = enhancedData.filter(student => {
          const level2CAttempts = student.levelAttempts?.["2C"] || [];
          return level2CAttempts.some(lvl => lvl.result === "Pass");
        }).length;
      } else {
        // Extract level code from tab name
        const levelCode = tab.replace("Level ", "");
        const levelOrder = ["1A", "1B", "1C", "2A", "2B", "2C"];
        const currentLevelIndex = levelOrder.indexOf(levelCode);
        
        counts[tab] = enhancedData.filter(student => {
          if (currentLevelIndex === 0) {
            // For Level 1A, show students who haven't passed 1A yet
            const level1AAttempts = student.levelAttempts?.["1A"] || [];
            return !level1AAttempts.some(lvl => lvl.result === "Pass");
          } else if (currentLevelIndex > 0) {
            // For other levels, check if student passed the previous level
            const previousLevel = levelOrder[currentLevelIndex - 1];
            const previousLevelAttempts = student.levelAttempts?.[previousLevel] || [];
            const hasPassedPrevious = previousLevelAttempts.some(lvl => lvl.result === "Pass");
            
            // And hasn't passed the current level yet
            const currentLevelAttempts = student.levelAttempts?.[levelCode] || [];
            const hasPassedCurrent = currentLevelAttempts.some(lvl => lvl.result === "Pass");
            
            return hasPassedPrevious && !hasPassedCurrent;
          }
          return false;
        }).length;
      }
    });
    
    return counts;
  }, [enhancedData]);



  // Calculate pagination using filtered data
  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1); // Reset to first page when tab changes
    if (tab === "Level's Cleared") {
      // For Level's Cleared tab, don't navigate with level state
      navigate(`/student-detail-table`, { state: { level: "cleared" } });
    } else {
      // Extract level code from tab name (e.g., "Level 1A" -> "1A")
      const levelCode = tab.replace("Level ", "");
      navigate(`/student-detail-table`, { state: { level: levelCode } });
    }
  };

  
  const columns = [
    {
      key: "fullName",
      label: "Full Name",
      render: (row) => toTitleCase(`${row.firstName} ${row.lastName}`),
    },
    {
      key: "fatherName",
      label: "Father's Name",
      render: (row) => toTitleCase(row.fatherName || ""),
    },
    { key: "studentMobile", label: "Mobile No.", align: "center" },
    {
      key: "course",
      label: "Course",
      render: (row) => (row.course || "").toUpperCase(),
    },
    {
      key: "track",
      label: "Bus Route",
      render: (row) => toTitleCase(row.track || ""),
    },
    ...(activeTab !== "Level's Cleared" ? [{
      key: "attempts",
      label: "Attempts",
      align: "center",
      render: (row) => {
        const currentLevelAttempts = row.levelAttempts?.[selectedLevel] || [];
        return currentLevelAttempts.length || 0;
      }
    }] : []),
    ...(activeTab === "Level's Cleared" ? [{
      key: "clearedDate",
      label: "Level 2C Cleared Date",
      render: (row) => {
        const level2CAttempts = row.levelAttempts?.["2C"] || [];
        const passedAttempt = level2CAttempts.find(lvl => lvl.result === "Pass");
        return passedAttempt?.date ? new Date(passedAttempt.date).toLocaleDateString() : "N/A";
      }
    }] : []),
  ];

  const actionButton = (student) => (
    <div className="flex space-x-2">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setSelectedStudentId(student._id);
          // Store student data in localStorage for the modal to access
          const students = JSON.parse(localStorage.getItem("students") || "[]");
          if (!students.some(s => s._id === student._id)) {
            localStorage.setItem("students", JSON.stringify([...students, student]));
          }
          setShowModal(true);
        }}
        className={buttonStyles.primary}
      >
        Take Interview
      </button>
    </div>
  );

  // Show loader when data is loading
  if (currentLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <PageNavbar 
        title="Admitted Student WorkFlow" 
        subtitle="Track student progress through different levels"
        showBackButton={false}
      />

      <div className="mt-1 border bg-[var(--backgroundColor)] shadow-sm rounded-lg">
        <div className="px-6">
          {/* Level Tabs */}
          <div className="flex gap-6 mt-4 overflow-x-auto">
            {levelTabs.map((tab) => (
              <div key={tab}>
                <p
                  onClick={() => handleTabClick(tab)}
                  className={`cursor-pointer text-md pb-2 border-b-2 whitespace-nowrap ${
                    activeTab === tab
                      ? "border-[var(--text-color)] font-semibold text-[var(--text-color)]"
                      : "border-gray-200 text-[var(--text-color)]"
                  }`}
                >
                  {tab === "Level's Cleared" ? "" + tab : tab}
                </p>
              </div>
            ))}
          </div>

          <SearchAndFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filtersConfig={filtersConfig}
            allData={data?.data || []}
            selectedRows={[]}
            sectionName="student-detail"
          />
        </div>
        
        <CommonTable
          data={paginatedData}
          columns={columns}
          editable={true}
          actionButton={selectedLevel === "permission" || activeTab === "Level's Cleared" ? null : actionButton}
          onRowClick={(row) => {
            // Set the source section to 'admitted' before navigating
            localStorage.setItem("lastSection", "admitted");
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
 
      <CreateInterviewModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        studentId={selectedStudentId}
        refetchStudents={refetch}
        interviewLevel={selectedLevel}
      />
    </>
  );
};

export default StudentDetailTable;
