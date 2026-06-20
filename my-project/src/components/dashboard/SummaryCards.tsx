import { DollarSign, TrendingDown, TrendingUp } from "lucide-react";
import { useTransactionSummary } from "../../hooks/useTransactionSummary";
import StatCard from "../ui/StatCard";

const SummaryCards = () => {
  const { data: summaryStats, isLoading, error } = useTransactionSummary();

  const summaryData = [
    {
      title: "Total Income",
      total: summaryStats?.income ?? 0,
      prefix: "$",
      icon: TrendingUp,
      trend: "up" as const,
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      title: "Total Expense",
      total: summaryStats?.expense ?? 0,
      prefix: "$",
      icon: TrendingDown,
      trend: "down" as const,
      color: "text-red-500",
      bgColor: "bg-red-50",
    },
    {
      title: "Total Balance",
      total: summaryStats?.balance ?? 0,
      prefix: "$",
      icon: DollarSign,
      trend: "up" as const,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gray-100 rounded-xl shadow-sm p-4 lg:p-6 h-28"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-sm mb-6">
        Failed to load summary statistics.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
      {summaryData.map((item, index) => (
        <StatCard key={index} {...item} />
      ))}
    </div>
  );
};

export default SummaryCards;
