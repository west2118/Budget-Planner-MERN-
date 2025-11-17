import type { TransactionType } from "../../lib/types";
import { Edit, Trash2 } from "lucide-react";

const TransactionRow = ({
  transaction,
  handleEditTransaction,
  handleDeleteTransaction,
}: {
  transaction: TransactionType;
  handleEditTransaction: (transaction: TransactionType) => void;
  handleDeleteTransaction: (transaction: TransactionType) => void;
}) => {
  console.log(transaction);

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {new Date(transaction.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            transaction.type === "Income"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}>
          {transaction.type}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {transaction.category}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <span
          className={
            transaction.type === "Income" ? "text-green-600" : "text-red-600"
          }>
          {transaction.type === "Income" ? "+" : "-"}
          {transaction.amount.toFixed(2)}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {transaction.cardId.name}
      </td>
      <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
        {transaction.note?.trim() || "———"}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex space-x-2">
          <button
            onClick={() => handleEditTransaction(transaction)}
            className="text-blue-600 hover:text-blue-900 transition-colors">
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDeleteTransaction(transaction)}
            className="text-red-600 hover:text-red-900 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TransactionRow;
