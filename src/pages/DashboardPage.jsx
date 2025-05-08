import { useState } from "react";
import AIPoweredInsights from "../components/AIPoweredInsights";
import ChannelPerformance from "../components/ChannelPerformance";
import DailyReports from "../components/DailyReports";
import DashboardFilter from "../components/DashboardFilter";
import DocumentChannelChart from "../components/DocumentChannelChart";
import DocumentDistribution from "../components/DocumentDistribution";
import Greeting from "../components/Greeting";
import StatCard from "../components/StatCard";
import TeamDashboard from "../components/TeamDashboard";

export default function DashboardPage() {
  const [filterDays, setFilterDays] = useState("365");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
      <div className="col-span-2">
        <Greeting />
      </div>
      <div className="col-span-2 flex justify-end">
        <DashboardFilter onFilterChange={setFilterDays} />
      </div>
      <div className="col-span-2 md:col-span-2 lg:col-span-1">
        <DocumentDistribution daysCount={filterDays} />
      </div>
      <div className="md:col-span-2 lg:col-span-1">
        <StatCard daysCount={filterDays} />
      </div>
      <div className="col-span-2 md:col-span-2 lg:col-span-1">
        <ChannelPerformance daysCount={filterDays} />
      </div>
      <div className="col-span-2 md:col-span-2 lg:col-span-1">
        <DocumentChannelChart daysCount={filterDays} />
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
