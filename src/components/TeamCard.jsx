import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import React from "react";
import { Cell, Pie, PieChart, Tooltip } from "recharts";

const TeamCard = ({ user }) => {
  // Destructure with fallbacks
  const {
    user_name,
    domain_user_name,
    designation,
    imageSrc,
    overall_total_tasks = 0,
    overall_completed_tasks = 0,
    month_total_tasks = 0,
    month_completed_tasks = 0,
    lastActive = "N/A",
    priority = "Good",
  } = user;

  const pendingTasks = overall_total_tasks - overall_completed_tasks;
  const progress =
    overall_total_tasks > 0
      ? Math.round((overall_completed_tasks / overall_total_tasks) * 100)
      : 0;
  const chartData = [
    { name: "Completed", value: overall_completed_tasks },
    { name: "Pending", value: pendingTasks },
  ];

  const COLORS = ["#10B981", "#EF4444"];

  // Calculate dynamic donut progress (assuming a circumference of 100)
  const monthProgress =
    month_total_tasks > 0
      ? (month_completed_tasks / month_total_tasks) * 100
      : 0;
  const strokeDasharray = `${monthProgress}, 100`;

  return (
    <motion.div
      className="p-3 rounded-lg shadow-sm flex flex-col border border-gray-700 bg-gray-900"
      whileHover={{ scale: 1.02 }}
    >
      {/* Employee Info */}
      <div className="flex items-center gap-3 mb-2">
        <img
          src={user.image || imageSrc}
          alt={user_name || domain_user_name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/placeholder-user.png";
          }}
          className="w-10 h-10 rounded-full border border-gray-600"
        />
        <div>
          <h3 className="text-sm font-medium text-white">
            {user_name || domain_user_name}
          </h3>
          <p className="text-xs text-gray-400">{designation}</p>
        </div>
      </div>

      {/* Pie Chart & Stats */}
      <div className="flex items-start gap-2">
        <PieChart width={60} height={60}>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={18}
            outerRadius={28}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>

        <div className="flex items-start justify-between w-full gap-1">
          {/* Task Overview */}
          <div className="text-xs text-gray-300">
            <h6 className="font-semibold mb-1">Task Overview</h6>
            <p className="truncate">📄 {overall_total_tasks} Total Tasks</p>
            <p className="truncate">✅ {overall_completed_tasks} Completed</p>
            <p className="truncate">❌ {pendingTasks} Pending</p>
          </div>

          {/* Month Overview */}
          <div className="p-2 bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow flex flex-col items-center">
            <h6 className="text-xs font-semibold text-white">Month Overview</h6>

            <div className="flex items-end">
              <div className="relative mt-1">
                {/* Donut background */}
                <svg className="w-11 h-11" viewBox="0 0 36 36">
                  <path
                    className="text-white/30"
                    strokeWidth="3"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845
                       a 15.9155 15.9155 0 0 1 0 31.831
                       a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Donut progress: dynamic strokeDasharray */}
                  <path
                    className="text-white"
                    strokeWidth="3"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset="0"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845
                       a 15.9155 15.9155 0 0 1 0 31.831
                       a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                {/* Centered text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-lg font-bold leading-none text-white">
                    {month_completed_tasks}
                  </span>
                  <span className="text-[10px] text-white/80">
                    / {month_total_tasks}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-2">
        <div className="text-xs text-gray-400 flex justify-between">
          <span>Task Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full h-1.5 bg-gray-700 rounded-full mt-1">
          <div
            className="h-1.5 rounded-full"
            style={{
              width: `${progress}%`,
              backgroundColor: "#10B981",
            }}
          />
        </div>
      </div>

      {/* Extra Info */}
      <div className="flex justify-between text-xs text-gray-400 mt-2">
        <p>
          <Clock className="inline w-3 h-3 mr-1" /> {lastActive}
        </p>
        <p
          className={
            priority === "Good"
              ? "text-green-400"
              : priority === "Average"
              ? "text-yellow-400"
              : "text-red-400"
          }
        >
          {priority}
        </p>
      </div>
    </motion.div>
  );
};

export default TeamCard;
