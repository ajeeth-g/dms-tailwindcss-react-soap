import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/common/LoadingSpinner";
import DashboardFilter from "../components/DashboardFilter";
import { useAuth } from "../context/AuthContext";
import { getCategoriesSummary } from "../services/dmsService";
import { ChevronRight } from "lucide-react";

const CategoryViewPage = () => {
  const [categories, setCategories] = useState([]);
  const [filterDays, setFilterDays] = useState("30");
  const [loading, setLoading] = useState(true);
  const { userData } = useAuth();
  const navigate = useNavigate();

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

  return loading ? (
    <div className="flex justify-center items-start">
      <LoadingSpinner className="loading loading-spinner loading-lg" />
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
      <div className="col-span-1 md:col-span-2 lg:col-span-4 flex justify-end">
        <DashboardFilter onFilterChange={setFilterDays} />
      </div>
      {categories.map((category) => (
        <div
          key={category.DOC_RELATED_CATEGORY}
          className="cust-card-group"
        >
          <div className="text-center">
            <h1 className="text-6xl font-bold"> {category.total_count}</h1>
            <h6 className="text-sm" >{category.DOC_RELATED_CATEGORY}</h6>
            <div>
              <Link
                to="/document-list"
                state={{ categoryName: category.DOC_RELATED_CATEGORY }}
                className="mt-2 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 decoration-2 hover:text-blue-700 hover:underline focus:underline focus:outline-hidden focus:text-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-600 dark:focus:text-blue-600">
                View Documents
                <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryViewPage;
