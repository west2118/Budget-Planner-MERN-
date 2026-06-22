import { Edit, Trash2 } from "lucide-react";
import type { BudgetType } from "../../lib/types";

type BudgetCardProps = {
  budget: BudgetType;
  onEdit: (budget: BudgetType) => void;
  onDelete: (budget: BudgetType) => void;
};

const BudgetCard = ({ budget, onEdit, onDelete }: BudgetCardProps) => {
  const percentage = Math.min((budget.spentAmount / budget.amount) * 100, 100);
  const isOverBudget = budget.spentAmount > budget.amount;

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{budget.budgetName}</h3>
          <p className="text-sm text-gray-500">
            {budget.category} • {budget.period}
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(budget)}
            className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(budget)}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Spent: ${budget.spentAmount.toLocaleString()}</span>
          <span className="font-medium text-gray-900">Limit: ${budget.amount.toLocaleString()}</span>
        </div>

        <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
          <div
            className={`h-2.5 rounded-full ${
              isOverBudget ? "bg-red-500" : percentage > 80 ? "bg-yellow-500" : "bg-blue-500"
            }`}
            style={{ width: `${percentage}%` }}></div>
        </div>

        <div className="flex justify-between text-xs font-medium">
          <span className={isOverBudget ? "text-red-500" : "text-gray-500"}>
            {isOverBudget ? "Over Budget!" : `${percentage.toFixed(0)}% Used`}
          </span>
          <span className={isOverBudget ? "text-red-500" : "text-green-500"}>
            {isOverBudget 
              ? `-$${(budget.spentAmount - budget.amount).toLocaleString()}` 
              : `+$${(budget.amount - budget.spentAmount).toLocaleString()}`
            } Remaining
          </span>
        </div>
      </div>
    </div>
  );
};

export default BudgetCard;
