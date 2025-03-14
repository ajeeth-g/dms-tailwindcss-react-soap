import { motion } from "framer-motion";
import { View } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import Button from "../components/common/Button";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useAuth } from "../context/AuthContext";
import { getUserTasks, updateUserTasks } from "../services/taskService";
import {
  convertServiceDate,
  formatDateParts,
  formatDateTime,
} from "../utils/dateUtils";
import { capitalizeFirstLetter } from "../utils/stringUtils";

const TaskView = () => {
  const { userData } = useAuth();
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("name-asc"); // name-asc, name-desc, date-asc, date-desc
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [taskData, setTaskData] = useState([]);
  const [userImages, setUserImages] = useState("");

  const fetchUserTasks = useCallback(async () => {
    setLoadingTasks(true);
    try {
      const response = await getUserTasks(
        userData.currentUserName,
        userData.currentUserLogin
      );

      const fetchUserImage = () => {};

      setTaskData(response?.length > 0 ? response : []);
      setLoadingTasks(false);
    } catch (error) {
      console.error("Error fetching dms master:", error);
      setTaskData([]);
    }
  }, [userData.currentUserLogin, userData.currentUserName]);

  useEffect(() => {
    fetchUserTasks();
  }, [fetchUserTasks]);

  const handleUpdateUserTasks = async (taskData, taskStatus) => {
    try {
      const updateUserTasksPayload = {
        taskID: taskData.TASK_ID,
        taskStatus: taskStatus,
        statusDateTime: formatDateTime(new Date()),
        reason: taskData.REASON,
        userName: userData.currentUserName,
      };

      console.log(updateUserTasksPayload);

      const updateUserTasksResponse = await updateUserTasks(
        updateUserTasksPayload,
        userData.currentUserLogin
      );
    } catch (error) {
      console.error("Task Update failed:", error);
    }
  };

  console.log(taskData);

  return (
    <div className="container mx-auto space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search tasks..."
          className="input input-bordered input-sm max-w-xs"
        />
        <select
          className="select select-bordered select-sm max-w-xs"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="all">All</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
        </select>
        <select
          className="select select-bordered select-sm max-w-xs"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="name-asc">Name: A-Z</option>
          <option value="name-desc">Name: Z-A</option>
          <option value="date-asc">Created: Oldest</option>
          <option value="date-desc">Created: Newest</option>
        </select>
      </div>

      {loadingTasks ? (
        <div className="flex justify-center items-start">
          <LoadingSpinner className="loading loading-spinner loading-lg" />
        </div>
      ) : taskData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2">
          {taskData.map((task, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.04 }}
              className="card card-compact bg-gray-800 shadow-xl"
            >
              <div className="card-body justify-between">
                <div>
                  <div className="flex items-start gap-2">
                    <div className="w-10 h-10">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbBa24AAg4zVSuUsL4hJnMC9s3DguLgeQmZA&s"
                        alt="User Name"
                        className="rounded-lg"
                      />
                    </div>
                    
                    <div className="flex justify-between items-start w-full">
                      <div>
                        <h2 className="text-md font-semibold leading-tight truncate">
                          {capitalizeFirstLetter(task.ASSIGNED_USER)}
                        </h2>
                        <p className="text-xs font-medium text-gray-500 leading-none">
                          {task.RELATED_ON}
                        </p>
                      </div>
                      <span className="badge badge-xs badge-success">
                      {task.STATUS}
                    </span>
                      <div>
                        <p className="text-xs text-gray-500 text-center">
                          Start Date:
                        </p>
                        <p className="font-medium text-sm">
                          {convertServiceDate(task.START_DATE)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="divider m-0"></div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="h-24 overflow-y-auto flex-1">
                      <p className="text-lg font-semibold">{task.TASK_NAME}</p>

                      <p className="text-sm font-normal text-gray-500">
                        {task.TASK_INFO}
                      </p>
                    </div>

                    <div className="text-center">
                      <p className="text-xs text-gray-500 text-center">
                        Due on:
                      </p>
                      <div className="bg-gray-900 px-6 py-2 rounded-lg">
                        <p className="text-purple-600 font-bold text-xl leading-none">
                          31
                        </p>
                        <p className="text-xs font-medium">Jan</p>
                        <p className="text-xs font-medium">2025</p>
                      </div>
                      <p className="text-red-500 font-medium text-xs">
                        42 day(s)
                      </p>
                    </div>
                  </div>
                  <div className="divider m-0"></div>
                </div>
                <div className="card-actions justify-between items-center">
                  <div className="flex flex-col">
                    <p className="text-xs">
                      Created by: {capitalizeFirstLetter(task.CREATED_USER)}
                    </p>
                    <p className="text-xs">
                      Created on: {convertServiceDate(task.CREATED_ON)}
                    </p>
                    
                  </div>
                  <Button
                    className="btn btn-primary btn-sm"
                    label="View"
                    onClick={() => handleUpdateUserTasks(task, "ACCEPTED")}
                    disabled={false}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div>
          <p className="text-center text-gray-400">No tasks available.</p>
        </div>
      )}
    </div>
  );
};

export default TaskView;
