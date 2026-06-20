
import { Calendar, Download } from "lucide-react";

type Filters = {
  startDate: string;
  endDate: string;
  reportType: string;
};

type FilterActionsProps = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
};

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const FilterActions = ({ filters, setFilters }: FilterActionsProps) => {
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "reportType") {
      const now = new Date();
      let start = filters.startDate;
      let end = filters.endDate;

      if (value === "Weekly") {
        const lastWeek = new Date();
        lastWeek.setDate(now.getDate() - 6);
        start = formatDate(lastWeek);
        end = formatDate(now);
      } else if (value === "Monthly") {
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
        const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        start = formatDate(firstDay);
        end = formatDate(lastDay);
      } else if (value === "Annually" || value === "Yearly") {
        const firstDayOfYear = new Date(now.getFullYear(), 0, 1);
        const lastDayOfYear = new Date(now.getFullYear(), 11, 31);
        start = formatDate(firstDayOfYear);
        end = formatDate(lastDayOfYear);
      }

      setFilters((prev) => ({
        ...prev,
        reportType: value,
        startDate: start,
        endDate: end,
      }));
    } else {
      setFilters((prev) => ({ ...prev, [name]: value }));
    }
  };

  const isDateDisabled = filters.reportType !== "Range";

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        {/* Date Range - Start */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Start Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
              disabled={isDateDisabled}
              className={`w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${isDateDisabled ? "bg-gray-100 cursor-not-allowed text-gray-500" : "bg-white"}`}
            />
          </div>
        </div>

        {/* Date Range - End */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            End Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
              disabled={isDateDisabled}
              className={`w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${isDateDisabled ? "bg-gray-100 cursor-not-allowed text-gray-500" : "bg-white"}`}
            />
          </div>
        </div>

        {/* Report Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Report Type
          </label>
          <select
            name="reportType"
            value={filters.reportType}
            onChange={handleFilterChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Annually">Annually</option>
            <option value="Yearly">Yearly</option>
            <option value="Range">Range</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterActions;
