import {
  Download,
  Edit,
  Filter,
  Plus,
  Search,
  Trash2,
  Upload,
} from "lucide-react";
import SearchFilterCard from "../../components/transactions/SearchFilterCard";
import FormDataTransaction from "../../components/transactions/FormDataTransactionModal";
import { useState } from "react";
import { useUserStore } from "../../stores/useUserStore";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../lib/utils";
import TransactionTable from "../../components/transactions/TransactionTable";
import type { TransactionType } from "../../lib/types";

// Replaced static transaction data with dynamic fetch

const TransactionsPage = () => {
  const token = useUserStore((state) => state.userToken);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<TransactionType | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const handleEditTransaction = (transaction: TransactionType) => {
    setIsEdit(true);
    setIsModalOpen(true);
    setSelectedTransaction(transaction);
  };

  const handleDeleteTransaction = (transaction: TransactionType) => {
    setIsDelete(true);
    setIsModalOpen(true);
    setSelectedTransaction(transaction);
  };

  const handleCloseTransaction = () => {
    setSelectedTransaction(null);
    setIsEdit(false);
    setIsDelete(false);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
        <p className="text-gray-600">
          Manage all your income and expense records
        </p>
      </div>

      {/* Search and Filter Bar */}
      <SearchFilterCard handleOpenAddModal={() => setIsModalOpen(true)} />

      {/* Export/Import Buttons */}
      <div className="flex justify-end items-center mb-4">
        <div className="flex space-x-2">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
            <Upload className="w-4 h-4" />
            <span>Import</span>
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <TransactionTable
        handleEditTransaction={handleEditTransaction}
        handleDeleteTransaction={handleDeleteTransaction}
      />

      {/* Transaction Form Modal (Static) */}
      {isModalOpen && (
        <FormDataTransaction
          token={token}
          isModalOpen={isModalOpen}
          isCloseModal={handleCloseTransaction}
          isEdit={isEdit}
          selectedTransaction={selectedTransaction}
          isDelete={isDelete}
        />
      )}
    </div>
  );
};

export default TransactionsPage;
