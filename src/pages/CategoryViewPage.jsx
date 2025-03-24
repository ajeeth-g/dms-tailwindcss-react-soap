import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/common/LoadingSpinner";
import DashboardFilter from "../components/DashboardFilter";
import { useAuth } from "../context/AuthContext";
import { getCategoriesSummary } from "../services/dmsService";

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

  const handleViewDocument = (categoryName) => {
    navigate("/document-list", { state: { categoryName } });
  };

  return loading ? (
    <div className="flex justify-center items-start">
      <LoadingSpinner className="loading loading-spinner loading-lg" />
    </div>
  ) : (
    <div className="grid gap-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
      <div className="col-span-4 flex justify-end">
        <DashboardFilter onFilterChange={setFilterDays} />
      </div>
      {categories.map((category) => (
        <motion.div
          key={category.DOC_RELATED_CATEGORY}
          whileHover={{ scale: 1.04 }}
          className="card card-compact bg-base-300 shadow-md"
        >
          <div className="card-body">
            <h2 className="card-title">{category.DOC_RELATED_CATEGORY}</h2>
            <p> {category.total_count} documents attached</p>
            <div className="card-actions">
              <button
                className="btn btn-primary btn-sm btn-outline w-full"
                onClick={() =>
                  handleViewDocument(category.DOC_RELATED_CATEGORY)
                }
              >
                View Documents
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CategoryViewPage;
