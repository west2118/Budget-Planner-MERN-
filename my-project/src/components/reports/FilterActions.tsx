import { Calendar, Download, Filter } from "lucide-react";

const FilterActions = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Date Range */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date Range
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white">
                <option>January 2024</option>
                <option>February 2024</option>
                <option>March 2024</option>
                <option>April 2024</option>
                <option>May 2024</option>
                <option>June 2024</option>
                <option>July 2024</option>
                <option>August 2024</option>
                <option>September 2024</option>
                <option>October 2024</option>
                <option>November 2024</option>
                <option>December 2024</option>
              </select>
            </div>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white">
                <option>2024</option>
                <option>2023</option>
                <option>2022</option>
              </select>
            </div>
          </div>
        </div>

        {/* Report Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Report Type
          </label>
          <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white">
            <option>Monthly Summary</option>
            <option>Yearly Overview</option>
            <option>Spending Analysis</option>
            <option>Income Report</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex items-end space-x-3">
          <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Apply</span>
          </button>
          <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterActions;
