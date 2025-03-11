import React, { useState, useEffect } from "react";
import LoadingSpinner from "../components/common/LoadingSpinner";

const CategoryViewPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching category data from an API
  useEffect(() => {
    const fetchCategories = async () => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Dummy category data
      const data = [
        {
          id: 1,
          name: "Invoices",
          description: "Manage all invoice documents.",
        },
        {
          id: 2,
          name: "Contracts",
          description: "View contracts and agreements.",
        },
        {
          id: 3,
          name: "Reports",
          description: "Access monthly and annual reports.",
        },
        {
          id: 4,
          name: "Memos",
          description: "Internal memos and communications.",
        },
      ];
      setCategories(data);
      setLoading(false);
    };

    fetchCategories();
  }, []);

  return loading ? (
    <div className="flex justify-center items-start">
      <LoadingSpinner className="loading loading-spinner loading-lg" />
    </div>
  ) : (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
      {categories.map((category) => (
        <div
          key={category.id}
          className="card compact bg-neutral shadow-xl hover:shadow-2xl transition-all duration-200"
        >
          <div className="card-body">
            <h2 className="card-title">{category.name}</h2>
            <p>{category.description}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary" onClick={() => {}}>
                View Documents
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryViewPage;
