
import SearchFilterCard from "../../components/transactions/SearchFilterCard";
import FormDataTransaction from "../../components/transactions/FormDataTransactionModal";
import SummaryCards from "../../components/dashboard/SummaryCards";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import TransactionTable from "../../components/transactions/TransactionTable";
import type { TransactionType } from "../../lib/types";

// Replaced static transaction data with dynamic fetch

const TransactionsPage = () => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<TransactionType | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [defaultCardId, setDefaultCardId] = useState<string | undefined>();

  useEffect(() => {
    if (location.state?.openAddModal) {
      setIsModalOpen(true);
      if (location.state.defaultCardId) {
        setDefaultCardId(location.state.defaultCardId);
      }
      // Clear the state so a page refresh doesn't re-trigger the modal
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

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
    setDefaultCardId(undefined);
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

      {/* Summary Cards */}
      <SummaryCards />

      {/* Search and Filter Bar */}
      <SearchFilterCard handleOpenAddModal={() => setIsModalOpen(true)} />

      {/* Transactions Table */}
      <TransactionTable
        handleEditTransaction={handleEditTransaction}
        handleDeleteTransaction={handleDeleteTransaction}
      />

      {/* Transaction Form Modal (Static) */}
      {isModalOpen && (
        <FormDataTransaction
          isModalOpen={isModalOpen}
          isCloseModal={handleCloseTransaction}
          isEdit={isEdit}
          selectedTransaction={selectedTransaction}
          isDelete={isDelete}
          defaultCardId={defaultCardId}
        />
      )}
    </div>
  );
};

export default TransactionsPage;
