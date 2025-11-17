import React from "react";

const SummaryCards = ({ summaryData }: { summaryData: any }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
      {summaryData.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm p-4 lg:p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-gray-600 text-sm font-medium truncate">
                  {item.title}
                </p>
                <p className="text-xl lg:text-2xl font-bold text-gray-900 mt-1 lg:mt-2 truncate">
                  {item.amount}
                </p>
                <p
                  className={`text-xs lg:text-sm mt-1 ${
                    item.trend === "up" ? "text-green-500" : "text-red-500"
                  }`}>
                  {item.change} from last month
                </p>
              </div>
              <div
                className={`p-2 lg:p-3 rounded-full ${item.bgColor} shrink-0 ml-3`}>
                <IconComponent
                  className={`w-5 h-5 lg:w-6 lg:h-6 ${item.color}`}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SummaryCards;
