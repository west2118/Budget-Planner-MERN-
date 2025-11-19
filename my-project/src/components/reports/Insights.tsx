import { DollarSign, TrendingDown, TrendingUp } from "lucide-react";
import React from "react";

const Insights = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Financial Insights
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-4 h-4 text-blue-500" />
            <span className="font-semibold text-blue-700">Positive Trend</span>
          </div>
          <p className="text-sm text-blue-600">
            Your savings rate increased by 4.1% compared to last year. Keep it
            up!
          </p>
        </div>

        <div className="p-4 bg-yellow-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingDown className="w-4 h-4 text-yellow-500" />
            <span className="font-semibold text-yellow-700">Watch Out</span>
          </div>
          <p className="text-sm text-yellow-600">
            Entertainment spending is 15% higher than budget. Consider adjusting
            your limits.
          </p>
        </div>

        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <DollarSign className="w-4 h-4 text-green-500" />
            <span className="font-semibold text-green-700">Great Job</span>
          </div>
          <p className="text-sm text-green-600">
            You've stayed under budget for 3 consecutive months. Excellent
            financial discipline!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Insights;
