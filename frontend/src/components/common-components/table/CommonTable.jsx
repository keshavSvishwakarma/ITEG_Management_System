/* eslint-disable react/prop-types */
import { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";

const CommonTable = ({
  columns,
  data,
  editable,
  pagination,
  rowsPerPage = 10,
  searchTerm = "",
  actionButton,
  extraColumn,
  currentPage: parentPage,
  onPageChange,
}) => {
  const [internalPage, setInternalPage] = useState(1);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const currentPage = parentPage ?? internalPage;
  const setCurrentPage = onPageChange ?? setInternalPage;
  const [pageSize, setPageSize] = useState(rowsPerPage);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    setCurrentPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const filteredData = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return data.filter((row) =>
      Object.values(row)
        .map((val) => String(val ?? ""))
        .join(" ")
        .toLowerCase()
        .includes(term)
    );
  }, [data, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const isAllSelected = paginatedData.every((row) =>
    selectedRows.includes(row._id)
  );

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedRows((prev) =>
        prev.filter((id) => !paginatedData.find((row) => row._id === id))
      );
    } else {
      const newIds = paginatedData.map((row) => row._id);
      setSelectedRows((prev) => [...new Set([...prev, ...newIds])]);
    }
  };

  const handleRowSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id)
        ? prev.filter((rowId) => rowId !== id)
        : [...prev, id]
    );
  };

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [paginatedData]);

  return (
    <div className="w-full py-3">
      <div className="pb-4 w-full">
        <div className="overflow-x-auto max-w-full">
          <div ref={scrollRef} className="max-h-[60vh] overflow-y-auto custom-scrollbar">
            <table className="min-w-full table-fixed text-sm">
              <thead className="sticky text-md top-0 bg-[--neutral-light] text-gray-600 border-b shadow-sm">
                <tr>
                  <th className="px-4 py-3 text-start w-10">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-black accent-[#1c252e] rounded-md"
                      checked={isAllSelected}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th className="px-4 py-3 text-start w-16">S.no</th>
                  {columns.map(({ key, label, width }) => (
                    <th key={key} className={`px-4 py-3 text-start ${width ?? ""}`}>
                      {label}
                    </th>
                  ))}
                  {editable && actionButton && (
                    <th className="px-4 py-3 text-start w-28">Action</th>
                  )}
                  {extraColumn && (
                    <th className="px-4 py-3 text-start">{extraColumn.header}</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="hover:bg-gray-100 text-md border-b border-gray-200 transition cursor-pointer"
                    onClick={() => navigate(`/admission/edit/${row._id}`)}
                  >
                    <td
                      className="px-4 py-3"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="checkbox"
                        className="rounded-md accent-[#1c252e] h-4 w-4"
                        checked={selectedRows.includes(row._id)}
                        onChange={() => handleRowSelect(row._id)}
                      />
                    </td>

                    <td className="px-4 py-3 text-start font-medium text-gray-800">
                      {(currentPage - 1) * pageSize + rowIndex + 1}
                    </td>

                    {columns.map(({ key, render, width }) => (
                      <td
                        key={key}
                        className={`px-4 py-3 text-start text-gray-700 ${width ?? ""}`}
                      >
                        {render ? (
                          render(row)
                        ) : key === "profile" ? (
                          <div className="flex justify-center">
                            <img
                              src={row[key]}
                              alt="avatar"
                              className="w-8 h-8 rounded-full object-cover"
                            />
                          </div>
                        ) : (
                          row[key]
                        )}
                      </td>
                    ))}

                    {editable && actionButton && (
                      <td
                        className="px-4 py-3 text-start"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="inline-block hover:shadow-md transition cursor-pointer">
                          {actionButton(row)}
                        </div>
                      </td>
                    )}

                    {extraColumn && (
                      <td className="px-4 py-3 text-start">
                        {extraColumn.render?.(row)}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {pagination && (
          <div className="flex justify-end items-center gap-6 px-6 py-4 border-t border-gray-200 bg-white rounded-b-2xl text-sm">
            <div className="flex items-center gap-2">
              <span className="text-gray-700 font-semibold">Rows Per Pages:</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  const selected = parseInt(e.target.value);
                  setPageSize(selected);
                  setCurrentPage(1);
                }}
                className="px-3 py-1 text-sm focus:outline-none"
              >
                <option value={filteredData.length}>All</option>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </div>

            <span className="text-gray-700 font-medium">
              {filteredData.length === 0
                ? "0"
                : `${(currentPage - 1) * pageSize + 1} - ${Math.min(
                    currentPage * pageSize,
                    filteredData.length
                  )} of ${filteredData.length}`}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="w-7 h-7 flex items-center justify-center text-[var(--text-color)] disabled:opacity-40"
              >
                <span className="text-3xl">‹</span>
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="w-7 h-7 text-md flex items-center justify-center text-[var(--text-color)] disabled:opacity-40"
              >
                <span className="text-3xl">›</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommonTable;




// /* eslint-disable react/prop-types */
// import { useState, useEffect, useMemo, useRef } from "react";
// import { useNavigate } from "react-router-dom";

// const CommonTable = ({
//   columns,
//   data,
//   editable,
//   pagination,
//   rowsPerPage = 10,
//   searchTerm = "",
//   actionButton,       // ✅ Optional action button per row
//   extraColumn,
//   currentPage: parentPage,
//   onPageChange,
// }) => {
//   const [internalPage, setInternalPage] = useState(1);
//   const scrollRef = useRef(null);
//   const navigate = useNavigate();

//   const currentPage = parentPage ?? internalPage;
//   const setCurrentPage = onPageChange ?? setInternalPage;
//   const [pageSize, setPageSize] = useState(rowsPerPage);
//   const [selectedRows, setSelectedRows] = useState([]);

//   useEffect(() => {
//     setCurrentPage(1);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [searchTerm]);

//   const filteredData = useMemo(() => {
//     const term = searchTerm.toLowerCase();
//     return data.filter((row) =>
//       Object.values(row)
//         .map((val) => String(val ?? ""))
//         .join(" ")
//         .toLowerCase()
//         .includes(term)
//     );
//   }, [data, searchTerm]);

//   const totalPages = Math.ceil(filteredData.length / pageSize);

//   const paginatedData = useMemo(() => {
//     const start = (currentPage - 1) * pageSize;
//     return filteredData.slice(start, start + pageSize);
//   }, [filteredData, currentPage, pageSize]);


//   const isAllSelected = paginatedData.every((row) =>
//     selectedRows.includes(row._id)
//   );

//   const handleSelectAll = () => {
//     if (isAllSelected) {
//       setSelectedRows((prev) =>
//         prev.filter((id) => !paginatedData.find((row) => row._id === id))
//       );
//     } else {
//       const newIds = paginatedData.map((row) => row._id);
//       setSelectedRows((prev) => [...new Set([...prev, ...newIds])]);
//     }
//   };

//   const handleRowSelect = (id) => {
//     setSelectedRows((prev) =>
//       prev.includes(id)
//         ? prev.filter((rowId) => rowId !== id)
//         : [...prev, id]
//     );
//   };


//   useEffect(() => {
//     scrollRef.current?.scrollTo({
//       top: scrollRef.current.scrollHeight,
//       behavior: "smooth",
//     });
//   }, [paginatedData]);

//   return (
//     <div className="w-full py-3">
//       <div className="pb-4 w-full">
//         <div className="overflow-x-auto max-w-full">
//           <div ref={scrollRef} className="max-h-[60vh] overflow-y-auto custom-scrollbar">
//             <table className="min-w-full text-sm">
//               <thead className="sticky  text-md top-0 bg-[--neutral-light]  text-gray-600 border-b shadow-sm">
//                 <tr>
//                   <th className="px-4 py-3 text-start">
//                     <input type="checkbox" className="h-4 w-4 text-black accent-[#1c252e] rounded-md"
//                       checked={isAllSelected}
//                       onChange={handleSelectAll}
//                     />
//                   </th>
//                   <th className="px-4 py-3 text-start ">S.no</th>
//                   {columns.map(({ key, label }) => (
//                     <th key={key} className="px-4 py-3 text-start">{label}</th>
//                   ))}
//                   {editable && actionButton && (
//                     <th className="px-4 py-3 text-start">Action</th>
//                   )}
//                   {extraColumn && (
//                     <th className="px-4 py-3 text-start">{extraColumn.header}</th>
//                   )}
//                 </tr>
//               </thead>
//               <tbody>
//                 {paginatedData.map((row, rowIndex) => (
//                   <tr key={rowIndex}
//                     className="hover:bg-gray-100 text-md border-b border-gray-200 transition cursor-pointer"
//                     onClick={() => navigate(`/admission/edit/${row._id}`)} // ⬅️ Navigation trigger
//                   >
//                     <td className="px-4 py-3"
//                       onClick={(e) => e.stopPropagation()} //Stop row click when clicking checkbox
//                     >
//                       <input type="checkbox"
//                         className="rounded-md accent-[#1c252e] h-4 w-4"
//                         checked={selectedRows.includes(row._id)}
//                         onChange={() => handleRowSelect(row._id)}
//                       />
//                     </td>

//                     <td className="px-4 py-3 text-start font-medium text-gray-800">
//                       {(currentPage - 1) * pageSize + rowIndex + 1}
//                     </td>
//                     {columns.map(({ key, render }) => (
//                       <td key={key} className="px-4 py-3 text-start text-gray-700">
//                         {render ? (
//                           render(row)
//                         ) : key === "profile" ? (
//                           <div className="flex justify-center">
//                             <img
//                               src={row[key]}
//                               alt="avatar"
//                               className="w-8 h-8 rounded-full object-cover"
//                             />
//                           </div>
//                         ) : (
//                           row[key]
//                         )}
//                       </td>
//                     ))}
//                     {editable && actionButton && (
//                       <td
//                           className="px-4 py-3 text-start"
//                           onClick={(e) => e.stopPropagation()} //prevent row click from firing
//                       >
//                         <div className="inline-block hover:shadow-md transition cursor-pointer">
//                           {actionButton(row)}
//                         </div>
//                       </td>

//                     )}
//                     {extraColumn && (
//                       <td className="px-4 py-3 text-start">
//                         {extraColumn.render?.(row)}
//                       </td>
//                     )}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {pagination && (
//           <div className="flex justify-end items-center gap-6 px-6 py-4 border-t border-gray-200 bg-white rounded-b-2xl text-sm">
//             <div className="flex items-center gap-2">
//               <span className="text-gray-700 font-semibold">Rows Per Pages:</span>
//               <select
//                 value={pageSize}
//                 onChange={(e) => {
//                   const selected = parseInt(e.target.value);
//                   setPageSize(selected);
//                   setCurrentPage(1);
//                 }}
//                 className="px-3 py-1 text-sm focus:outline-none"
//               >
//                 <option value={filteredData.length}>All</option>
//                 <option value={5}>5</option>
//                 <option value={10}>10</option>
//                 <option value={25}>25</option>
//                 <option value={50}>50</option>
//               </select>
//             </div>

//             <span className="text-gray-700 font-medium">
//               {filteredData.length === 0
//                 ? "0"
//                 : `${(currentPage - 1) * pageSize + 1} - ${Math.min(
//                   currentPage * pageSize,
//                   filteredData.length
//                 )} of ${filteredData.length}`}
//             </span>

//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//                 disabled={currentPage === 1}
//                 className="w-7 h-7   flex items-center justify-center text-[var(--text-color)] disabled:opacity-40"
//               >
//                 <span className="text-3xl">‹</span>
//               </button>
//               <button
//                 onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
//                 disabled={currentPage === totalPages}
//                 className="w-7 h-7 text-md  flex items-center justify-center text-[var(--text-color)] disabled:opacity-40"
//               >
//                 <span className="text-3xl">›</span>
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CommonTable;