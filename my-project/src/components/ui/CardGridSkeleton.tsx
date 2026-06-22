import React from "react";

const CardGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8 w-full">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
          {/* Card Preview Area */}
          <div className="bg-gray-200 p-6">
            <div className="flex justify-between items-start mb-6">
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded w-20"></div>
                <div className="h-6 bg-gray-300 rounded w-32"></div>
              </div>
              <div className="w-8 h-8 bg-gray-300 rounded-md"></div>
            </div>

            <div className="flex justify-between items-center">
              <div className="space-y-2">
                <div className="h-3 bg-gray-300 rounded w-16"></div>
                <div className="h-6 bg-gray-300 rounded w-24"></div>
              </div>
              <div className="space-y-2 text-right">
                <div className="h-3 bg-gray-300 rounded w-10 ml-auto"></div>
                <div className="h-4 bg-gray-300 rounded w-16 ml-auto"></div>
              </div>
            </div>
          </div>

          {/* Details Area */}
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              {[...Array(2)].map((_, j) => (
                <div key={j} className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2 mt-4 pt-4 border-t border-gray-100">
              <div className="flex-1 h-9 bg-gray-100 rounded-lg"></div>
              <div className="flex-1 h-9 bg-gray-100 rounded-lg"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardGridSkeleton;
