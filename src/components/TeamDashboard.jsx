import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getAllDmsActiveUser } from "../services/dashboardService";
import { getEmployeeImage } from "../services/employeeService";
import TeamCard from "./TeamCard";
import LoadingSpinner from "./common/LoadingSpinner";
import SearchInput from "./common/SearchInput";

export default function TeamDashboard() {
  const { userData } = useAuth();
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsersAndImages = async () => {
      try {
        // Fetch user data
        const userDetails = await getAllDmsActiveUser("", userData.currentUserLogin);
        let usersArray = [];

        // Process user data as before
        if (userDetails && Array.isArray(userDetails.data)) {
          usersArray = userDetails.data;
        } else if (userDetails && Array.isArray(userDetails)) {
          usersArray = userDetails;
        } else {
          usersArray = userDetails ? [userDetails] : [];
        }

        // Fetch images for all users
        const usersWithImages = await Promise.all(
          usersArray.map(async (user) => {
            try {
              const imageData = await getEmployeeImage(user.emp_no, userData.currentUserLogin);

              return {
                ...user,
                image: imageData
                  ? `data:image/jpeg;base64,${imageData}`
                  : "https://placehold.co/600x400/000000/FFFFFF.png",
              };
            } catch (error) {
              console.error(
                `Error fetching image for user ${user.emp_no}:`,
                error
              );
              return {
                ...user,
                image: "/placeholder-user.png", // Ensure fallback here too
              };
            }
          })
        );

        setUsersData(usersWithImages);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsersAndImages();
  }, [userData.currentUserLogin]);
  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg rounded-2xl p-6 border border-gray-700">
      <div className="flex items-center justify-between gap-2 mb-8">
        <h2 className="text-xl font-semibold text-gray-100 mb-4">My Team</h2>
        <SearchInput />
      </div>
      {loading ? (
        <div className="flex justify-center items-start">
          <LoadingSpinner className="loading loading-spinner loading-lg" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {usersData.slice(0, 3).map((user, index) => (
              <TeamCard key={index} user={user} />
            ))}
          </div>
          <div className="mt-4 text-right">
            <Link to="/my-team" className="btn btn-link btn-sm">
              See All
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
