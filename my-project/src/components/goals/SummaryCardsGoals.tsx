import React, { useMemo } from "react";
import {
  Plus,
  Target,
  Calendar,
  DollarSign,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";
import type { GoalType } from "../../lib/types";

const SummaryCardsGoals = ({ goals }: { goals: GoalType[] | null }) => {
  const summaryData = useMemo(() => {
    if (!goals || goals.length === 0) {
      return [
        {
          title: "Total Goals",
          total: 0,
          subtext: "0 completed",
          icon: Target,
          color: "text-blue-500",
          bgColor: "bg-blue-50",
        },
        {
          title: "Total Target",
          total: "$0",
          subtext: "Across all goals",
          icon: DollarSign,
          color: "text-green-500",
          bgColor: "bg-green-50",
        },
        {
          title: "Total Saved",
          total: "$0",
          subtext: "$0 to go",
          icon: TrendingUp,
          color: "text-purple-500",
          bgColor: "bg-purple-50",
        },
        {
          title: "Overall Progress",
          total: "0%",
          subtext: "0/0 goals",
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
        subtext: `${totalCompleted} completed`,
        icon: Target,
        color: "text-blue-500",
        bgColor: "bg-blue-50",
      },
      {
        title: "Total Target",
        total: `$${totalTarget?.toLocaleString()}`,
        subtext: "Across all goals",
        icon: DollarSign,
        color: "text-green-500",
        bgColor: "bg-green-50",
      },
      {
        title: "Total Saved",
        total: `$${totalSaved?.toLocaleString()}`,
        subtext: `$${totalRemaining.toLocaleString()} to go`,
        icon: TrendingUp,
        color: "text-purple-500",
        bgColor: "bg-purple-50",
      },
      {
        title: "Overall Progress",
        total: `${overallProgress}%`,
        subtext: `${totalCompleted}/${totalGoals} goals`,
        icon: CheckCircle2,
        color: "text-orange-500",
        bgColor: "bg-orange-50",
      },
    ];
  }, [goals]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {summaryData.map((item, index) => {
        const IconComponent = item.icon;

        return (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  {item.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {item.total}
                </p>
                <p className="text-sm mt-1">{item.subtext}</p>
              </div>
              <div className={`p-3 rounded-full ${item.bgColor}`}>
                <IconComponent className={`w-6 h-6 ${item.color}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SummaryCardsGoals;
