import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetAllCompaniesQuery } from '../../redux/api/authApi';
import Loader from '../common-components/loader/Loader';
import PageNavbar from '../common-components/navbar/PageNavbar';
import CommonTable from '../common-components/table/CommonTable';
import Pagination from '../common-components/pagination/Pagination';
import SearchAndFilters from '../common-components/search-filters/SearchAndFilters';

const CompanyDetail = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetAllCompaniesQuery();
  const companies = data?.data || data || [];
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocations, setSelectedLocations] = useState([]);

  // Dynamic options from data
  const dynamicLocationOptions = useMemo(() => {
    return [...new Set(companies.map((c) => c.location || ''))].filter(Boolean);
  }, [companies]);

  const filtersConfig = [
    {
      title: "Location",
      options: dynamicLocationOptions,
      selected: selectedLocations,
      setter: setSelectedLocations,
    },
  ];

  const filteredData = companies.filter((company) => {
    const searchableValues = Object.values(company)
      .map((val) => String(val ?? "").toLowerCase())
      .join(" ");
    if (!searchableValues.includes(searchTerm.toLowerCase())) return false;

    const location = company.location || "";
    const matchesLocation = selectedLocations.length === 0 || selectedLocations.includes(location);

    return matchesLocation;
  });

  // Calculate pagination for filtered data
  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handleRowClick = (company) => {
    navigate(`/placement/company/${company._id}`, {
      state: { companyName: company.companyName }
    });
  };

  const columns = [
    {
      key: "profile",
      label: "Company Name",
      render: (row) => (
        <div className="flex items-center gap-2">
          {row.companyLogo ? (
            <img src={row.companyLogo} alt={row.companyName} className="w-8 h-8 rounded-full object-cover" />
          ) : (
            <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">
                {row.companyName?.charAt(0)?.toUpperCase() || 'C'}
              </span>
            </div>
          )}
          <div className="flex flex-col">
            <span className="font-medium text-gray-800">{row.companyName}</span>
          </div>
        </div>
      ),
    },
    {
      key: "hrEmail",
      label: "HR Email",
    },
    {
      key: "hrContact",
      label: "HR Contact",
      render: (row) => row.hrContact || 'N/A',
    },
    {
      key: "location",
      label: "Location",
    },
    {
      key: "createdAt",
      label: "Created Date",
      render: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <p className="text-center text-red-600">Error loading companies: {error?.data?.message || 'Something went wrong'}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <PageNavbar
        title="Company Details"
        subtitle="Manage and track company information"
        showBackButton={false}
      />
      <div className="mt-1 border bg-[var(--backgroundColor)] shadow-sm rounded-lg">

        <div className="px-6">
          <SearchAndFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filtersConfig={filtersConfig}
            allData={companies}
            selectedRows={[]}
            sectionName="companies"
          />
        </div>

        {companies.length === 0 ? (
          <p className="text-center text-gray-500">No companies found.</p>
        ) : (
          <>
            <CommonTable
              columns={columns}
              data={paginatedData}
              actionButton={null}
              onRowClick={handleRowClick}
            />
            
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredData.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default CompanyDetail