import { DollarSign, TrendingDown, TrendingUp } from "lucide-react";
import React from "react";
import { useReportSummary } from "../../hooks/useReportSummary";

type SummaryStatsProps = {
  filters: { startDate: string; endDate: string };
};

const SummaryStats = ({ filters }: SummaryStatsProps) => {
  const { data, isLoading, error } = useReportSummary(filters);

  const totalIncome = data?.totalIncome ?? 0;
  const totalExpenses = data?.totalExpenses ?? 0;
  const netSavings = data?.netSavings ?? 0;
  const savingsRate = data?.savingsRate ?? 0;

  const summaryData = [
    {
      title: "Total Income",
      value: totalIncome,
      change: "",
      trend: "up",
      icon: TrendingUp,
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      title: "Total Expenses",
      value: totalExpenses,
      change: "",
      trend: "down",
      icon: TrendingDown,
      color: "text-red-500",
      bgColor: "bg-red-50",
    },
    {
      title: "Net Savings",
      value: netSavings,
      change: "",
      trend: "up",
      icon: DollarSign,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      title: "Savings Rate",
      value: `${savingsRate}%`,
      change: "",
      trend: "up",
      icon: TrendingUp,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-28 bg-gray-100 animate-pulse rounded-xl border border-gray-100"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {summaryData.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {stat.title === "Savings Rate" ? "" : "$"}
                  {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                <IconComponent className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SummaryStats;
