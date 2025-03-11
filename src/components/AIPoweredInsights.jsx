import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  ShoppingBag,
  IndianRupee,
  FileText,
  CheckCircle,
  Clock,
  Trash2,
} from "lucide-react";

const INSIGHTS = [
  {
    icon: FileText,
    color: "text-green-500",
    insight: "Total documents in the system have increased by 12% this month.",
  },
  {
    icon: CheckCircle,
    color: "text-blue-500",
    insight: "85% of documents have been reviewed and approved successfully.",
  },
  {
    icon: Clock,
    color: "text-yellow-500",
    insight:
      "Pending document approvals have decreased by 10% compared to last month.",
  },
  {
    icon: Trash2,
    color: "text-red-500",
    insight:
      "10 documents were deleted in the last week for better data management.",
  },
];

const AIPoweredInsights = () => {
  return (
    <motion.div
      className="bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg rounded-2xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0 }}
    >
      <h2 className="text-xl font-semibold text-gray-100 mb-4">
        AI-Powered Insights
      </h2>
      <div className="space-y-4">
        {INSIGHTS.map((item, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className={`p-2 rounded-full ${item.color} bg-opacity-20`}>
              <item.icon className={`size-6 ${item.color}`} />
            </div>
            <p className="text-gray-300">{item.insight}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
export default AIPoweredInsights;
