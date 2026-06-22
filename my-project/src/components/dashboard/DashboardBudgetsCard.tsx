import { useBudgets } from "../../hooks/useBudgets";
import { Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import ProgressCard from "./ProgressCard";

const DashboardBudgetsCard = () => {
  const { data: budgets, isLoading, error } = useBudgets();

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
        Failed to load budgets data.
      </div>
    );
  }

  // Show up to 3 budgets that are closest to their limit
  const topBudgets = budgets
    ?.sort((a, b) => {
      const percentageA = a.spentAmount / a.amount;
      const percentageB = b.spentAmount / b.amount;
      return percentageB - percentageA; // Descending order of usage
    })
    .slice(0, 3);

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4 lg:mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Active Budgets</h3>
        <Link
          to="/dashboard/budgets"
          className="text-sm font-medium text-blue-600 hover:text-blue-700">
          View All
        </Link>
      </div>

      <div className="space-y-4">
        {!topBudgets || topBudgets.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            No budgets set yet.
          </div>
        ) : (
          topBudgets.map((budget) => {
            const percentage = Math.min((budget.spentAmount / budget.amount) * 100, 100);
            const isOverBudget = budget.spentAmount > budget.amount;
            const progressBarColor = isOverBudget ? "#EF4444" : percentage > 80 ? "#F59E0B" : "#3B82F6";

            return (
              <ProgressCard
                key={budget._id}
                title={budget.budgetName}
                currentAmount={budget.spentAmount}
                targetAmount={budget.amount}
                iconBgColor="#EFF6FF"
                iconColor="#3B82F6"
                progressBarColor={progressBarColor}
                IconComponent={Wallet}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default DashboardBudgetsCard;
