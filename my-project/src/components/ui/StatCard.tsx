import type { LucideIcon } from "lucide-react";
import React from "react";

type StatCardProps = {
  title: string;
  total: number | string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  color: string;
  bgColor: string;
  extraInfo?: string | React.ReactNode;
  prefix?: string;
};

const StatCard = ({
  title,
  total,
  icon: IconComponent,
  trend,
  color,
  bgColor,
  extraInfo,
  prefix = "",
}: StatCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 border border-gray-100">
      <div className="flex items-center justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-gray-600 text-sm font-medium truncate">{title}</p>
          <p className="text-xl lg:text-2xl font-bold text-gray-900 mt-1 lg:mt-2 truncate">
            {prefix}
            {typeof total === "number"
              ? total.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
              : total}
          </p>
          <p
            className={`text-xs lg:text-sm mt-1 flex items-center ${trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500" : "text-gray-500"
              }`}>
            {extraInfo}
          </p>
        </div>
        <div className={`p-2 lg:p-3 rounded-full ${bgColor} shrink-0 ml-3`}>
          <IconComponent className={`w-5 h-5 lg:w-6 lg:h-6 ${color}`} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
