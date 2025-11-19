import type { GoalType } from "../../lib/types";
import { categoriesGoal } from "../../lib/constants";
import QuickActionsCard from "./QuickActionsCard";
import GoalCard from "./GoalCard";

const GoalsActionsCard = ({ goals }: { goals: GoalType[] | null }) => {
  console.log(goals);

  const goalsFilter = goals
    ?.filter((goal) => goal.currentAmount < goal.targetAmount)
    .slice(-3);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
      {/* Goals Section */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4 lg:mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Active Goals
            </h3>
          </div>
          <div className="space-y-4 lg:space-y-6">
            {goalsFilter?.map((goal) => {
              const category = categoriesGoal.find(
                (category) => category.label === goal.category
              );
              if (!category) return null;

              const IconComponent = category?.icon;
              const progress = (goal.currentAmount / goal.targetAmount) * 100;

              return (
                <GoalCard
                  category={category}
                  goal={goal}
                  progress={progress}
                  IconComponent={IconComponent}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <QuickActionsCard />
    </div>
  );
};

export default GoalsActionsCard;
