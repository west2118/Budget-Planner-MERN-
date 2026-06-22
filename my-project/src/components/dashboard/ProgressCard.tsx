import type { LucideProps } from "lucide-react";
import React from "react";

type ProgressCardProps = {
  title: string;
  currentAmount: number;
  targetAmount: number;
  iconBgColor?: string;
  iconColor?: string;
  progressBarColor?: string;
  IconComponent?: React.ComponentType<LucideProps>;
};

const ProgressCard = ({
  title,
  currentAmount,
  targetAmount,
  iconBgColor = "#E5E7EB",
  iconColor = "#9CA3AF",
  progressBarColor,
  IconComponent,
}: ProgressCardProps) => {
  const percentage = Math.min((currentAmount / targetAmount) * 100, 100);
  const displayPercentage = percentage.toFixed(0);

  return (
    <div className="space-y-2 lg:space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 lg:space-x-3 min-w-0 flex-1">
          {/* Icon BG */}
          <div
            className="p-1 lg:p-2 rounded-lg shrink-0"
            style={{ backgroundColor: iconBgColor }}>
            {IconComponent && (
              <IconComponent className="w-4 h-4" style={{ color: iconColor }} />
            )}
          </div>

          {/* Title + Amount */}
          <div className="min-w-0 flex-1">
            <p className="font-medium text-gray-900 truncate">{title}</p>
            <p className="text-xs lg:text-sm text-gray-600 truncate">
              ${currentAmount.toLocaleString()} of ${targetAmount.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Percentage */}
        <span className="text-sm font-medium text-gray-900 shrink-0 ml-2">
          {displayPercentage}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${!progressBarColor ? "bg-blue-500" : ""}`}
          style={{
            backgroundColor: progressBarColor,
            width: `${percentage}%`,
          }}></div>
      </div>
    </div>
  );
};

export default ProgressCard;
