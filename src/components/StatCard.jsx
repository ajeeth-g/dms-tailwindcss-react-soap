import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle,
  ClipboardCheck,
  FileQuestion,
  FileText,
  Loader,
} from "lucide-react";
import { getDashboardOverallSummary } from "../services/dashboardService";
import { useAuth } from "../context/AuthContext";

const StatCard = ({ daysCount = 30 }) => {
  const [summaryData, setSummaryData] = useState(null);
  const { userData } = useAuth();

  // Fetch dashboard summary data (passing daysCount)
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const data = await getDashboardOverallSummary(daysCount, userData.currentUserLogin);
        // Convert the array into an object for easier lookup:
        // e.g., { "Total Documents": 125, "Verfied Documents": 85, ... }
        const summaryObj = data.reduce((acc, item) => {
          acc[item.CATEGORY] = Number(item.total_count);
          return acc;
        }, {});
        setSummaryData(summaryObj);
      } catch (error) {
        console.error("Error fetching dashboard summary:", error);
      }
    };

    if (daysCount != null) {
      fetchSummary();
    }
  }, [daysCount]);

  // Build stats array once summaryData is available.
  const stats = summaryData
    ? [
        {
          title: "Total Documents",
          count: summaryData["Total Documents"] || 0,
          icon: FileText,
          color: "#6366F1",
          percentage: null,
          name: "",
        },
        {
          title: "Verified Documents",
          count: summaryData["Verfied Documents"] || 0,
          icon: CheckCircle,
          color: "#22C55E",
          percentage: summaryData["Total Documents"]
            ? (
                (summaryData["Verfied Documents"] /
                  summaryData["Total Documents"]) *
                100
              ).toFixed(1)
            : 0,
          name: "Total Documents",
        },
        {
          title: "Completed Documents",
          count: summaryData["Completed Documents"] || 0,
          icon: ClipboardCheck,
          color: "#F59E0B",
          percentage: summaryData["Verfied Documents"]
            ? (
                (summaryData["Completed Documents"] /
                  summaryData["Verfied Documents"]) *
                100
              ).toFixed(1)
            : 0,
          name: "Verified Documents",
        },
        {
          title: "In-progress Documents",
          count: summaryData["Inprogress Documents"] || 0,
          icon: Loader,
          color: "#3B82F6",
          percentage: summaryData["Verfied Documents"]
            ? (
                (summaryData["Inprogress Documents"] /
                  summaryData["Verfied Documents"]) *
                100
              ).toFixed(1)
            : 0,
          name: "Verified Documents",
        },
        {
          title: "Assigned Documents",
          count: summaryData["Assigned Documents"] || 0,
          icon: FileQuestion,
          color: "#EF4444",
          percentage: summaryData["Verfied Documents"]
            ? (
                (summaryData["Assigned Documents"] /
                  summaryData["Verfied Documents"]) *
                100
              ).toFixed(1)
            : 0,
          name: "Verified Documents",
        },
      ]
    : [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          className={`
            ${index === stats.length - 5 ? "sm:col-span-2" : ""}
            bg-gradient-to-br from-gray-800 to-gray-900
            shadow-lg rounded-2xl p-4 border border-gray-700
            transition-transform transform hover:scale-105 hover:shadow-2xl
          `}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
        >
          <div className="flex items-center justify-between h-14">
            {/* Text Section */}
            <div className="text-start flex-1">
              <h3 className="text-xs font-semibold text-gray-400 tracking-wide">
                {stat.title}
              </h3>
              <p className="text-4xl font-bold text-white leading-tight">
                {stat.count}
              </p>
            </div>

            {/* Icon Section */}
            <div
              className="w-14 h-14 p-4 rounded-xl flex items-center justify-center bg-opacity-50 shadow-md"
              style={{ backgroundColor: stat.color }}
            >
              <stat.icon className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Percentage Display */}
          {stat.percentage !== null && (
            <div
              className={`flex items-center text-sm font-medium justify-start mt-6 ${
                parseFloat(stat.percentage) >= 0
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {parseFloat(stat.percentage) >= 0 ? (
                <ArrowUpRight className="w-4 h-4" />
              ) : (
                <ArrowDownRight className="w-5 h-5" />
              )}
              <span>{stat.percentage}%</span>
              <span className="ml-1 text-xs text-gray-500">on {stat.name}</span>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default StatCard;
