import React, { useEffect, useState } from "react";
import LoadingSpinner from "../components/common/LoadingSpinner";
import staticCategoryData from "../staticCategoryData";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CategoryViewPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      setCategories(staticCategoryData);
      setLoading(false);
    };

    fetchCategories();
  }, []);

  const handleViewDocument = (categoryName) => {
    navigate("/document-list", { state: { categoryName } });
  };

  return loading ? (
    <div className="flex justify-center items-start">
      <LoadingSpinner className="loading loading-spinner loading-lg" />
    </div>
  ) : (
    <div className="grid gap-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
      {categories.map((category) => (
        <motion.div
          key={category.CATEGORY_NAME}
          whileHover={{ scale: 1.04 }}
          className="card card-compact bg-neutral shadow-xl"
        >
          <div className="card-body">
            <h2 className="card-title">{category.CATEGORY_NAME}</h2>
            <p>12 documents attached</p>
            <div className="card-actions">
              <button
                className="btn btn-primary btn-sm btn-outline w-full"
                onClick={() => handleViewDocument(category.CATEGORY_NAME)}
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
