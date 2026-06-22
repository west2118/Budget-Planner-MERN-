import { Filter, Plus, Search } from "lucide-react";

const typeOptions = ["All", "Income", "Expense"];
const categoryOptions = [
  "All",
  "Food & Dining",
  "Shopping",
  "Transport",
  "Entertainment",
  "Bills",
  "Salary",
  "Freelance",
];

type SearchFilterCardProps = {
  handleOpenAddModal: () => void;
};

const SearchFilterCard = ({ handleOpenAddModal }: SearchFilterCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search transactions..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Type Filter */}
        <div className="w-full lg:w-48">
          <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white">
            {typeOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Category Filter */}
        <div className="w-full lg:w-48">
          <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white">
            {categoryOptions.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="w-full lg:w-auto flex space-x-3">
          <button
            onClick={handleOpenAddModal}
            className="w-full lg:w-auto flex items-center justify-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors whitespace-nowrap">
            <Plus className="w-4 h-4" />
            <span>Add Transaction</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilterCard;
