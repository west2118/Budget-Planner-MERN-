import { CreditCard, Edit, Trash2 } from "lucide-react";
import { accountColor } from "../../lib/constants";

const CardsCard = ({ card }: { card: any }) => {
  const assignedColor = accountColor.find((color) => color.name === card.type);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Card Preview */}
      <div
        className={`${assignedColor?.color} ${assignedColor?.textColor} p-6`}>
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-sm opacity-90">{card.name}</p>
            <p className="text-lg font-semibold mt-1">
              {card?.type === "Cash" ? "Card" : "**** **** ****"}
            </p>
          </div>
          <CreditCard className="w-8 h-8 opacity-90" />
        </div>

        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs opacity-90">Balance</p>
            <p className="text-xl font-bold">
              ${card.balance.toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs opacity-90">Type</p>
            <p className="text-sm font-semibold">{card.type}</p>
          </div>
        </div>

        {/* Credit Limit Progress Bar */}
        {card.budgetLimit && (
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1">
              <span>Credit Used</span>
              <span>{card.usedPercentage}%</span>
            </div>
            <div className="w-full bg-white bg-opacity-30 rounded-full h-2">
              <div
                className="bg-white h-2 rounded-full"
                style={{ width: `${card.usedPercentage}%` }}></div>
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span>${card.balance.toLocaleString()}</span>
              <span>${card.budgetLimit.toLocaleString()}</span>
            </div>
          </div>
        )}
      </div>

      {/* Card Details */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Type</p>
            <p className="font-medium">{card.type}</p>
          </div>
          <div>
            <p className="text-gray-500">Balance</p>
            <p className="font-medium">${card.balance.toLocaleString()}</p>
          </div>
          {card.budgetLimit && (
            <>
              <div>
                <p className="text-gray-500">Limit</p>
                <p className="font-medium">
                  ${card.budgetLimit.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Available</p>
                <p className="font-medium text-green-600">
                  ${(card.budgetLimit - card.balance).toLocaleString()}
                </p>
              </div>
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 mt-4 pt-4 border-t border-gray-100">
          <button className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors text-sm">
            <Edit className="w-4 h-4" />
            <span>Edit</span>
          </button>
          <button className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors text-sm">
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardsCard;
