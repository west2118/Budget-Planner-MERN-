"use client";

import FilterActions from "../../components/reports/FilterActions";
import SummaryStats from "../../components/reports/SummaryStats";
import ChartsSection from "../../components/reports/ChartsSection";
import Insights from "../../components/reports/Insights";
import { useUserStore } from "../../stores/useUserStore";
import { useQuery } from "@tanstack/react-query";
import type { TransactionType } from "../../lib/types";
import { fetchData } from "../../lib/utils";

const ReportsPage = () => {
  const token = useUserStore((state) => state.userToken);

  const { data, error, isLoading } = useQuery<TransactionType[]>({
    queryKey: ["report-data"],
    queryFn: fetchData(
      "http://localhost:8080/api/v1/transactions-report",
      token
    ),
    enabled: !!token,
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
      <FilterActions />

      {/* Summary Statistics */}
      <SummaryStats />

      {/* Charts Section */}
      <ChartsSection transactions={data ?? []} />

      {/* Insights Section */}
      <Insights />
    </div>
  );
};

export default ReportsPage;
