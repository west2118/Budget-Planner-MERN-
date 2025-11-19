import type { LucideProps } from "lucide-react";
import React from "react";
import type { GoalType } from "../../lib/types";

type GoalCardProps = {
  category: {
    label: string;
    color: string;
    icon: React.ComponentType<LucideProps>;
  };
  goal: GoalType;
  progress: number;
  IconComponent: React.ComponentType<LucideProps>;
};

const GoalCard = ({
  category,
  goal,
  progress,
  IconComponent,
}: GoalCardProps) => {
  return (
    <div className="space-y-2 lg:space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 lg:space-x-3 min-w-0 flex-1">
          {/* Icon BG */}
          <div
            className="p-1 lg:p-2 rounded-lg shrink-0"
            style={{ backgroundColor: `${category?.color}20` }} // faded bg
          >
            {IconComponent && (
              <IconComponent
                className="w-4 h-4"
                style={{ color: category?.color }} // icon color
              />
            )}
          </div>

          {/* Title + Amount */}
          <div className="min-w-0 flex-1">
            <p className="font-medium text-gray-900 truncate">{goal.title}</p>
            <p className="text-xs lg:text-sm text-gray-600 truncate">
              ${goal.currentAmount.toLocaleString()} of $
              {goal.targetAmount.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Percentage */}
        <span className="text-sm font-medium text-gray-900 shrink-0 ml-2">
          {progress}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="h-2 rounded-full"
          style={{
            backgroundColor: category?.color,
            width: `${progress}%`,
          }}></div>
      </div>
    </div>
  );
};

export default GoalCard;
