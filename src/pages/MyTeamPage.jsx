import React, { useEffect, useState } from "react";
import LoadingSpinner from "../components/common/LoadingSpinner";
import TeamCard from "../components/TeamCard";
import { useAuth } from "../context/AuthContext";
import { getAllDmsActiveUser } from "../services/dashboardService";
import { getEmployeeImage } from "../services/employeeService";

const MyTeamPage = () => {
  const { userData } = useAuth();
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsersAndImages = async () => {
      try {
        // Fetch user data
        const userDetails = await getAllDmsActiveUser(
          "",
          userData.currentUserLogin
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
                userData.currentUserLogin
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

  // Rest of the component remains the same
  return loading ? (
    <div className="flex justify-center items-start">
      <LoadingSpinner className="loading loading-spinner loading-lg" />
    </div>
  ) : usersData.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
      {usersData.map((user, index) => (
        <TeamCard key={index} user={user} />
      ))}
    </div>
  ) : (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-gray-400">No users found</p>
    </div>
  );
};

export default MyTeamPage;
