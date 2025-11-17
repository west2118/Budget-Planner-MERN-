import {
  CheckCircle2,
  Edit,
  MoreVertical,
  Pencil,
  PlusCircle,
  Trash2,
} from "lucide-react";
import { categoriesGoal, getRemainingDays } from "../../lib/constants";
import type { GoalType } from "../../lib/types";
import { useMemo, useState } from "react";

type GoalCardProps = {
  goal: GoalType;
  handleEditGoal: (goal: GoalType) => void;
  handleDeleteGoal: (goal: GoalType) => void;
};

const GoalCard = ({
  goal,
  handleEditGoal,
  handleDeleteGoal,
}: GoalCardProps) => {
  const [isOpenSettings, setIsOpenSettings] = useState(false);

  const goalColor = useMemo(
    () => categoriesGoal.find((category) => category.label === goal.category),
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
        <div className="flex items-center justify-between mb-4 relative">
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

          {/* Settings Button */}
          <div className="relative">
            <button
              onClick={() => setIsOpenSettings(!isOpenSettings)}
              className="p-2 rounded-md hover:bg-gray-100">
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>

            {isOpenSettings && (
              <div className="absolute right-0 mt-2 w-36 bg-white shadow-lg border border-gray-200 rounded-lg overflow-hidden z-10">
                <button
                  onClick={() => {
                    setIsOpenSettings(false);
                    handleEditGoal(goal);
                  }}
                  className="flex items-center w-full px-3 py-2 text-sm hover:bg-gray-100">
                  <Pencil className="w-4 h-4 mr-2 text-blue-500" />
                  Edit
                </button>

                <button
                  onClick={() => {
                    setIsOpenSettings(false);
                    handleDeleteGoal(goal);
                  }}
                  className="flex items-center w-full px-3 py-2 text-sm hover:bg-gray-100 text-red-600">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </button>
              </div>
            )}
          </div>
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
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-sm text-gray-600">Days left</span>
          <span
            className={`text-sm font-semibold ${
              remainingDays < 30 ? "text-red-600" : "text-gray-900"
            }`}>
            {remainingDays} days
          </span>
        </div>
      </div>
    </div>
  );
};

export default GoalCard;
