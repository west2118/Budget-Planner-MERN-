"use client";

import { Bell } from "lucide-react";
import SummaryCards from "../../components/dashboard/SummaryCards";
import ChartsCard from "../../components/dashboard/ChartsCard";
import GoalsActionsCard from "../../components/dashboard/GoalsActionsCard";

const DashboardPage = () => {
  return (
    <div className="p-4 lg:p-6">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                Dashboard
              </h1>
              <p className="text-gray-600 text-sm lg:text-base">
                Your financial overview
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3 lg:space-x-4">
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-linear-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">JD</span>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <SummaryCards />

      {/* Charts Section */}
      <ChartsCard />

      {/* Goals and Quick Actions Section */}
      <GoalsActionsCard />
    </div>
  );
};

export default DashboardPage;
