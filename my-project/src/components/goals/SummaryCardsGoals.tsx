import { useMemo } from "react";
import {
  Target,
  DollarSign,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";
import SummaryCardsGrid from "../ui/SummaryCardsGrid";
import { useGoalsSummary } from "../../hooks/useGoalsSummary";

const SummaryCardsGoals = () => {
  const { data: summary, isLoading, error } = useGoalsSummary();

  const summaryData = useMemo(() => {
    const totalGoals = summary?.totalGoals || 0;
    const totalCompleted = summary?.totalCompleted || 0;
    const totalTarget = summary?.totalTarget || 0;
    const totalSaved = summary?.totalSaved || 0;
    const totalRemaining = summary?.totalRemaining || 0;
    const overallProgress = summary?.overallProgress || 0;

    return [
      {
        title: "Total Goals",
        total: totalGoals,
        extraInfo: `${totalCompleted} completed`,
        icon: Target,
        color: "text-blue-500",
        bgColor: "bg-blue-50",
      },
      {
        title: "Total Target",
        total: totalTarget,
        prefix: "$",
        extraInfo: "Across all goals",
        icon: DollarSign,
        color: "text-green-500",
        bgColor: "bg-green-50",
      },
      {
        title: "Total Saved",
        total: totalSaved,
        prefix: "$",
        extraInfo: `$${totalRemaining.toLocaleString()} to go`,
        icon: TrendingUp,
        color: "text-purple-500",
        bgColor: "bg-purple-50",
      },
      {
        title: "Overall Progress",
        total: `${overallProgress}%`,
        extraInfo: `${totalCompleted}/${totalGoals} goals`,
        icon: CheckCircle2,
        color: "text-orange-500",
        bgColor: "bg-orange-50",
      },
    ];
  }, [summary]);

  return <SummaryCardsGrid data={summaryData} isLoading={isLoading} error={error} columns={4} />;
};

export default SummaryCardsGoals;
