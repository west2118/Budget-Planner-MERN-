import type { GoalType } from "../../lib/types";
import { categoriesGoal } from "../../lib/constants";
import QuickActionsCard from "./QuickActionsCard";
import GoalCard from "./GoalCard";
import { useGoals } from "../../hooks/useGoals";

const GoalsActionsCard = () => {
  const { data: goals, isLoading, error } = useGoals();

  const goalsFilter = goals
    ?.filter((goal) => goal.currentAmount < goal.targetAmount)
    .slice(-3);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 animate-pulse">
        <div className="lg:col-span-2 bg-gray-100 rounded-xl h-64"></div>
        <div className="bg-gray-100 rounded-xl h-64"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-center">
        Failed to load goals data.
      </div>
    );
  }

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
            {!goalsFilter || goalsFilter.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No active goals found.
              </div>
            ) : (
              goalsFilter.map((goal) => {
                const category = categoriesGoal.find(
                  (category) => category.label === goal.category
                );
                if (!category) return null;

                const IconComponent = category?.icon;
                const progress = (goal.currentAmount / goal.targetAmount) * 100;

                return (
                  <GoalCard
                    key={goal._id}
                    category={category}
                    goal={goal}
                    progress={progress}
                    IconComponent={IconComponent}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <QuickActionsCard />
    </div>
  );
};

export default GoalsActionsCard;
