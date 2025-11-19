import { DollarSign, TrendingDown, TrendingUp } from "lucide-react";
import React from "react";

// Static summary statistics
const summaryStats = [
  {
    title: "Total Income",
    value: "$58,400",
    change: "+12.5%",
    trend: "up",
    icon: TrendingUp,
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    title: "Total Expenses",
    value: "$39,200",
    change: "+8.2%",
    trend: "down",
    icon: TrendingDown,
    color: "text-red-500",
    bgColor: "bg-red-50",
  },
  {
    title: "Net Savings",
    value: "$19,200",
    change: "+15.3%",
    trend: "up",
    icon: DollarSign,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    title: "Savings Rate",
    value: "32.9%",
    change: "+4.1%",
    trend: "up",
    icon: TrendingUp,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
];

const SummaryStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {summaryStats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {stat.value}
                </p>
                <p
                  className={`text-sm mt-1 ${
                    stat.trend === "up" ? "text-green-500" : "text-red-500"
                  }`}>
                  {stat.change} from last period
                </p>
              </div>
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                <IconComponent className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SummaryStats;
