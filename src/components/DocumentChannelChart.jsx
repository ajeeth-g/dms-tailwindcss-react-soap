import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useAuth } from "../context/AuthContext";
import { getDashboardChannelSummary } from "../services/dashboardService";

const DocumentChannelChart = ({ daysCount = 30 }) => {
  const [channelData, setChannelData] = useState([]);
  const { userData } = useAuth();

  const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDashboardChannelSummary(daysCount, userData.currentUserLogin);
        const formattedData = data.map((item) => ({
          name: item.CHANNEL_SOURCE,
          channels: Number(item.total_count) || 0,
        }));
        setChannelData(formattedData);
      } catch (error) {
        console.error("Error fetching channel summary:", error);
      }
    };

    if (daysCount != null) {
      fetchData();
    }
  }, [daysCount]);

  return (
    <motion.div
      className="bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg rounded-2xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray-100">
        Documents by channel
      </h2>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={channelData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
            <XAxis dataKey="name" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
            />
            <Legend />
            <Bar dataKey={"channels"} fill="#8884d8">
              {channelData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default DocumentChannelChart;
