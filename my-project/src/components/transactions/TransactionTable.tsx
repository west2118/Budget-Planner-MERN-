import { Edit, Trash2 } from "lucide-react";
import React from "react";
import type { TransactionType } from "../../lib/types";
import TransactionRow from "./TransactionRow";
import { useTransactions } from "../../hooks/useTransactions";

const TransactionTable = ({
  handleEditTransaction,
  handleDeleteTransaction,
}: {
  handleEditTransaction: (transaction: TransactionType) => void;
  handleDeleteTransaction: (transaction: TransactionType) => void;
}) => {
  const { data: dataTransactions, isLoading, error } = useTransactions(true);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center" role="alert">
        <strong className="font-bold">Error! </strong>
        <span className="block sm:inline">Failed to load transactions data. Please try again later.</span>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Card
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Note
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {dataTransactions?.map((transaction) => (
              <TransactionRow
                key={transaction._id}
                transaction={transaction}
                handleEditTransaction={handleEditTransaction}
                handleDeleteTransaction={handleDeleteTransaction}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination (Visual only for now) */}
      <div className="bg-white px-6 py-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{dataTransactions?.length ? 1 : 0}</span> to{" "}
            <span className="font-medium">{dataTransactions?.length || 0}</span> of{" "}
            <span className="font-medium">{dataTransactions?.length || 0}</span> results
          </div>
          <div className="flex space-x-2">
            <button
              disabled
              className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-300 bg-gray-50 cursor-not-allowed">
              Previous
            </button>
            <button className="px-3 py-1 border border-blue-500 bg-blue-50 text-blue-600 rounded-md text-sm font-medium">
              1
            </button>
            <button
              disabled
              className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-300 bg-gray-50 cursor-not-allowed">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
