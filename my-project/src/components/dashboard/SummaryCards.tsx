import { useMemo } from "react";
import { DollarSign, TrendingDown, TrendingUp } from "lucide-react";
import { useTransactionSummary } from "../../hooks/useTransactionSummary";
import SummaryCardsGrid from "../ui/SummaryCardsGrid";

const SummaryCards = () => {
  const { data: summaryStats, isLoading, error } = useTransactionSummary();

  const summaryData = useMemo(() => [
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
  ], [summaryStats]);

  return <SummaryCardsGrid data={summaryData} isLoading={isLoading} error={error} columns={3} />;
};

export default SummaryCards;
