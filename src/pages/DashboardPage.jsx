import { useEffect, useState } from "react";
import AIPoweredInsights from "../components/AIPoweredInsights";
import ChannelPerformance from "../components/ChannelPerformance";
import DailyReports from "../components/DailyReports";
import DashboardFilter from "../components/DashboardFilter";
import DocumentChannelChart from "../components/DocumentChannelChart";
import DocumentDistribution from "../components/DocumentDistribution";
import Greeting from "../components/Greeting";
import StatCard from "../components/StatCard";
import TeamDashboard from "../components/TeamDashboard";
import { useAuth } from "../context/AuthContext";
import { doConnection } from "../services/connectionService";

export default function DashboardPage() {
  const [filterDays, setFilterDays] = useState("30");
  const { userData } = useAuth();

  useEffect(() => {
    const establishDoConnection = async () => {
      const doConnectionResult = await doConnection(
        userData.ClientURL,
        userData.currentUserLogin
      );
    };
    establishDoConnection();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
      <div className="col-span-2">
        <Greeting />
      </div>
      <div className="col-span-2 flex justify-end">
        <DashboardFilter onFilterChange={setFilterDays} />
      </div>
      <div className="col-span-2 md:col-span-1 lg:col-span-1">
        <DocumentDistribution filterDays={filterDays} />
      </div>
      <div className="md:col-span-1 lg:col-span-1">
        <StatCard filterDays={filterDays} />
      </div>
      <div className="col-span-2 md:col-span-1 lg:col-span-1">
        <ChannelPerformance filterDays={filterDays} />
      </div>
      <div className="col-span-2 md:col-span-1 lg:col-span-1">
        <DocumentChannelChart filterDays={filterDays} />
      </div>
      <div className="col-span-2">
        <DailyReports />
      </div>
      <div className="col-span-2">
        <TeamDashboard />
      </div>
      <div className="col-span-2">
        <AIPoweredInsights />
      </div>
    </div>
  );
}
