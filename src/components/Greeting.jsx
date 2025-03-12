import React from "react";
import { useAuth } from "../context/AuthContext";
import { capitalizeFirstLetter } from "../utils/stringUtils";

const Greeting = () => {
  const { userData } = useAuth();

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex items-center gap-4 p-7 rounded-2xl shadow-lg border border-gray-700">
      {/* Avatar Section */}
      <div className="w-20 h-20 rounded-full overflow-hidden shadow-md border-2 border-gray-700">
        <img
          alt="User Avatar"
          src={`data:image/jpeg;base64,${userData.currentUserImageData}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Welcome Message */}
      <div className="animate-fade-in">
        <h2 className="text-4xl font-semibold text-white">
          Welcome Back,{" "}
          <span className="text-indigo-400">
            {capitalizeFirstLetter(userData.currentUserName)}
          </span>{" "}
          👋
        </h2>
        <p className="text-sm text-gray-400 mt-1">Today is {currentDate}</p>
      </div>
    </div>
  );
};

export default Greeting;
