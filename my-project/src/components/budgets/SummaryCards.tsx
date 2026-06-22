import { useMemo } from "react";
import { useBudgetsSummary } from "../../hooks/useBudgetsSummary";
import { AlertCircle, DollarSign, Wallet } from "lucide-react";
import SummaryCardsGrid from "../ui/SummaryCardsGrid";

const SummaryCards = () => {
  const { data: summary, isLoading, error } = useBudgetsSummary();

  const summaryData = useMemo(() => {
    const totalBudgetLimit = summary?.totalBudgetLimit || 0;
    const totalSpent = summary?.totalSpent || 0;
    const overBudgetCount = summary?.overBudgetCount || 0;

    const percentageUsed = totalBudgetLimit > 0 
      ? Math.round((totalSpent / totalBudgetLimit) * 100) 
      : 0;

    return [
      {
        title: "Total Budget Limit",
        total: totalBudgetLimit,
        prefix: "$",
        icon: Wallet,
        trend: "up" as const,
        color: "text-blue-500",
        bgColor: "bg-blue-50",
        extraInfo: "Across all active budgets",
      },
      {
        title: "Total Spent",
        total: totalSpent,
        prefix: "$",
        icon: DollarSign,
        trend: percentageUsed > 100 ? "up" as const : "down" as const,
        color: percentageUsed > 100 ? "text-red-500" : "text-green-500",
        bgColor: percentageUsed > 100 ? "bg-red-50" : "bg-green-50",
        extraInfo: `${percentageUsed}% of total budget used`,
      },
      {
        title: "Over Budget",
        total: overBudgetCount,
        prefix: "",
        icon: AlertCircle,
        trend: overBudgetCount > 0 ? "up" as const : "down" as const,
        color: overBudgetCount > 0 ? "text-red-500" : "text-blue-500",
        bgColor: overBudgetCount > 0 ? "bg-red-50" : "bg-blue-50",
        extraInfo: overBudgetCount === 1 ? "1 category needs attention" : `${overBudgetCount} categories need attention`,
      },
    ];
  }, [summary]);

  return <SummaryCardsGrid data={summaryData} isLoading={isLoading} error={error} columns={3} />;
};

export default SummaryCards;
