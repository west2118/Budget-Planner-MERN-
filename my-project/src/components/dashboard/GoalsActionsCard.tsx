import { CreditCard, Plus, Target } from "lucide-react";
import React from "react";

const GoalsActionsCard = ({ goalsData }: { goalsData: any }) => {
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
            {goalsData.map((goal, index) => {
              const IconComponent = goal.icon;
              return (
                <div key={index} className="space-y-2 lg:space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 lg:space-x-3 min-w-0 flex-1">
                      <div
                        className={`p-1 lg:p-2 rounded-lg ${goal.color} bg-opacity-10 shrink-0`}>
                        <IconComponent
                          className={`w-4 h-4 ${goal.color.replace(
                            "bg-",
                            "text-"
                          )}`}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-gray-900 truncate">
                          {goal.title}
                        </p>
                        <p className="text-xs lg:text-sm text-gray-600 truncate">
                          ${goal.current.toLocaleString()} of $
                          {goal.target.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 shrink-0 ml-2">
                      {goal.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${goal.color}`}
                      style={{ width: `${goal.progress}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 lg:mb-6">
          Quick Actions
        </h3>
        <div className="space-y-3 lg:space-y-4">
          <button className="w-full flex items-center justify-center space-x-2 p-3 lg:p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-gray-400 transition-colors text-gray-600 hover:text-gray-700 text-sm lg:text-base">
            <Plus className="w-4 h-4 lg:w-5 lg:h-5" />
            <span>Add Transaction</span>
          </button>

          <button className="w-full flex items-center justify-center space-x-2 p-3 lg:p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-gray-400 transition-colors text-gray-600 hover:text-gray-700 text-sm lg:text-base">
            <CreditCard className="w-4 h-4 lg:w-5 lg:h-5" />
            <span>Add Card</span>
          </button>

          <button className="w-full flex items-center justify-center space-x-2 p-3 lg:p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-gray-400 transition-colors text-gray-600 hover:text-gray-700 text-sm lg:text-base">
            <Target className="w-4 h-4 lg:w-5 lg:h-5" />
            <span>Add Goal</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoalsActionsCard;
