import React from "react";

const BudgetGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6 w-full">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="bg-white rounded-xl shadow-sm p-4 lg:p-6 border border-gray-100 hover:shadow-md transition-shadow animate-pulse">
          <div className="flex justify-between items-start mb-4">
            <div className="space-y-2 flex-1">
              <div className="h-5 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
            <div className="flex space-x-2">
              <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
              <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5"></div>
            <div className="flex justify-between">
              <div className="h-3 bg-gray-200 rounded w-1/5"></div>
              <div className="h-3 bg-gray-200 rounded w-1/5"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BudgetGridSkeleton;
