import React, { useMemo } from "react";
import {
  Target,
  DollarSign,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";
import type { GoalType } from "../../lib/types";
import StatCard from "../ui/StatCard";

const SummaryCardsGoals = ({ goals }: { goals: GoalType[] | null }) => {
  const summaryData = useMemo(() => {
    if (!goals || goals.length === 0) {
      return [
        {
          title: "Total Goals",
          total: 0,
          extraInfo: "0 completed",
          icon: Target,
          color: "text-blue-500",
          bgColor: "bg-blue-50",
        },
        {
          title: "Total Target",
          total: 0,
          prefix: "$",
          extraInfo: "Across all goals",
          icon: DollarSign,
          color: "text-green-500",
          bgColor: "bg-green-50",
        },
        {
          title: "Total Saved",
          total: 0,
          prefix: "$",
          extraInfo: "$0 to go",
          icon: TrendingUp,
          color: "text-purple-500",
          bgColor: "bg-purple-50",
        },
        {
          title: "Overall Progress",
          total: "0%",
          extraInfo: "0/0 goals",
          icon: CheckCircle2,
          color: "text-orange-500",
          bgColor: "bg-orange-50",
        },
      ];
    }

    const totalGoals = goals?.length;
    const totalCompleted = goals?.filter(
      (goal) => goal.targetAmount <= goal.currentAmount
    ).length;

    const totalTarget = goals.reduce((acc, t) => acc + t.targetAmount, 0);

    const totalSaved = goals.reduce((acc, t) => acc + t.currentAmount, 0);

    const totalRemaining = totalTarget - totalSaved;

    const overallProgress =
      totalTarget > 0
        ? Math.min(100, Math.round((totalSaved / totalTarget) * 100))
        : 0;

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
  }, [goals]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {summaryData.map((item, index) => (
        <StatCard key={index} {...item} />
      ))}
    </div>
  );
};

export default SummaryCardsGoals;
