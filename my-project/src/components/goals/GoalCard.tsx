import { CheckCircle2, Edit, PlusCircle, Trash2 } from "lucide-react";
import { categories, getRemainingDays } from "../../lib/constants";
import type { GoalType } from "../../lib/types";
import { useMemo } from "react";

const GoalCard = ({ goal }: { goal: GoalType }) => {
  const goalColor = useMemo(
    () => categories.find((category) => category.label === goal.category),
    [goal.category]
  );

  const Icon = goalColor?.icon;

  const remainingDays = getRemainingDays(goal.deadline);
  const goalCompleted = goal.targetAmount <= goal.currentAmount;

  const goalProgress = useMemo(() => {
    if (goal.targetAmount <= 0) return 0;
    return Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
  }, [goal.currentAmount, goal.targetAmount]);

  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden ${
        goalCompleted ? "ring-2 ring-emerald-200" : ""
      }`}>
      {/* Goal Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div
              style={{ backgroundColor: goalColor?.color }}
              className="p-2 rounded-lg bg-opacity-10">
              {Icon && <Icon className="w-5 h-5 text-white" />}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{goal.title}</h3>
              <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full mt-1">
                {goal.category}
              </span>
            </div>
          </div>
          {goalCompleted && (
            <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
          )}
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Progress</span>
            <span className="font-semibold text-gray-900">
              {goalProgress.toFixed(0)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-500`}
              style={{
                backgroundColor: goalColor?.color,
                width: `${goalProgress.toFixed(0)}%`,
              }}></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>${goal.currentAmount.toLocaleString()}</span>
            <span>${goal.targetAmount.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Goal Details */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
          <div>
            <p className="text-gray-500">Target</p>
            <p className="font-semibold text-gray-900">
              ${goal.targetAmount.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Current</p>
            <p className="font-semibold text-gray-900">
              ${goal.currentAmount.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Remaining</p>
            <p className="font-semibold text-gray-900">
              ${(goal.targetAmount - goal.currentAmount).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Deadline</p>
            <p className="font-semibold text-gray-900">
              {new Date(goal.deadline).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Days Left */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-4">
          <span className="text-sm text-gray-600">Days left</span>
          <span
            className={`text-sm font-semibold ${
              remainingDays < 30 ? "text-red-600" : "text-gray-900"
            }`}>
            {remainingDays} days
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          {!goalCompleted && (
            <button className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm">
              <PlusCircle className="w-4 h-4" />
              <span>Add Money</span>
            </button>
          )}
          <button className="flex items-center justify-center px-3 py-2 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors text-sm">
            <Edit className="w-4 h-4" />
          </button>
          <button className="flex items-center justify-center px-3 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors text-sm">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoalCard;
