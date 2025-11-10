import type { CardType } from "../../lib/types";
import { CreditCard, DollarSign, TrendingDown, TrendingUp } from "lucide-react";

const SummaryCards = ({ cards }: { cards: CardType[] | undefined }) => {
  // Calculate totals
  const totalBalance = cards?.reduce((sum, card) => sum + card.balance, 0);
  const creditCards = cards?.filter((card) => card.type === "Credit");
  const totalCreditLimit = cards?.reduce(
    (sum, card) => sum + (card.budgetLimit || 0),
    0
  );
  const totalCreditUsed = cards?.reduce((sum, card) => sum + card.balance, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Total Balance */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium">Total Balance</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              ${totalBalance}
            </p>
            <p className="text-green-500 text-sm mt-1 flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              +2.5% from last month
            </p>
          </div>
          <div className="p-3 rounded-full bg-green-50">
            <DollarSign className="w-6 h-6 text-green-500" />
          </div>
        </div>
      </div>

      {/* Credit Utilization */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium">
              Credit Utilization
            </p>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {(totalCreditLimit ?? 0) > 0
                ? Math.round(
                    ((totalCreditUsed ?? 0) / (totalCreditLimit ?? 0)) * 100
                  )
                : 0}
              %
            </p>
            <p className="text-gray-600 text-sm mt-1">
              ${totalCreditUsed} of ${totalCreditLimit}
            </p>
          </div>
          <div className="p-3 rounded-full bg-blue-50">
            <CreditCard className="w-6 h-6 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Total Cards */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium">Total Cards</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {cards?.length}
            </p>
            <p className="text-gray-600 text-sm mt-1">
              {creditCards?.length} credit,{" "}
              {(cards?.length ?? 0) - (creditCards?.length ?? 0)} others
            </p>
          </div>
          <div className="p-3 rounded-full bg-purple-50">
            <TrendingDown className="w-6 h-6 text-purple-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;
