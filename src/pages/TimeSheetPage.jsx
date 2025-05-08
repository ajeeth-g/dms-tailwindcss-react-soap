import { AlertTriangleIcon, Rotate3DIcon, XIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useAuth } from "../context/AuthContext";

export default function TimeSheetPage() {
  const [tasks, setTasks] = useState([
    {
      TASK_ID: 1,
      TASK_NAME: "Material Management",
      dmsNo: "30000097",
      status: "Pending",
      PROJECT_NO: "P1001",
    },
    {
      TASK_ID: 2,
      TASK_NAME: "Audit Prep",
      dmsNo: "30000143",
      status: "Pending",
      PROJECT_NO: "P1002",
    },
    {
      TASK_ID: 3,
      TASK_NAME: "Equipment Setup",
      dmsNo: "30000144",
      status: "Completed",
      PROJECT_NO: "P1003",
    },
    {
      TASK_ID: 4,
      TASK_NAME: "Weekly Reporting",
      dmsNo: "30000145",
      status: "Pending",
      PROJECT_NO: "P1004",
    },
    {
      TASK_ID: 5,
      TASK_NAME: "KPI Analysis",
      dmsNo: "30000146",
      status: "In Progress",
      PROJECT_NO: "P1005",
    },
    {
      TASK_ID: 6,
      TASK_NAME: "Client Meeting",
      dmsNo: "30000147",
      status: "Pending",
      PROJECT_NO: "P1006",
    },
    {
      TASK_ID: 7,
      TASK_NAME: "Code Review",
      dmsNo: "30000148",
      status: "In Progress",
      PROJECT_NO: "P1007",
    },
    {
      TASK_ID: 8,
      TASK_NAME: "Project Planning",
      dmsNo: "30000149",
      status: "Completed",
      PROJECT_NO: "P1008",
    },
    {
      TASK_ID: 9,
      TASK_NAME: "Risk Assessment",
      dmsNo: "30000150",
      status: "Pending",
      PROJECT_NO: "P1009",
    },
    {
      TASK_ID: 10,
      TASK_NAME: "Staff Training",
      dmsNo: "30000151",
      status: "Completed",
      PROJECT_NO: "P1010",
    },
    {
      TASK_ID: 11,
      TASK_NAME: "Budget Review",
      dmsNo: "30000152",
      status: "In Progress",
      PROJECT_NO: "P1011",
    },
    {
      TASK_ID: 12,
      TASK_NAME: "Quality Check",
      dmsNo: "30000153",
      status: "Pending",
      PROJECT_NO: "P1012",
    },
    {
      TASK_ID: 13,
      TASK_NAME: "Document Filing",
      dmsNo: "30000154",
      status: "In Progress",
      PROJECT_NO: "P1013",
    },
    {
      TASK_ID: 14,
      TASK_NAME: "Maintenance",
      dmsNo: "30000155",
      status: "Completed",
      PROJECT_NO: "P1014",
    },
    {
      TASK_ID: 15,
      TASK_NAME: "Compliance Check",
      dmsNo: "30000156",
      status: "Pending",
      PROJECT_NO: "P1015",
    },
    {
      TASK_ID: 16,
      TASK_NAME: "Vendor Negotiation",
      dmsNo: "30000157",
      status: "In Progress",
      PROJECT_NO: "P1016",
    },
    {
      TASK_ID: 17,
      TASK_NAME: "System Upgrade",
      dmsNo: "30000158",
      status: "Completed",
      PROJECT_NO: "P1017",
    },
    {
      TASK_ID: 18,
      TASK_NAME: "Client Follow-Up",
      dmsNo: "30000159",
      status: "Pending",
      PROJECT_NO: "P1018",
    },
    {
      TASK_ID: 19,
      TASK_NAME: "Software Update",
      dmsNo: "30000160",
      status: "In Progress",
      PROJECT_NO: "P1019",
    },
    {
      TASK_ID: 20,
      TASK_NAME: "Marketing Campaign",
      dmsNo: "30000161",
      status: "Completed",
      PROJECT_NO: "P1020",
    },
    {
      TASK_ID: 21,
      TASK_NAME: "Customer Support",
      dmsNo: "30000162",
      status: "Pending",
      PROJECT_NO: "P1021",
    },
    {
      TASK_ID: 22,
      TASK_NAME: "Performance Review",
      dmsNo: "30000163",
      status: "In Progress",
      PROJECT_NO: "P1022",
    },
    {
      TASK_ID: 23,
      TASK_NAME: "Data Analysis",
      dmsNo: "30000164",
      status: "Completed",
      PROJECT_NO: "P1023",
    },
    {
      TASK_ID: 24,
      TASK_NAME: "Team Collaboration",
      dmsNo: "30000165",
      status: "Pending",
      PROJECT_NO: "P1024",
    },
    {
      TASK_ID: 25,
      TASK_NAME: "Legal Compliance",
      dmsNo: "30000166",
      status: "In Progress",
      PROJECT_NO: "P1025",
    },
    {
      TASK_ID: 26,
      TASK_NAME: "Server Maintenance",
      dmsNo: "30000167",
      status: "Completed",
      PROJECT_NO: "P1026",
    },
    {
      TASK_ID: 27,
      TASK_NAME: "Marketing Research",
      dmsNo: "30000168",
      status: "Pending",
      PROJECT_NO: "P1027",
    },
    {
      TASK_ID: 28,
      TASK_NAME: "Project Audit",
      dmsNo: "30000169",
      status: "In Progress",
      PROJECT_NO: "P1028",
    },
    {
      TASK_ID: 29,
      TASK_NAME: "Task Allocation",
      dmsNo: "30000170",
      status: "Completed",
      PROJECT_NO: "P1029",
    },
    {
      TASK_ID: 30,
      TASK_NAME: "Document Review",
      dmsNo: "30000171",
      status: "Pending",
      PROJECT_NO: "P1030",
    },
    {
      TASK_ID: 31,
      TASK_NAME: "Internal Audit",
      dmsNo: "30000172",
      status: "In Progress",
      PROJECT_NO: "P1031",
    },
    {
      TASK_ID: 32,
      TASK_NAME: "Product Development",
      dmsNo: "30000173",
      status: "Completed",
      PROJECT_NO: "P1032",
    },
    {
      TASK_ID: 33,
      TASK_NAME: "Customer Feedback",
      dmsNo: "30000174",
      status: "Pending",
      PROJECT_NO: "P1033",
    },
    {
      TASK_ID: 34,
      TASK_NAME: "Supply Chain Management",
      dmsNo: "30000175",
      status: "In Progress",
      PROJECT_NO: "P1034",
    },
    {
      TASK_ID: 35,
      TASK_NAME: "Training Session",
      dmsNo: "30000176",
      status: "Completed",
      PROJECT_NO: "P1035",
    },
    {
      TASK_ID: 36,
      TASK_NAME: "Documentation",
      dmsNo: "30000177",
      status: "Pending",
      PROJECT_NO: "P1036",
    },
    {
      TASK_ID: 37,
      TASK_NAME: "Product Testing",
      dmsNo: "30000178",
      status: "In Progress",
      PROJECT_NO: "P1037",
    },
    {
      TASK_ID: 38,
      TASK_NAME: "Team Meeting",
      dmsNo: "30000179",
      status: "Completed",
      PROJECT_NO: "P1038",
    },
    {
      TASK_ID: 39,
      TASK_NAME: "Issue Resolution",
      dmsNo: "30000180",
      status: "Pending",
      PROJECT_NO: "P1039",
    },
    {
      TASK_ID: 40,
      TASK_NAME: "Data Backup",
      dmsNo: "30000181",
      status: "In Progress",
      PROJECT_NO: "P1040",
    },
    {
      TASK_ID: 41,
      TASK_NAME: "System Testing",
      dmsNo: "30000182",
      status: "Completed",
      PROJECT_NO: "P1041",
    },
    {
      TASK_ID: 42,
      TASK_NAME: "Conference Preparation",
      dmsNo: "30000183",
      status: "Pending",
      PROJECT_NO: "P1042",
    },
    {
      TASK_ID: 43,
      TASK_NAME: "Employee Onboarding",
      dmsNo: "30000184",
      status: "In Progress",
      PROJECT_NO: "P1043",
    },
    {
      TASK_ID: 44,
      TASK_NAME: "Project Reporting",
      dmsNo: "30000185",
      status: "Completed",
      PROJECT_NO: "P1044",
    },
    {
      TASK_ID: 45,
      TASK_NAME: "Product Launch",
      dmsNo: "30000186",
      status: "Pending",
      PROJECT_NO: "P1045",
    },
    {
      TASK_ID: 46,
      TASK_NAME: "Customer Outreach",
      dmsNo: "30000187",
      status: "In Progress",
      PROJECT_NO: "P1046",
    },
    {
      TASK_ID: 47,
      TASK_NAME: "Vendor Follow-Up",
      dmsNo: "30000188",
      status: "Completed",
      PROJECT_NO: "P1047",
    },
    {
      TASK_ID: 48,
      TASK_NAME: "System Optimization",
      dmsNo: "30000189",
      status: "Pending",
      PROJECT_NO: "P1048",
    },
    {
      TASK_ID: 49,
      TASK_NAME: "Operational Review",
      dmsNo: "30000190",
      status: "In Progress",
      PROJECT_NO: "P1049",
    },
    {
      TASK_ID: 50,
      TASK_NAME: "Final Report",
      dmsNo: "30000191",
      status: "Completed",
      PROJECT_NO: "P1050",
    },
  ]);
  const colorClasses = [
    "bg-blue-200 opacity-70",
    "bg-green-200 opacity-70",
    "bg-yellow-200 opacity-70",
    "bg-red-200 opacity-70",
    "bg-purple-200 opacity-70",
    "bg-pink-200 opacity-70",
    "bg-indigo-200 opacity-70",
    "bg-teal-200 opacity-70",
  ];
  const getRandomColor = () =>
    colorClasses[Math.floor(Math.random() * colorClasses.length)];

  const { userData } = useAuth();
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [selectedTask, setSelectedTask] = useState(null);
  const [timesheetsByDate, setTimesheetsByDate] = useState({});
  const [events, setEvents] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [taskDetails, setTaskDetails] = useState({
    TASK_ID: "",
    TASK_NAME: "",
    START_TIME: 7,
    startMinute: "00",
    END_TIME: 8,
    endMinute: "00",
    NO_OF_HOURS: "",
    NO_OF_MINUTES: "",
    PROJECT_NO: "",
    color: getRandomColor(),
  });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const datePickerRef = useRef(null);
  const [resizingEvent, setResizingEvent] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [dragEnd, setDragEnd] = useState(null);

  const hours = Array.from({ length: 12 }, (_, i) => 7 + i); // 7 AM to 6 PM
  const minutes = ["00", "15", "30", "45"];
  const rowHeight = 64; // 1 hour = 64px
  const minuteWidth = 100 / 67.3; // Each minute = 1.6667% of width inside 1 hour block

  useEffect(() => {
    const dateKey = formatDateKey(selectedDate);
    // Reset events for the new date
    setEvents(timesheetsByDate[dateKey] || []);
  }, [selectedDate, timesheetsByDate]);
  // Helper function to format date as YYYY-MM-DD
  const formatDateKey = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const updateEventInStorage = (updatedEvent) => {
    const dateKey = formatDateKey(selectedDate);

    // Update timesheetsByDate
    setTimesheetsByDate((prev) => ({
      ...prev,
      [dateKey]: (prev[dateKey] || []).map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      ),
    }));

    // Update events state
    setEvents((prev) =>
      prev.map((event) => (event.id === updatedEvent.id ? updatedEvent : event))
    );
  };
  const openDatePicker = () => {
    if (datePickerRef.current) {
      datePickerRef.current.showModal();
    }
  };

  const formatTime = (hour, minute) => {
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    const displayMinute = minute.toString().padStart(2, "0");
    return `${displayHour}:${displayMinute} ${ampm}`;
  };

  function calculateDuration(START_TIME, startMinute, END_TIME, endMinute) {
    const startTotalMinutes =
      parseInt(START_TIME, 10) * 60 + parseInt(startMinute, 10);
    const endTotalMinutes =
      parseInt(END_TIME, 10) * 60 + parseInt(endMinute, 10);
    const duration = endTotalMinutes - startTotalMinutes;
    return duration > 0 ? duration : 0;
  }

  function formatDuration(durationInMinutes) {
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;
    return `${hours} hr ${minutes} min`;
  }

  const handleEdit = (e, event) => {
    e.preventDefault();
    if (!event) return;
    setTaskDetails(event);
    const foundTask = tasks.find((task) => task.TASK_NAME === event.TASK_NAME);
    setSelectedTask(foundTask || null);
    setShowPopup(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const taskTitle = selectedTask
      ? selectedTask.TASK_NAME
      : taskDetails.TASK_NAME;

    if (!taskTitle) {
      alert("Task name is required.");
      return;
    }

    const {
      START_TIME = 0,
      startMinute = 0,
      END_TIME = 0,
      endMinute = 0,
    } = taskDetails;

    const startMins = parseInt(START_TIME) * 60 + parseInt(startMinute);
    const endMins = parseInt(END_TIME) * 60 + parseInt(endMinute);

    if (startMins >= endMins) {
      alert("End time must be after start time.");
      return;
    }

    let TASK_ID =
      taskDetails.TASK_ID || (selectedTask ? selectedTask.TASK_ID : null);
    let PROJECT_NO =
      taskDetails.PROJECT_NO || (selectedTask ? selectedTask.PROJECT_NO : null);
    let dmsNo = taskDetails.dmsNo || (selectedTask ? selectedTask.dmsNo : null);

    // Check if task already exists
    const taskAlreadyExists = events.some(
      (event) => event.TASK_NAME === taskTitle && event.id !== taskDetails.id
    );
    if (taskAlreadyExists) {
      alert("This task is already scheduled in the calendar.");
      return;
    }

    // Check for overlapping events
    const overlappingEvent = events.some((event) => {
      if (event.id === taskDetails.id) return false;
      const eventStart = event.START_TIME * 60 + event.startMinute;
      const eventEnd = event.END_TIME * 60 + event.endMinute;
      return startMins < eventEnd && endMins > eventStart;
    });

    if (overlappingEvent) {
      alert("This time slot overlaps with another event.");
      return;
    }

    // Calculate duration
    const NO_OF_MINUTES = calculateDuration(
      START_TIME,
      startMinute,
      END_TIME,
      endMinute
    );
    const NO_OF_HOURS = parseFloat((NO_OF_MINUTES / 60).toFixed(2));

    // Use the selected date directly
    const TRANS_DATE = formatDateKey(selectedDate);

    // Create the updated event object
    const updatedEvent = {
      id: taskDetails.id || Date.now(),
      TASK_NAME: taskTitle,
      TASK_ID,
      PROJECT_NO,
      dmsNo,
      START_TIME: parseInt(START_TIME),
      startMinute: parseInt(startMinute),
      END_TIME: parseInt(END_TIME),
      endMinute: parseInt(endMinute),
      color: taskDetails.color || getRandomColor(),
      USER_NAME: userData?.currentUserName || "",
      EMP_NO: userData?.currentUserEmpNo || "",
      NO_OF_HOURS,
      NO_OF_MINUTES,
      TRANS_DATE, // Use the properly formatted date
    };

    const dateKey = formatDateKey(selectedDate);

    setTimesheetsByDate((prev) => {
      const currentDateEvents = prev[dateKey] || [];
      const eventExists = currentDateEvents.some(
        (e) => e.id === updatedEvent.id
      );

      const updatedEvents = eventExists
        ? currentDateEvents.map((e) =>
            e.id === updatedEvent.id ? updatedEvent : e
          )
        : [...currentDateEvents, updatedEvent];

      return {
        ...prev,
        [dateKey]: updatedEvents,
      };
    });
    setEvents((prevEvents) => {
      const eventExists = prevEvents.some((e) => e.id === updatedEvent.id);
      return eventExists
        ? prevEvents.map((e) => (e.id === updatedEvent.id ? updatedEvent : e))
        : [...prevEvents, updatedEvent];
    });

    handleClosePopup();
    setSelectedTask(null);
  };

  const handleSelectTask = (e, task) => {
    e.preventDefault();
    setSelectedTask(task);
    setTaskDetails((prev) => ({
      ...prev,
      TASK_NAME: task.TASK_NAME,
      TASK_ID: task.TASK_ID,
      PROJECT_NO: task.PROJECT_NO,
      dmsNo: task.dmsNo,
    }));
  };

  const handleDrop = (e, hour) => {
    e.preventDefault();

    const taskData = e.dataTransfer.getData("task");
    if (!taskData) return;

    const task = JSON.parse(taskData);

    const taskAlreadyExists = events.some(
      (event) => event.TASK_NAME === task.TASK_NAME
    );
    if (taskAlreadyExists) {
      alert("This task is already scheduled in the calendar.");
      return;
    }

    const boundingRect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - boundingRect.left;
    const width = boundingRect.width;

    const minuteOffset = Math.floor((mouseX / width) * 60);
    let startMinute = Math.floor(minuteOffset / 15) * 15;

    let START_TIME = hour;
    let endMinute = startMinute + 15;
    let END_TIME = START_TIME;

    if (endMinute >= 60) {
      endMinute = 0;
      END_TIME += 1;
    }

    if (START_TIME < 7 || END_TIME > 18 || (END_TIME === 18 && endMinute > 0)) {
      alert("Tasks can only be scheduled between 7 AM and 6 PM.");
      return;
    }

    const startMinutes = START_TIME * 60 + startMinute;
    const endMinutes = END_TIME * 60 + endMinute;

    const overlappingEvent = events.some((event) => {
      const eventStart = event.START_TIME * 60 + event.startMinute;
      const eventEnd = event.END_TIME * 60 + event.endMinute;
      return startMinutes < eventEnd && endMinutes > eventStart;
    });

    if (overlappingEvent) {
      alert("This time slot overlaps with another event.");
      return;
    }

    const totalMinutes = endMinutes - startMinutes;
    const NO_OF_HOURS = parseFloat((totalMinutes / 60).toFixed(2));
    const NO_OF_MINUTES = totalMinutes;

    const TRANS_DATE = formatDateKey(selectedDate);
    const dateKey = formatDateKey(selectedDate);
    const newEvent = {
      id: Date.now(),
      TASK_ID: task.TASK_ID,
      TASK_NAME: task.TASK_NAME,
      PROJECT_NO: task.PROJECT_NO,
      dmsNo: task.dmsNo,
      START_TIME,
      startMinute,
      END_TIME,
      endMinute,
      color: getRandomColor(),
      USER_NAME: userData?.currentUserName || "",
      EMP_NO: userData?.currentUserEmpNo || "",
      NO_OF_HOURS,
      NO_OF_MINUTES,
      TRANS_DATE, // Use the properly formatted date
    };

    setTimesheetsByDate((prev) => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), newEvent],
    }));

    setEvents((prev) => [...prev, newEvent]);
  };

  const handleDelete = (eventId) => {
    const dateKey = formatDateKey(selectedDate);

    // Update timesheetsByDate
    setTimesheetsByDate((prev) => ({
      ...prev,
      [dateKey]: (prev[dateKey] || []).filter((event) => event.id !== eventId),
    }));

    // Update events state
    setEvents((prev) => prev.filter((event) => event.id !== eventId));

    handleClosePopup();
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setTaskDetails({
      TASK_ID: "",
      TASK_NAME: "",
      START_TIME: 7,
      startMinute: "00",
      END_TIME: 8,
      endMinute: "00",
      color: getRandomColor(),
    });
    setSelectedTask(null);
  };

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    const filtered = tasks.filter((task) =>
      task.TASK_NAME.toLowerCase().includes(keyword)
    );
    setFilteredTasks(filtered);
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
        TASK_NAME: "",
        START_TIME: start,
        startMinute: "00",
        END_TIME: end,
        endMinute: "00",
        color: getRandomColor(),
      });
      setShowPopup(true);
    }
  };

  const handleDragStart = (e, task) => {
    e.dataTransfer.setData("task", JSON.stringify(task));
  };

  const getPositionBlocks = (event) => {
    const startTotalMinutes =
      (event.START_TIME - 7) * 60 + parseInt(event.startMinute);
    const endTotalMinutes =
      (event.END_TIME - 7) * 60 + parseInt(event.endMinute);

    const blocks = [];
    let currentStartMinutes = startTotalMinutes;

    while (currentStartMinutes < endTotalMinutes) {
      const row = Math.floor(currentStartMinutes / 60);
      const minuteInHour = currentStartMinutes % 60;

      const blockStart = currentStartMinutes;
      const blockEnd = Math.min((row + 1) * 60, endTotalMinutes);

      const durationInThisBlock = blockEnd - blockStart;

      const top = row * rowHeight;
      const left = minuteInHour * minuteWidth;
      const width = durationInThisBlock * minuteWidth;
      const height = rowHeight;

      blocks.push({ top, left, width, height });

      currentStartMinutes = blockEnd;
    }

    return blocks;
  };

  const STEP = 15; // minutes snap step
  const START_OF_DAY = 7 * 60; // 7:00 AM in minutes
  const END_OF_DAY = 18 * 60; // 6:00 PM in minutes

  const checkOverlap = (newStartMinutes, newEndMinutes, currentEventId) => {
    return events.some((event) => {
      if (event.id === currentEventId) return false;
      const eventStart = event.START_TIME * 60 + event.startMinute;
      const eventEnd = event.END_TIME * 60 + event.endMinute;
      return newStartMinutes < eventEnd && newEndMinutes > eventStart;
    });
  };

  const handleRightResizeMouseDown = (e, targetEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const initialY = e.clientY;
    const initialEndHour = targetEvent.END_TIME;
    const initialEndMinute = targetEvent.endMinute;
    const initialStartHour = targetEvent.START_TIME;
    const initialStartMinute = targetEvent.startMinute;

    setResizingEvent({
      eventId: targetEvent.id,
      direction: "right",
    });

    document.body.style.cursor = "e-resize";

    const onMouseMove = (moveEvent) => {
      const deltaY = moveEvent.clientY - initialY;
      const pixelsPerMinute = rowHeight / 60;
      const movedMinutes = Math.round(deltaY / pixelsPerMinute);
      const deltaStepMinutes = Math.round(movedMinutes / STEP) * STEP;

      const startTotalMinutes = initialStartHour * 60 + initialStartMinute;
      let newEndTotalMinutes =
        initialEndHour * 60 + initialEndMinute + deltaStepMinutes;

      if (newEndTotalMinutes <= startTotalMinutes + STEP) {
        newEndTotalMinutes = startTotalMinutes + STEP;
      }
      if (newEndTotalMinutes > END_OF_DAY) {
        newEndTotalMinutes = END_OF_DAY;
      }

      if (checkOverlap(startTotalMinutes, newEndTotalMinutes, targetEvent.id)) {
        return;
      }

      const newEndHour = Math.floor(newEndTotalMinutes / 60);
      const newEndMinute = newEndTotalMinutes % 60;

      const updatedEvent = {
        ...targetEvent,
        END_TIME: newEndHour,
        endMinute: newEndMinute,
        NO_OF_MINUTES: newEndTotalMinutes - startTotalMinutes,
        NO_OF_HOURS: parseFloat(
          ((newEndTotalMinutes - startTotalMinutes) / 60).toFixed(2)
        ),
      };

      updateEventInStorage(updatedEvent);
    };

    const onMouseUp = () => {
      setResizingEvent(null);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.body.style.cursor = "default";
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const handleLeftResizeMouseDown = (e, targetEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const initialX = e.clientX;
    const initialStartHour = targetEvent.START_TIME;
    const initialStartMinute = targetEvent.startMinute;
    const initialEndHour = targetEvent.END_TIME;
    const initialEndMinute = targetEvent.endMinute;

    setResizingEvent({
      eventId: targetEvent.id,
      direction: "left",
    });

    document.body.style.cursor = "w-resize";

    const onMouseMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - initialX;
      const pixelsPerMinute = rowHeight / 60;
      const movedMinutes = Math.round(deltaX / pixelsPerMinute);
      const deltaStepMinutes = Math.round(movedMinutes / STEP) * STEP;

      const startTotalMinutes = initialStartHour * 60 + initialStartMinute;
      const endTotalMinutes = initialEndHour * 60 + initialEndMinute;
      let newStartTotalMinutes = startTotalMinutes + deltaStepMinutes;

      if (newStartTotalMinutes >= endTotalMinutes - STEP) {
        newStartTotalMinutes = endTotalMinutes - STEP;
      }
      if (newStartTotalMinutes < START_OF_DAY) {
        newStartTotalMinutes = START_OF_DAY;
      }

      if (checkOverlap(newStartTotalMinutes, endTotalMinutes, targetEvent.id)) {
        return;
      }

      const newStartHour = Math.floor(newStartTotalMinutes / 60);
      const newStartMinute = newStartTotalMinutes % 60;

      const updatedEvent = {
        ...targetEvent,
        START_TIME: newStartHour,
        startMinute: newStartMinute,
        NO_OF_MINUTES: endTotalMinutes - newStartTotalMinutes,
        NO_OF_HOURS: parseFloat(
          ((endTotalMinutes - newStartTotalMinutes) / 60).toFixed(2)
        ),
      };

      updateEventInStorage(updatedEvent);
    };

    const onMouseUp = () => {
      setResizingEvent(null);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.body.style.cursor = "default";
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const handleDragMouseDown = (e, targetEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const initialY = e.clientY;
    const START_TIME = targetEvent.START_TIME;
    const startMinute = targetEvent.startMinute;
    const END_TIME = targetEvent.END_TIME;
    const endMinute = targetEvent.endMinute;

    const initialStartMinutes = START_TIME * 60 + startMinute;
    const initialEndMinutes = END_TIME * 60 + endMinute;

    setResizingEvent({
      eventId: targetEvent.id,
      direction: "move",
    });

    document.body.style.cursor = "grabbing";

    const onMouseMove = (moveEvent) => {
      const deltaY = moveEvent.clientY - initialY;
      const pixelsPerMinute = rowHeight / 60;
      const movedMinutes = Math.round(deltaY / pixelsPerMinute);
      const deltaStepMinutes = Math.round(movedMinutes / STEP) * STEP;

      let newStartMinutes = initialStartMinutes + deltaStepMinutes;
      let newEndMinutes = initialEndMinutes + deltaStepMinutes;

      const duration = initialEndMinutes - initialStartMinutes;

      if (newStartMinutes < START_OF_DAY) {
        newStartMinutes = START_OF_DAY;
        newEndMinutes = START_OF_DAY + duration;
      }
      if (newEndMinutes > END_OF_DAY) {
        newEndMinutes = END_OF_DAY;
        newStartMinutes = END_OF_DAY - duration;
      }

      if (checkOverlap(newStartMinutes, newEndMinutes, targetEvent.id)) {
        return;
      }

      const newStartHour = Math.floor(newStartMinutes / 60);
      const newStartMinute = newStartMinutes % 60;
      const newEndHour = Math.floor(newEndMinutes / 60);
      const newEndMinute = newEndMinutes % 60;

      const updatedEvent = {
        ...targetEvent,
        START_TIME: newStartHour,
        startMinute: newStartMinute,
        END_TIME: newEndHour,
        endMinute: newEndMinute,
      };

      updateEventInStorage(updatedEvent);
    };

    const onMouseUp = () => {
      setResizingEvent(null);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.body.style.cursor = "default";
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  return (
    <>
      <form>
        <div className="flex w-full flex-col md:flex-row">
          {/* Sidebar */}
          <div className="w-full md:w-[20%] h-[60vh]  text-xs overflow-y-scroll ">
            <div className="mt-4 mb-2 w-full sticky top-0  z-10 md:w-[100%]">
              <h3 className="text-sm rounded font-bold text-center border  border-gray-300 p-2">
                Pending Task
              </h3>
            </div>
            {tasks.filter(
              (task) =>
                task.status !== "Completed" &&
                !events.some((event) => event.TASK_NAME === task.TASK_NAME)
            ).length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No pending tasks
              </div>
            ) : (
              tasks
                .filter(
                  (task) =>
                    task.status !== "Completed" &&
                    !events.some((event) => event.TASK_NAME === task.TASK_NAME)
                )
                .map((task) => (
                  <div
                    key={task.TASK_ID}
                    className="flex items-center mb-1 justify-between p-3 border border-gray-400   hover:bg-blue-100 transition-all duration-300 rounded-md shadow-sm hover:shadow-md cursor-pointer"
                    draggable
                    onDragStart={(e) => handleDragStart(e, task)}
                  >
                    <div className="flex items-center  gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
                      <p className="font-medium ">{task.TASK_NAME}</p>
                    </div>
                  </div>
                ))
            )}
          </div>

          {/* Main Area */}
          <div className="flex-1 h-[60vh] overflow-y-scroll">
            <div className="rounded-xl shadow-lg p-6 pt-3 relative">
              {/* Header */}
              <div className="flex items-center gap-2 mb-6">
                <h2 className="text-3xl tracking-wider font-bold">
                  Time Sheet -{" "}
                  {selectedDate?.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </h2>

                <button
                  type="button"
                  className="btn btn-sm mt-1 shadow-lg btn-outline"
                  onClick={openDatePicker}
                >
                  Change Date <Rotate3DIcon className="w-4 h-4 ml-1" />
                </button>

                {/* Date Picker Modal */}
                <dialog ref={datePickerRef} className="modal">
                  <div className="modal-box w-[350px]">
                    <div method="dialog">
                      <button
                        type="button"
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={() => datePickerRef.current.close()}
                      >
                        ✕
                      </button>
                    </div>
                    <DayPicker
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => {
                        setSelectedDate(date);
                        datePickerRef.current.close();
                      }}
                      className="rounded-lg mt-2 text-xs"
                      classNames={{
                        selected: "bg-blue-500 text-white rounded",
                      }}
                    />
                  </div>
                </dialog>
              </div>

              {/* Minutes as Top Labels */}
              <div className="flex mb-2">
                <div className="w-[100px]" />
                <div className="flex-1 grid grid-cols-4 gap-1">
                  {minutes.map((min, index) => {
                    const nextMin = minutes[index + 1] || "60";
                    return (
                      <div
                        key={min}
                        className="text-center border border-gray-400  font-semibold text-xs p-1 rounded"
                      >
                        {min}m - {nextMin}m
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Hours and Minute Blocks */}
              <div className="relative">
                {hours.map((hour) => (
                  <div
                    key={hour}
                    className="flex border-t border-b  border-gray-300 relative"
                    style={{ height: `${rowHeight}px` }}
                    onMouseDown={() => handleMouseDown(hour)}
                    onMouseMove={(e) => handleMouseMove(e, hour)}
                    onMouseUp={handleMouseUp}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDrop(e, hour)}
                  >
                    {/* Hour Label */}
                    <div className="w-[100px] flex items-center justify-center  text-sm font-semibold text-gray-700">
                      {formatTime(hour, "00")}
                    </div>

                    {/* Minute Blocks */}
                    <div className="flex-1 grid grid-cols-4 gap-1">
                      {minutes.map((_, i) => (
                        <div key={i} className="h-full transition" />
                      ))}
                    </div>
                  </div>
                ))}

                {/* Render Events */}
                {events.map((event, index) => {
                  const blocks = getPositionBlocks(event);

                  return blocks.map((block, blockIndex) => (
                    <div
                      key={`${event.id}-${index}-${blockIndex}`}
                      className={`absolute p-2 rounded-md shadow-md  flex justify-between items-start text-sm overflow-hidden transition-all duration-200 ease-in-out group ${
                        event.color
                      } ${
                        resizingEvent?.eventId === event.id
                          ? "cursor-grabbing"
                          : "cursor-pointer"
                      }`}
                      style={{
                        top: `${block.top}px`,
                        left: `calc(100px + ${block.left}%)`,
                        width: `${block.width}%`,
                        height: `${block.height}px`,
                      }}
                      onMouseDown={(e) => handleDragMouseDown(e, event)}
                      onDoubleClick={(e) => handleEdit(e, event)}
                      title="Double click to edit"
                    >
                      {/* Event Info */}
                      <div
                        className="flex-1 pr-2 cursor-pointer"
                        onClick={(e) => {
                          // Prevent single click from triggering if it's part of a double click
                          if (e.detail > 1) return;
                          // Handle single click if needed
                        }}
                      >
                        <div>
                          <span className="text-xs font-semibold text-black">
                            {event.TASK_NAME}{" "}
                          </span>
                          <span className="text-xs text-black">
                            ({formatTime(event.START_TIME, event.startMinute)} -{" "}
                            {formatTime(event.END_TIME, event.endMinute)})
                          </span>
                        </div>
                        <div>
                          <span className="text-xs text-black">
                            Duration:{" "}
                            {formatDuration(
                              calculateDuration(
                                event.START_TIME,
                                event.startMinute,
                                event.END_TIME,
                                event.endMinute
                              )
                            )}
                          </span>
                        </div>
                      </div>

                      {/* Delete Button */}
                      <div className="flex flex-col gap-1">
                        <button
                          className="text-gray-600 hover:text-red-600 transition-colors text-xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(event.id, event);
                          }}
                        >
                          <XIcon
                            size={18}
                            className="hover:bg-red-400 rounded-full p-1"
                          />
                        </button>
                      </div>

                      {/* Left Resize Handle */}
                      <div
                        className="absolute top-0 bottom-0 left-0 w-2 bg-transparent hover:bg-gray-400 cursor-ew-resize"
                        onMouseDown={(e) => handleLeftResizeMouseDown(e, event)}
                      />

                      {/* Right Resize Handle */}
                      <div
                        className="absolute top-0 bottom-0 right-0 w-2 bg-transparent hover:bg-gray-400 cursor-ew-resize"
                        onMouseDown={(e) =>
                          handleRightResizeMouseDown(e, event)
                        }
                      />

                      {/* Tooltip (shown on hover) */}
                      <div className="absolute -top-8 left-0  text-black text-xs px-2 py-1 rounded-md pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity rounded-md ">
                        Double click to edit event
                      </div>
                    </div>
                  ));
                })}
              </div>
            </div>
          </div>

          {/* Popup Modal */}
          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-base-100 rounded-lg shadow-lg p-6 w-full max-w-sm h-[500px] overflow-y-scroll">
                {" "}
                {/* Smaller centered popup */}
                <div className="flex justify-between sticky top-0 bg-base-100 p-2 items-center mb-4">
                  <h3 className="font-bold text-sm">
                    {taskDetails.id ? "Update Task" : "Add Task"}
                  </h3>
                  <div className="flex gap-2">
                    {taskDetails.id && (
                      <button
                        className="btn btn-error btn-xs"
                        onClick={() => handleDelete(taskDetails.id)}
                      >
                        Delete
                      </button>
                    )}
                    <button
                      className="btn btn-outline btn-xs"
                      onClick={() => setShowPopup(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-primary btn-xs"
                      onClick={handleSave}
                    >
                      {taskDetails.id ? "Update" : "Save"}
                    </button>
                  </div>
                </div>
                {/* Search Task Input */}
                <div className="form-control mb-4">
                  <input
                    type="text"
                    value={taskDetails.TASK_NAME}
                    placeholder="Search For A Task..."
                    onChange={(e) => {
                      setTaskDetails({
                        ...taskDetails,
                        TASK_NAME: e.target.value,
                      });
                      handleSearch(e);
                    }}
                    className="input input-bordered input-md w-full text-sm input-sm"
                  />
                </div>
                {/* Task Selection */}
                {filteredTasks.filter((task) => task.status !== "Completed")
                  .length > 0 ? (
                  <ul className="bg-base-200 text-xs rounded-lg p-1 mb-4 h-36 overflow-y-scroll space-y-2">
                    {filteredTasks
                      .filter((task) => task.status !== "Completed")
                      .map((task) => (
                        <li key={task.id}>
                          <button
                            className={`flex justify-between text-xs items-center w-full p-2 rounded-lg hover:bg-blue-50 ${
                              selectedTask?.id === task.id
                                ? "bg-blue-100"
                                : "bg-transparent"
                            }`}
                            onClick={(e) => handleSelectTask(e, task)}
                          >
                            <div className="flex flex-col text-left text-xs">
                              <span className="font-semibold">
                                {task.TASK_NAME}
                              </span>
                              <span className="text-xs text-gray-500">{`DMS No: ${task.dmsNo}`}</span>
                            </div>
                            <div
                              className={`flex items-center space-x-1 text-xs font-semibold py-1 px-2 rounded-full ${
                                task.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : task.status === "In Progress"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              <span className="text-xs">{task.status}</span>
                              <AlertTriangleIcon className="w-3 h-3" />
                            </div>
                          </button>
                        </li>
                      ))}
                  </ul>
                ) : (
                  <div className="bg-base-200 rounded-lg p-4 mb-4 h-48 flex items-center justify-center text-gray-500">
                    No tasks available
                  </div>
                )}
                {/* Time Inputs */}
                <div className="flex justify-between flex-col gap-2">
                  {/* Start Time */}
                  <div className="flex-1">
                    <label className="label text-sm">
                      <span className="label-text">Start Time</span>
                    </label>
                    <div className="flex items-center gap-2">
                      {/* Hour Input */}
                      <div className="flex flex-col w-1/2">
                        <select
                          className="select select-bordered select-sm w-full text-sm"
                          value={taskDetails.START_TIME || "00"}
                          onChange={(e) => {
                            const hour24 = Number(e.target.value);
                            const suffix = hour24 >= 12 ? "PM" : "AM";
                            const hour12 =
                              hour24 > 12
                                ? hour24 - 12
                                : hour24 === 0
                                ? 12
                                : hour24;
                            setTaskDetails((prev) => ({
                              ...prev,
                              START_TIME: hour24,
                              timeSuffixStart: suffix,
                              formattedStartTime: `${hour12}:${
                                prev.startMinute
                                  ? prev.startMinute.toString().padStart(2, "0")
                                  : "00"
                              } ${suffix}`,
                            }));
                          }}
                        >
                          {Array.from({ length: 12 }, (_, i) => {
                            const hour24 = 7 + i;
                            return (
                              <option key={hour24} value={hour24}>
                                {hour24 > 12
                                  ? hour24 - 12
                                  : hour24 === 0
                                  ? 12
                                  : hour24}{" "}
                                {hour24 >= 12 ? "PM" : "AM"}
                              </option>
                            );
                          })}
                        </select>
                      </div>

                      {/* Minute Input */}
                      <div className="flex flex-col w-1/2">
                        <div className="flex gap-1">
                          {["00", "15", "30", "45"].map((min) => (
                            <button
                              type="button"
                              key={min}
                              className={`btn btn-sm ${
                                taskDetails.startMinute === Number(min)
                                  ? "btn-primary"
                                  : "btn-outline"
                              }`}
                              onClick={() => {
                                setTaskDetails((prev) => ({
                                  ...prev,
                                  startMinute: Number(min),
                                  formattedStartTime: `${
                                    prev.START_TIME > 12
                                      ? prev.START_TIME - 12
                                      : prev.START_TIME === 0
                                      ? 12
                                      : prev.START_TIME
                                  }:${min} ${prev.timeSuffixStart}`,
                                }));
                              }}
                            >
                              {min}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* End Time */}
                  <div className="flex-1">
                    <label className="label text-sm">
                      <span className="label-text">End Time</span>
                    </label>
                    <div className="flex items-center gap-2">
                      {/* Hour Input */}
                      <div className="flex flex-col w-1/2">
                        <select
                          className="select select-bordered select-sm w-full text-sm"
                          value={taskDetails.END_TIME || "00"}
                          onChange={(e) => {
                            const hour24 = Number(e.target.value);
                            const suffix = hour24 >= 12 ? "PM" : "AM";
                            const hour12 =
                              hour24 > 12
                                ? hour24 - 12
                                : hour24 === 0
                                ? 12
                                : hour24;

                            if (hour24 < taskDetails.START_TIME) {
                              alert(
                                "End Time cannot be earlier than Start Time."
                              );
                              return;
                            }

                            // If 6 PM is selected, force minutes to "00"
                            if (hour24 === 18) {
                              setTaskDetails((prev) => ({
                                ...prev,
                                END_TIME: hour24,
                                timeSuffixEnd: suffix,
                                endMinute: 0, // Force minutes to 00
                                formattedEndTime: `${hour12}:00 ${suffix}`,
                              }));
                            } else {
                              setTaskDetails((prev) => ({
                                ...prev,
                                END_TIME: hour24,
                                timeSuffixEnd: suffix,
                                formattedEndTime: `${hour12}:${
                                  prev.endMinute
                                    ? prev.endMinute.toString().padStart(2, "0")
                                    : "00"
                                } ${suffix}`,
                              }));
                            }
                          }}
                        >
                          {Array.from({ length: 12 }, (_, i) => {
                            const hour24 = 7 + i;
                            return (
                              <option key={hour24} value={hour24}>
                                {hour24 > 12
                                  ? hour24 - 12
                                  : hour24 === 0
                                  ? 12
                                  : hour24}{" "}
                                {hour24 >= 12 ? "PM" : "AM"}
                              </option>
                            );
                          })}
                        </select>
                      </div>

                      {/* Minute Input */}
                      <div className="flex flex-col w-1/2">
                        <div className="flex gap-1">
                          {["00", "15", "30", "45"].map((min) => {
                            const minuteValue = Number(min);
                            const is6PM = taskDetails.END_TIME === 18;
                            const isDisabled = is6PM && minuteValue !== 0; // Disable all except "00" for 6 PM

                            return (
                              <button
                                type="button"
                                key={min}
                                className={`btn btn-sm ${
                                  taskDetails.endMinute === minuteValue
                                    ? "btn-primary"
                                    : "btn-outline"
                                } ${
                                  isDisabled
                                    ? "btn-disabled opacity-50 cursor-not-allowed"
                                    : ""
                                }`}
                                disabled={isDisabled}
                                onClick={() => {
                                  if (is6PM && minuteValue !== 0) return; // Prevent any action for disabled buttons

                                  if (
                                    taskDetails.END_TIME ===
                                      taskDetails.START_TIME &&
                                    minuteValue < taskDetails.startMinute
                                  ) {
                                    alert(
                                      "End Time cannot be earlier than Start Time."
                                    );
                                    return;
                                  }
                                  setTaskDetails((prev) => ({
                                    ...prev,
                                    endMinute: minuteValue,
                                    formattedEndTime: `${
                                      prev.END_TIME > 12
                                        ? prev.END_TIME - 12
                                        : prev.END_TIME === 0
                                        ? 12
                                        : prev.END_TIME
                                    }:${min} ${prev.timeSuffixEnd}`,
                                  }));
                                }}
                              >
                                {min}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Selected Task Preview */}
                {selectedTask && (
                  <div className="mt-4 bg-gray-400 p-2 rounded flex items-center justify-between">
                    <span className="text-black text-sm">
                      {selectedTask.TASK_NAME}
                    </span>
                    <button
                      onClick={() => setSelectedTask(null)}
                      className="text-gray-500 hover:text-red-500 rounded-full p-1 hover:bg-red-100"
                    >
                      <XIcon className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </form>

      {events.length > 0 && (
        <div className="overflow-x-auto mt-6">
          <table className="table table-zebra table-bordered w-full">
            <thead className="bg-gray-200">
              <tr>
                <th>USER_NAME</th>
                <th>EMP_NO</th>
                <th>TASK_ID</th>
                <th>TASK_NAME</th>
                <th>PROJECT_NO</th>
                <th>Start_Time</th>
                <th>End_Time</th>
                <th>Duration</th>
                <th>No_of_Minutes</th>
                <th>No_of_Hours</th>
                <th>Trans_Date</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => {
                const duration = calculateDuration(
                  event.START_TIME,
                  event.startMinute,
                  event.END_TIME,
                  event.endMinute
                );

                return (
                  <tr key={index}>
                    <td>{userData.currentUserName}</td>
                    <td>{userData.currentUserEmpNo}</td>
                    <td>{event.TASK_ID}</td>
                    <td>{event.TASK_NAME}</td>
                    <td>{event.PROJECT_NO}</td>
                    <td>{formatTime(event.START_TIME, event.startMinute)}</td>
                    <td>{formatTime(event.END_TIME, event.endMinute)}</td>
                    <td>{formatDuration(duration)}</td>
                    <td>{event.NO_OF_MINUTES}</td>
                    <td>{event.NO_OF_HOURS.toFixed(2)}</td>
                    <td>{event.TRANS_DATE}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
