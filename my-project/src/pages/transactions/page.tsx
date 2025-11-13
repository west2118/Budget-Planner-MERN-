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
import axios from "axios";

// Static transaction data
const transactions = [
  {
    id: 1,
    date: "2024-01-15",
    type: "Expense",
    category: "Food & Dining",
    amount: -45.5,
    card: "Visa **** 1234",
    note: "Lunch at restaurant",
  },
  {
    id: 2,
    date: "2024-01-14",
    type: "Income",
    category: "Salary",
    amount: 2500.0,
    card: "-",
    note: "Monthly salary",
  },
  {
    id: 3,
    date: "2024-01-13",
    type: "Expense",
    category: "Shopping",
    amount: -89.99,
    card: "Mastercard **** 5678",
    note: "New clothes",
  },
  {
    id: 4,
    date: "2024-01-12",
    type: "Expense",
    category: "Transport",
    amount: -25.0,
    card: "Visa **** 1234",
    note: "Fuel",
  },
  {
    id: 5,
    date: "2024-01-11",
    type: "Income",
    category: "Freelance",
    amount: 350.0,
    card: "-",
    note: "Web design project",
  },
  {
    id: 6,
    date: "2024-01-10",
    type: "Expense",
    category: "Entertainment",
    amount: -15.99,
    card: "Mastercard **** 5678",
    note: "Netflix subscription",
  },
  {
    id: 7,
    date: "2024-01-09",
    type: "Expense",
    category: "Bills",
    amount: -120.0,
    card: "Visa **** 1234",
    note: "Electricity bill",
  },
];

const TransactionsPage = () => {
  const token = useUserStore((state) => state.userToken);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["transaction-data"],
    queryFn: async () => {
      if (!token) return null;

      const [transactionsRes, cardsRes] = await Promise.all([
        axios.get("http://localhost:8080/api/v1/transaction", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:8080/api/v1/card", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      return {
        transactions: transactionsRes.data,
        cards: cardsRes.data,
      };
    },
    enabled: !!token,
  });

  console.log(data?.transactions);
  console.log(data?.cards);

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
      <SearchFilterCard handleOpenAddModal={() => setIsAddModalOpen(true)} />

      {/* Export/Import Buttons */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-600">
          Showing {transactions.length} transactions
        </div>
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
      <TransactionTable dataTransactions={data?.transactions} />

      {/* Transaction Form Modal (Static) */}
      {isAddModalOpen && (
        <FormDataTransaction
          token={token}
          isModalOpen={isAddModalOpen}
          isCloseModal={() => setIsAddModalOpen(false)}
          dataCards={data?.cards}
        />
      )}
    </div>
  );
};

export default TransactionsPage;
