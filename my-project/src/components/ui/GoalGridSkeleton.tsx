import React from "react";

const GoalGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6 w-full">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
          {/* Header area */}
          <div className="p-4 lg:p-6 border-b border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3 w-full">
                <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-5 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
              <div className="w-8 h-8 bg-gray-200 rounded-md"></div>
            </div>
            {/* Progress area */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full"></div>
              <div className="flex justify-between">
                <div className="h-3 bg-gray-200 rounded w-1/5"></div>
                <div className="h-3 bg-gray-200 rounded w-1/5"></div>
              </div>
            </div>
          </div>
          {/* Details area */}
          <div className="p-4 lg:p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
            <div className="h-10 bg-gray-100 rounded-lg w-full"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GoalGridSkeleton;
