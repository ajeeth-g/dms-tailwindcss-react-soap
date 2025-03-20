import { motion } from "framer-motion";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Button from "../components/common/Button";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ConfirmationTaskModal from "../components/ConfirmationTaskModal";
import UpdateTaskModal from "../components/UpdateTaskModal";
import { useAuth } from "../context/AuthContext";
import { getEmployeeImage } from "../services/employeeService";
import {
  getUserTasks,
  transferUserTasks,
  updateUserTasks,
} from "../services/taskService";
import {
  convertServiceDate,
  formatDateParts,
  formatDateTime,
} from "../utils/dateUtils";
import { capitalizeFirstLetter } from "../utils/stringUtils";
import TranferTaskModal from "../components/TranferTaskModal";

const TaskView = () => {
  const { userData } = useAuth();
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("name-asc"); // name-asc, name-desc, date-asc, date-desc
  const [searchText, setSearchText] = useState("");
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [taskData, setTaskData] = useState([]);

  // Modal state for the confirmation modal
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const fetchUserTasks = useCallback(async () => {
    setLoadingTasks(true);
    try {
      const taskDataResponse = await getUserTasks(
        userData.currentUserName,
        userData.currentUserLogin,
        userData.clientURL
      );

      let taskDataArray = [];
      if (taskDataResponse && Array.isArray(taskDataResponse)) {
        taskDataArray = taskDataResponse;
      } else {
        taskDataArray = taskDataResponse ? [taskDataResponse] : [];
      }

      const tasksWithImages = await Promise.all(
        taskDataArray.map(async (task) => {
          try {
            const imageData = await getEmployeeImage(
              task.ASSIGNED_EMP_NO,
              userData.currentUserLogin,
              userData.clientURL
            );

            return {
              ...task,
              assignedEmpImage: imageData
                ? `data:image/jpeg;base64,${imageData}`
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbBa24AAg4zVSuUsL4hJnMC9s3DguLgeQmZA&s",
            };
          } catch (error) {
            console.error(
              `Error fetching image for assigned user ${task.ASSIGNED_EMP_NO}:`,
              error
            );
            return {
              ...task,
              assignedEmpImage:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbBa24AAg4zVSuUsL4hJnMC9s3DguLgeQmZA&s",
            };
          }
        })
      );

      setTaskData(tasksWithImages);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setTaskData([]);
    } finally {
      setLoadingTasks(false);
    }
  }, [userData.currentUserLogin, userData.currentUserName, userData.clientURL]);

  useEffect(() => {
    fetchUserTasks();
  }, [fetchUserTasks]);

  // Filter tasks based on search text and status filter.
  const filteredTasks = useMemo(() => {
    return taskData.filter((task) => {
      // Filter by status if filter is not "all"
      let statusMatch = true;
      if (statusFilter !== "all") {
        const statusMapping = {
          pending: "NEW",
          rejected: "REJECTED",
          accepted: "ACCEPTED",
        };
        statusMatch =
          task.STATUS === (statusMapping[statusFilter] || statusFilter);
      }

      // Filter by search text: search in TASK_NAME and TASK_INFO (case-insensitive)
      const searchMatch =
        task.TASK_NAME.toLowerCase().includes(searchText.toLowerCase()) ||
        task.TASK_INFO.toLowerCase().includes(searchText.toLowerCase());

      return statusMatch && searchMatch;
    });
  }, [taskData, statusFilter, searchText]);

  // Sort tasks based on sortOrder.
  const sortedTasks = useMemo(() => {
    const tasksCopy = [...filteredTasks];
    tasksCopy.sort((a, b) => {
      if (sortOrder.startsWith("name")) {
        const nameA = a.TASK_NAME.toLowerCase();
        const nameB = b.TASK_NAME.toLowerCase();
        if (nameA < nameB) return sortOrder === "name-asc" ? -1 : 1;
        if (nameA > nameB) return sortOrder === "name-asc" ? 1 : -1;
        return 0;
      } else if (sortOrder.startsWith("date")) {
        const dateA = new Date(a.CREATED_ON);
        const dateB = new Date(b.CREATED_ON);
        if (dateA < dateB) return sortOrder === "date-asc" ? -1 : 1;
        if (dateA > dateB) return sortOrder === "date-asc" ? 1 : -1;
        return 0;
      }
      return 0;
    });
    return tasksCopy;
  }, [filteredTasks, sortOrder]);

  const handleAcceptAndDeclineTask = (task) => {
    setSelectedTask(task);
    setIsConfirmationModalOpen(true);
  };

  const handleUpdateTask = (task) => {
    setSelectedTask(task);
    setIsUpdateModalOpen(true);
  };

  const handleTranferTask = (task) => {
    setSelectedTask(task);
    setIsTransferModalOpen(true);
  };

  // Handle modal actions
  const handleAction = async ({ status, date = "", remarks = "" }) => {
    try {
      const updateUserTasksPayload = {
        taskID: selectedTask.TASK_ID,
        taskStatus: status,
        statusDateTime: date || formatDateTime(new Date()),
        reason: remarks,
        userName: userData.currentUserName,
      };

      const updateResponse = await updateUserTasks(
        updateUserTasksPayload,
        userData.currentUserLogin,
        userData.clientURL
      );

      console.log(updateResponse);
    } catch (error) {
      console.error("Task update failed:", error);
    }

    setIsConfirmationModalOpen(false);
  };

  const handleTransfer = async (transferTaskData) => {
    try {
      const transferUserTasksPayload = {
        taskID: selectedTask.TASK_ID,
        userName: userData.currentUserName,
        notCompletionReason: transferTaskData.NotCompletionReason,
        subject: selectedTask.TASK_NAME,
        details: selectedTask.TASK_INFO,
        relatedTo: selectedTask.RELATED_ON,
        creatorReminderOn: transferTaskData.CreatorReminderOn,
        startDate: transferTaskData.StartDate,
        compDate: transferTaskData.CompDate,
        remindTheUserOn: transferTaskData.RemindTheUserOn,
        newUser: transferTaskData.NewUser,
      };

      const transferUserTasksResponse = await transferUserTasks(
        transferUserTasksPayload,
        userData.currentUserLogin,
        userData.clientURL
      );

      console.log(transferUserTasksResponse);
    } catch (error) {
      console.error("Task transfer failed:", error);
    }

    setIsConfirmationModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsUpdateModalOpen(false);
    setIsConfirmationModalOpen(false);
    setIsTransferModalOpen(false);
  };

  const getButtons = (task) => {
    if (task.STATUS === "NEW")
      if (task.ASSIGNED_USER === userData.currentUserName) {
        return (
          <Button
            className="btn btn-success btn-sm"
            label="Accept / Decline"
            onClick={() => handleAcceptAndDeclineTask(task)}
          />
        );
      }

    if (task.STATUS === "ACCEPTED") {
      if (task.ASSIGNED_USER === userData.currentUserName) {
        return (
          <Button
            className="btn btn-primary btn-sm"
            label="Update"
            onClick={() => handleUpdateTask(task)}
          />
        );
      }
      if (task.CREATED_USER === userData.currentUserName) {
        return (
          <>
            <Button
              className="btn btn-primary btn-sm"
              label="Update"
              onClick={() => handleUpdateTask(task)}
            />
            <Button
              className="btn btn-primary btn-outline btn-sm"
              label="Transfer"
              onClick={() => handleTranferTask(task)}
            />
          </>
        );
      }
    }

    return null; // No buttons if conditions don't match
  };

  return (
    <div className="container mx-auto space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search tasks..."
            className="input input-bordered input-sm max-w-xs"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
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

        <div className="flex items-center gap-2">
          <div className="join">
            <input
              className="join-item btn btn-sm"
              type="radio"
              name="options"
              aria-label="All tasks"
            />
            <input
              className="join-item btn btn-sm"
              type="radio"
              name="options"
              aria-label="Assigned by me"
            />
            <input
              className="join-item btn btn-sm"
              type="radio"
              name="options"
              aria-label="Assigned to me"
            />
          </div>

          <select
            className="select select-bordered select-sm max-w-xs"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Status</option>
            <option value="accepted">Accepted</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {loadingTasks ? (
        <div className="flex justify-center items-start">
          <LoadingSpinner className="loading loading-spinner loading-lg" />
        </div>
      ) : sortedTasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 gap-2">
          {sortedTasks.map((task, index) => {
            const { day, month, year, daysRemaining } = formatDateParts(
              convertServiceDate(task.COMPLETION_DATE)
            );
            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.04 }}
                className="card card-compact bg-base-100 shadow-xl"
              >
                <div className="card-body justify-between">
                  <div>
                    <div className="flex justify-between items-center gap-2 mb-4">
                      <span className="badge badge-neutral badge-xs">
                        Task ID: {task.TASK_ID}
                      </span>
                      <span
                        className={`badge badge-xs ${
                          task.STATUS === "ACCEPTED"
                            ? "badge-success"
                            : task.STATUS === "REJECTED"
                            ? "badge-error"
                            : "badge-primary"
                        }`}
                      >
                        {task.STATUS === "NEW"
                          ? "Awaiting for Acceptance"
                          : task.STATUS}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-10 h-10">
                        <img
                          src={task.assignedEmpImage}
                          alt="User"
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
                        <p className="text-lg font-semibold">
                          {task.TASK_NAME}
                        </p>
                        <p className="text-sm font-normal text-gray-500">
                          {task.TASK_INFO}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500 text-center">
                          Due on:
                        </p>
                        <div className="bg-base-100 px-6 py-2 rounded-lg shadow-xl">
                          <p className="text-purple-600 font-bold text-xl leading-none">
                            {day}
                          </p>
                          <p className="text-xs font-medium">{month}</p>
                          <p className="text-xs font-medium">{year}</p>
                        </div>
                        <p className="text-red-500 font-medium text-xs">
                          {daysRemaining} days
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
                    <div className="flex items-center gap-2">
                      {getButtons(task)}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div>
          <p className="text-center text-gray-400">No tasks available.</p>
        </div>
      )}

      <ConfirmationTaskModal
        isOpen={isConfirmationModalOpen}
        onAction={handleAction}
        onClose={handleCloseModal}
      />

      <UpdateTaskModal
        isOpen={isUpdateModalOpen}
        onAction={handleAction}
        onClose={handleCloseModal}
      />

      <TranferTaskModal
        isOpen={isTransferModalOpen}
        onTransfer={handleTransfer}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default TaskView;
