import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/common/LoadingSpinner";
import DashboardFilter from "../components/DashboardFilter";
import { useAuth } from "../context/AuthContext";
import { getCategoriesSummary } from "../services/dmsService";
import { ChevronRight, SearchIcon } from "lucide-react";

const CategoryViewPage = () => {
  const [categories, setCategories] = useState([]);
  const [filterDays, setFilterDays] = useState("30");
  const [loading, setLoading] = useState(true);
  const { userData } = useAuth();
  const [globalFilter, setGlobalFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getCategoriesSummary(
          filterDays,
          userData.currentUserLogin,
          userData.clientURL
        );

        setCategories(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard summary:", error);
      }
    };

    fetchData();
  }, [filterDays]);

  const filteredCategories = categories.filter((category) => {
    const search = globalFilter.toLowerCase();
    return (
      category.DOC_RELATED_CATEGORY.toLowerCase().includes(search)
    )
  }
  );

  return (
    <div className="space-y-4">
      {/* CONTROLS ROW */}
      <div className="flex flex-col md:flex-row md:justify-between items-stretch gap-2">
        {/* Search */}
        <label className="input input-bordered input-sm flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Global Search..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
          <SearchIcon className="w-4 h-4" />
        </label>
        {/* Filter dropdown */}
        <div className="flex-shrink-0">
          <DashboardFilter onFilterChange={setFilterDays} />
        </div>
      </div>

      {
        loading ? (
          <div className="flex justify-center items-center">
            <LoadingSpinner className="loading loading-spinner loading-lg" />
          </div>
        ) : filteredCategories.length === 0 ? (
          <p>No data found...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredCategories.map((category) => (
              <div key={category.DOC_RELATED_CATEGORY} className="cust-card-group p-4">
                <div className="text-center">
                  <h1 className="text-6xl font-bold">{category.total_count}</h1>
                  <h6 className="text-sm">{category.DOC_RELATED_CATEGORY}</h6>
                  <div className="mt-2">
                    <Link
                      to="/document-view"
                      state={{ categoryName: category.DOC_RELATED_CATEGORY }}
                      className="inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-700 hover:underline dark:text-blue-500 dark:hover:text-blue-600"
                    >
                      View Documents
                      <ChevronRight size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      }
    </div >
  );
};

export default CategoryViewPage;
