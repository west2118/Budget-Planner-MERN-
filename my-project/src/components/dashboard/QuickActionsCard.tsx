import { Link } from "react-router-dom";
import { useCards } from "../../hooks/useCards";
import { CreditCard, Plus } from "lucide-react";

const QuickActionsCard = () => {
  const { data: cards, isLoading } = useCards();

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 lg:mb-6">
        Quick Transaction
      </h3>

      <div className="flex flex-col gap-3 lg:gap-4 max-h-[300px] overflow-y-auto pr-2">
        {isLoading ? (
          <div className="animate-pulse space-y-3">
            <div className="h-12 bg-gray-100 rounded-xl"></div>
            <div className="h-12 bg-gray-100 rounded-xl"></div>
          </div>
        ) : cards && cards.length > 0 ? (
          cards.map((card) => (
            <Link
              key={card._id}
              to="/dashboard/transactions"
              state={{ openAddModal: true, defaultCardId: card._id }}
              className="block"
            >
              <button className="w-full flex items-center justify-between p-3 lg:p-4 border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-colors text-gray-700 text-sm lg:text-base">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-4 h-4 lg:w-5 lg:h-5 text-blue-500" />
                  <span className="font-medium text-left truncate max-w-[120px]">{card.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 text-sm">${card.balance.toLocaleString()}</span>
                  <Plus className="w-4 h-4 text-gray-400 shrink-0" />
                </div>
              </button>
            </Link>
          ))
        ) : (
          <p className="text-gray-500 text-sm text-center py-4">
            No cards found. Create a card first.
          </p>
        )}
      </div>
    </div>
  );
};

export default QuickActionsCard;
