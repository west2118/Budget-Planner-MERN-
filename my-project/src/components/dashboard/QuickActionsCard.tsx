import { CreditCard, Plus, Target } from "lucide-react";
import { Link } from "react-router-dom";

const QuickActionsCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 lg:mb-6">
        Quick Actions
      </h3>

      <div className="flex flex-col gap-3 lg:gap-4">
        <Link to="/dashboard/transactions" className="block">
          <button className="w-full flex items-center justify-center space-x-2 p-3 lg:p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-gray-400 transition-colors text-gray-600 hover:text-gray-700 text-sm lg:text-base">
            <Plus className="w-4 h-4 lg:w-5 lg:h-5" />
            <span>Add Transaction</span>
          </button>
        </Link>

        <Link to="/dashboard/cards" className="block">
          <button className="w-full flex items-center justify-center space-x-2 p-3 lg:p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-gray-400 transition-colors text-gray-600 hover:text-gray-700 text-sm lg:text-base">
            <CreditCard className="w-4 h-4 lg:w-5 lg:h-5" />
            <span>Add Card</span>
          </button>
        </Link>

        <Link to="/dashboard/goals" className="block">
          <button className="w-full flex items-center justify-center space-x-2 p-3 lg:p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-gray-400 transition-colors text-gray-600 hover:text-gray-700 text-sm lg:text-base">
            <Target className="w-4 h-4 lg:w-5 lg:h-5" />
            <span>Add Goal</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default QuickActionsCard;
