import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getAllDmsActiveUser } from "../services/dashboardService";
import { getEmployeeImage } from "../services/employeeService";
import TeamCard from "./TeamCard";
import LoadingSpinner from "./common/LoadingSpinner";
import SearchInput from "./common/SearchInput";
import { ChevronRight } from "lucide-react";

export default function TeamDashboard() {
  const { userData } = useAuth();
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsersAndImages = async () => {
      try {
        // Fetch user data
        const userDetails = await getAllDmsActiveUser(
          "",
          userData.currentUserLogin,
          userData.clientURL
        );
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
              const imageData = await getEmployeeImage(
                user.emp_no,
                userData.currentUserLogin,
                userData.clientURL
              );

              return {
                ...user,
                image: imageData
                  ? `data:image/jpeg;base64,${imageData}`
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbBa24AAg4zVSuUsL4hJnMC9s3DguLgeQmZA&s",
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
    <div className="cust-card-group">
      <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
        <h2 className="text-xl font-semibold">My Team</h2>
      </div>
      {loading ? (
        <div className="flex justify-center items-start">
          <LoadingSpinner className="loading loading-spinner loading-lg" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-3">
            {usersData.slice(0, 2).map((user, index) => (
              <TeamCard key={index} user={user} />
            ))}
          </div>
          <div className="mt-4 text-right">
            <Link
              to="/my-team"
              className="inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-700 hover:underline dark:text-blue-500 dark:hover:text-blue-600"
            >
              View Teams
              <ChevronRight size={18} />
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
