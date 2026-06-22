import { categoriesGoal } from "../../lib/constants";
import ProgressCard from "./ProgressCard";
import { useGoals } from "../../hooks/useGoals";
import { Link } from "react-router-dom";

const DashboardGoalsCard = () => {
  const { data: goals, isLoading, error } = useGoals();

  const goalsFilter = goals
    ?.filter((goal) => goal.currentAmount < goal.targetAmount)
    .slice(-3);

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 border border-gray-100 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
        <div className="space-y-4">
          <div className="h-16 bg-gray-100 rounded-lg"></div>
          <div className="h-16 bg-gray-100 rounded-lg"></div>
        </div>
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
    <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 border border-gray-100 h-full">
      <div className="flex items-center justify-between mb-4 lg:mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Active Goals</h3>
        <Link
          to="/dashboard/goals"
          className="text-sm font-medium text-blue-600 hover:text-blue-700">
          View All
        </Link>
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

            return (
              <ProgressCard
                key={goal._id}
                title={goal.title}
                currentAmount={goal.currentAmount}
                targetAmount={goal.targetAmount}
                iconBgColor={`${category?.color}20`}
                iconColor={category?.color}
                progressBarColor={category?.color}
                IconComponent={IconComponent}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default DashboardGoalsCard;
