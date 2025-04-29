import { SearchIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import LoadingSpinner from "../components/common/LoadingSpinner";
import TeamCard from "../components/TeamCard";
import { useAuth } from "../context/AuthContext";
import { getAllDmsActiveUser } from "../services/dashboardService";
import { getEmployeeImage } from "../services/employeeService";

const MyTeamPage = () => {
  const { userData } = useAuth();
  const searchInputRef = useRef(null);

  const [usersData, setUsersData] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
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
        if (userDetails && Array.isArray(userDetails)) {
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
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbBa24AAg4zVSuUsL4hJnMC9s3DguLgeQmZA&s", // Ensure fallback here too
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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredusersData = usersData.filter((user) => {
    const search = globalFilter.toLowerCase();
    return (
      user.user_name.toLowerCase().includes(search)
    )
  });

  console.log(filteredusersData);
  

  return loading ? (
    <div className="flex justify-center items-start">
      <LoadingSpinner className="loading loading-spinner loading-lg" />
    </div>
  ) : usersData.length > 0 ? (
    <div className="grid grid-cols-1 gap-4">
      <label className="input input-bordered input-sm flex items-center gap-2 w-72">
        <input
          ref={searchInputRef}
          type="text"
          className="grow"
          placeholder="Global Search... (Ctrl+K)"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
        <kbd className="kbd kbd-sm">⌘</kbd>
        <kbd className="kbd kbd-sm">K</kbd>
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredusersData.map((user, index) => (
          <TeamCard key={index} user={user} />
        ))}
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-gray-400">No users found</p>
    </div>
  );
};

export default MyTeamPage;