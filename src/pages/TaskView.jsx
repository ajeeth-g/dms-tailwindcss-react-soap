import React, { useState, useMemo } from "react";

const tasksData = [
  {
    Task_ID: 1,
    Task_Name: "Document Upload",
    Task_Description:
      "Upload new policy documents to the system. Ensure all files are in PDF format and follow naming conventions.",
    Related_to: "HR",
    Created_user: "Alice",
    Creator_On: "2023-01-10",
    Creater_remainder: "Follow up after 2 days",
    ASsigned_Start_date: "2023-01-11",
    Assigned_Complete_date: "2023-01-15",
    Assigned_User: "Bob",
    Start_date: "2023-01-11",
    End_date: "2023-01-15",
    Completion_date: "2023-01-14",
    Remind_On: "2023-01-12",
    Is_Approved: true,
  },
  {
    Task_ID: 2,
    Task_Name: "Contract Review",
    Task_Description:
      "Review new client contracts and note any missing clauses or terms that need attention.",
    Related_to: "Legal",
    Created_user: "Carol",
    Creator_On: "2023-02-05",
    Creater_remainder: "Check for missing clauses",
    ASsigned_Start_date: "2023-02-06",
    Assigned_Complete_date: "2023-02-10",
    Assigned_User: "Dave",
    Start_date: "2023-02-06",
    End_date: "2023-02-10",
    Completion_date: "",
    Remind_On: "2023-02-07",
    Is_Approved: false,
  },
  {
    Task_ID: 3,
    Task_Name: "System Backup",
    Task_Description:
      "Perform the quarterly backup of system data and verify backup integrity.",
    Related_to: "IT",
    Created_user: "Eve",
    Creator_On: "2023-03-01",
    Creater_remainder: "Verify backup logs",
    ASsigned_Start_date: "2023-03-02",
    Assigned_Complete_date: "2023-03-03",
    Assigned_User: "Frank",
    Start_date: "2023-03-02",
    End_date: "2023-03-03",
    Completion_date: "2023-03-03",
    Remind_On: "2023-03-02",
    Is_Approved: true,
  },
  {
    Task_ID: 4,
    Task_Name: "Data Analysis",
    Task_Description:
      "Analyze last month’s sales data to identify trends and anomalies.",
    Related_to: "Marketing",
    Created_user: "Grace",
    Creator_On: "2023-04-05",
    Creater_remainder: "Double-check figures",
    ASsigned_Start_date: "2023-04-06",
    Assigned_Complete_date: "2023-04-10",
    Assigned_User: "Heidi",
    Start_date: "2023-04-06",
    End_date: "2023-04-10",
    Completion_date: "",
    Remind_On: "2023-04-07",
    Is_Approved: false,
  },
  // More tasks...
];

const TaskCard = ({ task, onView }) => {
  return (
    <div className=" rounded-xl shadow-md p-4 flex flex-col justify-between hover:shadow-lg transition-shadow duration-200">
      <div className="mb-3">
        <h2 className="text-lg font-semibold  truncate">{task.Task_Name}</h2>
        <div className="flex items-center gap-2 mt-1">
          <span
            className={`w-3 h-3 rounded-full ${
              task.Is_Approved ? "bg-green-500" : "bg-yellow-500"
            }`}
            title={task.Is_Approved ? "Approved" : "Pending"}
          ></span>
          <span className="text-xs text-gray-600">{task.Creator_On}</span>
        </div>
      </div>
      <div className="flex justify-between items-center text-sm">
        <div>
          <p className="text-gray-500">
            <span className="font-medium">Start:</span>{" "}
            {task.ASsigned_Start_date}
          </p>
          <p className="text-gray-500">
            <span className="font-medium">Due:</span>{" "}
            {task.Assigned_Complete_date}
          </p>
        </div>
        <button onClick={() => onView(task)} className="btn btn-xs btn-outline">
          View Details
        </button>
      </div>
    </div>
  );
};

const TaskModal = ({ task, onClose }) => {
  if (!task) return null;

  return (
    <>
      <input
        type="checkbox"
        id="task-modal"
        className="modal-toggle"
        checked
        readOnly
      />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{task.Task_Name}</h3>
          <p className="py-2">{task.Task_Description}</p>
          <div className="text-sm text-gray-600 space-y-1">
            <p>
              <span className="font-medium">Assigned User:</span>{" "}
              {task.Assigned_User}
            </p>
            <p>
              <span className="font-medium">Created By:</span>{" "}
              {task.Created_user || task.Created_user}
            </p>
            <p>
              <span className="font-medium">Related To:</span> {task.Related_to}
            </p>
            <p>
              <span className="font-medium">Start Date:</span>{" "}
              {task.ASsigned_Start_date}
            </p>
            <p>
              <span className="font-medium">Due Date:</span>{" "}
              {task.Assigned_Complete_date}
            </p>
            <p>
              <span className="font-medium">Created On:</span> {task.Creator_On}
            </p>
          </div>
          <div className="modal-action">
            <button onClick={onClose} className="btn btn-sm">
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const TaskView = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("name-asc"); // name-asc, name-desc, date-asc, date-desc
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTask, setSelectedTask] = useState(null);
  const itemsPerPage = 4;

  const filteredTasks = useMemo(() => {
    let filtered = tasksData.filter((task) => {
      // Status filter
      if (statusFilter === "approved" && !task.Is_Approved) return false;
      if (statusFilter === "pending" && task.Is_Approved) return false;
      // Search filter
      if (
        !task.Task_Name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !task.Task_Description.toLowerCase().includes(searchQuery.toLowerCase())
      )
        return false;
      return true;
    });
    // Sorting
    if (sortOrder === "name-asc") {
      filtered.sort((a, b) => a.Task_Name.localeCompare(b.Task_Name));
    } else if (sortOrder === "name-desc") {
      filtered.sort((a, b) => b.Task_Name.localeCompare(a.Task_Name));
    } else if (sortOrder === "date-asc") {
      filtered.sort((a, b) => new Date(a.Creator_On) - new Date(b.Creator_On));
    } else if (sortOrder === "date-desc") {
      filtered.sort((a, b) => new Date(b.Creator_On) - new Date(a.Creator_On));
    }
    return filtered;
  }, [searchQuery, statusFilter, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
  const paginatedTasks = filteredTasks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mx-auto space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search tasks..."
          className="input input-bordered input-sm max-w-xs"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
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
      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginatedTasks.length ? (
          paginatedTasks.map((task) => (
            <TaskCard key={task.Task_ID} task={task} onView={setSelectedTask} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No tasks found
          </p>
        )}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            className="btn btn-xs"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, idx) => (
            <button
              key={idx + 1}
              className={`btn btn-xs ${
                currentPage === idx + 1 ? "btn-active" : ""
              }`}
              onClick={() => setCurrentPage(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
          <button
            className="btn btn-xs"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
      {/* Task Detail Modal */}
      {selectedTask && (
        <TaskModal task={selectedTask} onClose={() => setSelectedTask(null)} />
      )}
    </div>
  );
};

export default TaskView;
