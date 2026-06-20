"use client";

import FilterActions from "../../components/reports/FilterActions";
import SummaryStats from "../../components/reports/SummaryStats";
import ChartsSection from "../../components/reports/ChartsSection";
import Insights from "../../components/reports/Insights";
import { useState } from "react";

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const ReportsPage = () => {
  const [filters, setFilters] = useState({
    startDate: formatDate(new Date(new Date().getFullYear(), new Date().getMonth(), 1)),
    endDate: formatDate(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)),
    reportType: "Monthly",
  });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Financial Reports</h1>
        <p className="text-gray-600">
          Detailed analytics and insights about your finances
        </p>
      </div>

      {/* Filters and Actions */}
      <FilterActions filters={filters} setFilters={setFilters} />

      {/* Summary Statistics */}
      <SummaryStats filters={filters} />

      {/* Charts Section */}
      <ChartsSection filters={filters} />

      {/* Insights Section */}
      <Insights />
    </div>
  );
};

export default ReportsPage;
