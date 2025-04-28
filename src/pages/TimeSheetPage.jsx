import { XIcon } from "lucide-react";
import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function TimeSheetPage() {
    const hours = Array.from({ length: 12 }, (_, i) => 7 + i); // 7 AM to 6 PM
    const rowHeight = 64;

    const minutes = [0, 15, 30, 45, 60];

    const colorClasses = [
        "bg-blue-200 bg-opacity-50",
        "bg-green-200 bg-opacity-50",
        "bg-yellow-200 bg-opacity-50",
        "bg-red-200 bg-opacity-50",
        "bg-purple-200 bg-opacity-50",
        "bg-pink-200 bg-opacity-50",
        "bg-indigo-200 bg-opacity-50",
        "bg-teal-200 bg-opacity-50",
    ];

    const getRandomColor = () =>
        colorClasses[Math.floor(Math.random() * colorClasses.length)];

    const [events, setEvents] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const initialTaskDetails = {
        title: [],
        startHour: null,
        endHour: null,
    };

    const [taskDetails, setTaskDetails] = useState(initialTaskDetails);
    const [dragging, setDragging] = useState(false);
    const [dragStart, setDragStart] = useState(null);
    const [dragEnd, setDragEnd] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [search, setSearch] = useState("");

    const tasks = [
        {
            id: 1,
            task: "Material Management",
            dmsNo: "30000097",
            status: "Pending",
        },
        { id: 47, task: "Audit Prep", dmsNo: "30000143", status: "Pending" },
        { id: 48, task: "Equipment Setup", dmsNo: "30000144", status: "Completed" },
        { id: 49, task: "Weekly Reporting", dmsNo: "30000145", status: "Pending" },
        { id: 50, task: "KPI Analysis", dmsNo: "30000146", status: "In Progress" },
    ];

    const filteredTasks = tasks.filter((t) =>
        t.task.toLowerCase().includes(search.toLowerCase())
    );

    const formatTime = (hour24) => {
        const hour = hour24 % 12 === 0 ? 12 : hour24 % 12;
        const period = hour24 >= 12 ? "PM" : "AM";
        return `${hour}:00 ${period}`;
    };

    const handleMouseDown = (hour) => {
        setDragging(true);
        setDragStart(hour);
        setDragEnd(hour);
    };

    const handleMouseMove = (_, hour) => {
        if (dragging && hour !== dragEnd) {
            setDragEnd(hour);
        }
    };

    const handleMouseUp = () => {
        if (dragging) {
            setDragging(false);
            const start = Math.min(dragStart, dragEnd);
            const end = Math.max(dragStart, dragEnd) + 1;
            setTaskDetails({
                id: null,
                title: "",
                startHour: start,
                endHour: end,
                color: getRandomColor(),
            });
            setShowPopup(true);
            setSearch("");
        }
    };

    const handleSave = () => {
        // Ensure title is not empty
        if (!taskDetails.title || taskDetails.title.length === 0) {
            alert("Task title is required.");
            return;
        }

        // Check if the time slot already has a task (excluding the current task)
        const existingTask = events.find(
            (event) =>
                event.startHour === taskDetails.startHour &&
                event.endHour === taskDetails.endHour &&
                event.id !== taskDetails.id // Exclude the current task
        );

        // Check if any event already contains one of the task titles
        const existingTasks = events.find(
            (event) =>
                event.title.some((t) => taskDetails.title.includes(t)) && // Match if any of taskDetails.title matches
                event.id !== taskDetails.id // Exclude the current task
        );

        // Alert if task title is already used in any existing event
        if (existingTasks) {
            alert(`${taskDetails.title} already exists.`);
            return;
        }

        // Alert if the time slot is already taken
        if (existingTask) {
            alert(
                `A task already exists for this time slot: ${formatTime(
                    taskDetails.startHour
                )} - ${formatTime(
                    taskDetails.endHour
                )}. Please edit the existing task if you wish to make changes.`
            );
            return;
        }

        // Save the task details (either update existing task or add new one)
        if (taskDetails.id) {
            setEvents(events.map((e) => (e.id === taskDetails.id ? taskDetails : e)));
        } else {
            setEvents([...events, { ...taskDetails, id: Date.now() }]);
        }

        setShowPopup(false);
    };

    const handleCancel = () => {
        setShowPopup(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskDetails({
            ...taskDetails,
            [name]: name.includes("Hour") ? Number(value) : value,
        });
    };

    const handleEdit = (event) => {
        setTaskDetails(event);
        setShowPopup(true);
        setSearch("");
    };

    const handleDelete = (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this event?"
        );
        if (confirmDelete) {
            setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
            setShowPopup(false); // close popup if opened
            setTaskDetails({ title: [], startHour: 7, endHour: 8 }); // clear current task
        }
    };

    const handleTaskClick = (task) => {
        if (task.status === "Completed") {
            alert("Task already completed");
            return;
        }
        if (taskDetails.title.includes(task.task)) {
            alert("Task already selected");
            return;
        }
        setTaskDetails((prev) => ({
            ...prev,
            title: [...prev.title, task.task],
            color: prev.color || getRandomColor(),
        }));
        setSearch("");
    };

    const handleRemoveTitle = (indexToRemove) => {
        setTaskDetails((prevDetails) => ({
            ...prevDetails,
            title: prevDetails.title.filter((_, index) => index !== indexToRemove),
        }));
    };

    const isWithinSelectedRange = (hour) =>
        dragging &&
        hour >= Math.min(dragStart, dragEnd) &&
        hour <= Math.max(dragStart, dragEnd);

    const selectedTop = Math.min(dragStart ?? 7, dragEnd ?? 7) - 7;
    const selectedHeight = Math.abs((dragEnd ?? 7) - (dragStart ?? 7) + 1);

    const selectedMinute = 30;
    return (
        <div className="flex md:flex-row flex-col gap-1 w-full">
            {/* Sidebar */}
            <div className="flex flex-col  md:w-[30%] 2xl:w-[20%] h-[63vh] w-full overflow-y-scroll">
                <DayPicker
                    className="text-xs"
                    classNames={{ selected: "bg-blue-500 text-white rounded" }}
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                />
                <div>
                    <h2 className="text-sm sticky top-0 bg-gray-800 text-white p-2 mt-4 text-center font-semibold mb-2">
                        Pending Task
                    </h2>
                    {tasks &&
                        tasks.status !== "Completed" &&
                        tasks.map((task) => (
                            <div
                                key={task.id}
                                className="bg-gray-500 text-white rounded w-full p-2 mb-2 cursor-pointer"
                                onClick={() => handleTaskClick(task)}
                            >
                                <div className="text-sm text-center">{task.task}</div>
                            </div>
                        ))}
                </div>

            </div>

            {/* Main Sheet */}
            <div className="w-full p-2">
                <div className="rounded p-2 shadow-sm ">
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-xl font-semibold">
                            Time Sheet -{" "}
                            {selectedDate?.toLocaleDateString("en-US", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}
                        </h2>
                        <span className="text-sm text-gray-500">
                            Manage Your Time Efficiently
                        </span>
                    </div>
                    <div className="flex justify-between">
                        {minutes.map((minute, index) => (
                            <div className="p-2 w-full border text-xs" key={index}>
                                {minute}
                            </div>
                        ))}
                    </div>
                    <div
                        className="relative h-[50vh]  overflow-x-scroll overflow-y-scroll"
                        onMouseUp={handleMouseUp}
                    >
                        {dragging && (
                            <div
                                className="absolute left-24 right-32  bg-blue-800 opacity-20  rounded-lg pointer-events-none"
                                style={{
                                    top: `${selectedTop * rowHeight}px`,
                                    height: `${selectedHeight * rowHeight}px`,


                                }}
                            />
                        )}

                        {hours.map((hour) => {
                            const hourEvents = events.filter((e) => e.startHour === hour);

                            return (
                                <div
                                    key={hour}
                                    className={`flex items-center justify-between gap-3 w-full px-1 border-t relative w-full`}
                                    onMouseDown={() => handleMouseDown(hour)}
                                    onMouseMove={(e) => handleMouseMove(e, hour)}
                                >
                                    <span className="w-32 text-gray-600 pt-0 pb-9 font-medium text-lg">
                                        {formatTime(hour)}
                                    </span>
                                    {hourEvents.length ? (
                                        <div className="flex absolute top-0  left-[100px] w-full gap-2">
                                            {hourEvents.map((event) => {
                                                const duration = event.endHour - event.startHour;

                                                // Calculate selectedTop and selectedHeight for each event
                                                const selectedTop =
                                                    Math.min(event.startHour, event.endHour) - 7; // Adjusted starting point
                                                const selectedHeight = event.endHour - event.startHour; // Use the exact duration

                                                // Store the styles for each event
                                                const stylesArray = [
                                                    {
                                                        top: `${selectedTop * rowHeight}px`,
                                                        height: `${selectedHeight * rowHeight}px`, // Height is now the exact difference
                                                        width: `${200 * 100}px`,
                                                    },
                                                ];

                                                // Map styles array to JSX
                                                return stylesArray.map((style, index) => (
                                                    <div
                                                        key={event.id}
                                                        className={`flex flex-col md:flex-row justify-start md:justify-between overflow-hidden w-full z-10 p-2 w-full h-full rounded-lg shadow-lg ${event.color} border-none`}
                                                        style={{
                                                            top: style.top,
                                                            height: style.height,
                                                        }}
                                                        onClick={() => handleEdit(event)}
                                                    >
                                                        <div className="flex flex-col  text-black gap-2">
                                                            <span className="text-sm font-semibold">
                                                                {event.title.join(", ")}
                                                            </span>
                                                            <div className="flex flex-wrap gap-2 mb-2">
                                                                <span className="text-xs badge badge-sm border-0 w-fit opacity-60  bg-green-300 px-2 py-0.5 text-black font-semibold rounded">
                                                                    {formatTime(event.startHour)}
                                                                </span>
                                                                <span className="text-xs badge badge-sm border-0 w-fit opacity-60  bg-red-300 px-2 py-0.5 text-black font-semibold rounded">
                                                                    {formatTime(event.endHour)}
                                                                </span>
                                                                <div className="text-xs badge  badge-sm  border-0 bg-white opacity-50 rounded font-semibold  text-black">
                                                                    {duration} hour{duration > 1 ? "s" : ""}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ));
                                            })}
                                        </div>
                                    ) : (
                                        <span className="text-sm text-gray-400"></span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Popup */}
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-lg h-[80vh] overflow-y-scroll">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-lg text-gray-800 dark:text-white">
                                Add Task
                            </h3>

                            <div className="flex  justify-end gap-2">
                                <button
                                    className="btn btn-outline btn-sm"
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </button>

                                <button className="btn btn-success btn-sm" onClick={handleSave}>
                                    {taskDetails.id ? "Update" : "Save"}
                                </button>
                                {taskDetails.id ? (
                                    <button
                                        className="btn btn-error"
                                        onClick={() => handleDelete(taskDetails.id)}
                                    >
                                        Delete
                                    </button>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>

                        <input
                            type="text"
                            placeholder="Search or enter task title..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="input input-bordered w-full mb-3 text-gray-800 dark:text-white bg-white dark:bg-gray-700 input-sm"
                        />

                        {search ? (
                            filteredTasks.length > 0 ? (
                                <ul className="max-h-48 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-lg shadow-md bg-white dark:bg-gray-800 p-4">
                                    {filteredTasks.map((task) => (
                                        <li
                                            key={task.id}
                                            className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-4 py-3 rounded-lg 5"
                                            onClick={() => handleTaskClick(task)}
                                        >
                                            <div className="flex justify-between items-center">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-semibold text-gray-800 dark:text-white">
                                                        {task.task}
                                                    </span>
                                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                                        {task.dmsNo}
                                                    </span>
                                                </div>
                                                <span
                                                    className={`px-2 py-1 text-xs rounded-full ${task.status === "Completed"
                                                            ? "bg-green-200 text-green-800 dark:bg-green-600 dark:text-green-100"
                                                            : task.status === "Pending"
                                                                ? "bg-yellow-200 text-yellow-800 dark:bg-yellow-600 dark:text-yellow-100"
                                                                : "bg-red-200 text-red-800 dark:bg-red-600 dark:text-red-100"
                                                        }`}
                                                >
                                                    {task.status}
                                                </span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-center text-gray-500 p-2 bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                                    No tasks found
                                </p>
                            )
                        ) : (
                            <ul className="max-h-48 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-lg shadow-md bg-white dark:bg-gray-800">
                                {tasks.map((task) => (
                                    <li
                                        key={task.id}
                                        className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 p-2 rounded-lg"
                                        onClick={() => handleTaskClick(task)}
                                    >
                                        <div className="flex justify-between items-center">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-semibold text-gray-800 dark:text-white">
                                                    {task.task}
                                                </span>
                                                <span className="text-xs text-gray-600 dark:text-gray-400">
                                                    {task.dmsNo}
                                                </span>
                                            </div>
                                            <span
                                                className={`px-3  text-xs rounded-full ${task.status === "Completed"
                                                        ? "bg-green-200 text-green-800 dark:bg-green-600 dark:text-green-100"
                                                        : task.status === "Pending"
                                                            ? "bg-yellow-200 text-yellow-800 dark:bg-yellow-600 dark:text-yellow-100"
                                                            : "bg-red-200 text-red-800 dark:bg-red-600 dark:text-red-100"
                                                    }`}
                                            >
                                                {task.status}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}

                        <div className="flex gap-4">
                            {/* Start Time */}
                            <div className="flex gap-2 w-full">
                                <select
                                    name="startHour"
                                    value={taskDetails.startHour ?? ""}
                                    onChange={handleChange}
                                    className="select select-bordered w-1/2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                                >
                                    {hours.map((hour) => (
                                        <option key={hour} value={hour}>
                                            {formatTime(hour)}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    name="startMinute"
                                    value={taskDetails.startMinute ?? ""}
                                    onChange={handleChange}
                                    className="select select-bordered w-1/2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                                >
                                    {minutes.map((minute) => (
                                        <option key={minute} value={minute}>
                                            {minute.toString().padStart(2, '0')}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* End Time */}
                            <div className="flex gap-2 w-full">
                                <select
                                    name="endHour"
                                    value={taskDetails.endHour ?? ""}
                                    onChange={handleChange}
                                    className="select select-bordered w-1/2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                                >
                                    {hours.map((hour) => (
                                        <option key={hour} value={hour}>
                                            {formatTime(hour)}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    name="endMinute"
                                    value={taskDetails.endMinute ?? ""}
                                    onChange={handleChange}
                                    className="select select-bordered w-1/2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                                >
                                    {minutes.map((minute) => (
                                        <option key={minute} value={minute}>
                                            {minute.toString().padStart(2, '0')}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="h-[80px] overflow-y-scroll">
                            {taskDetails.title.length > 0 && (
                                <div className="flex flex-wrap gap-2  " key={taskDetails.id}>
                                    {taskDetails.title.map((title, index) => (
                                        <div
                                            className="flex items-center p-2 gap-2 bg-gray-100 dark:bg-gray-700 text-sm text-gray-800 dark:text-white rounded-full w-fit shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
                                            key={index}
                                        >
                                            <span className="truncate max-w-[200px]">{title}</span>
                                            <button
                                                className="btn btn-xs rounded-full bg-red-500 border-none text-white text-sm p-1 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-200 ease-in-out"
                                                onClick={() => handleRemoveTitle(index)}
                                            >
                                                <XIcon name="x" className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
