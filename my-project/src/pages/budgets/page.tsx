import { useState } from "react";
import { Plus } from "lucide-react";
import { useBudgets } from "../../hooks/useBudgets";
import type { BudgetType } from "../../lib/types";
import BudgetCard from "../../components/budgets/BudgetCard";
import FormDataBudgetModal from "../../components/budgets/FormDataBudgetModal";
import SummaryCards from "../../components/budgets/SummaryCards";
import BudgetGridSkeleton from "../../components/ui/BudgetGridSkeleton";
import GridErrorHandling from "../../components/ui/GridErrorHandling";
import GridNoData from "../../components/ui/GridNoData";
import Pagination from "../../components/ui/Pagination";
const BudgetsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<BudgetType | null>(null);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);

  const { data, isLoading, error } = useBudgets(page, limit);

  const handleOpenAddModal = () => {
    setIsEdit(false);
    setIsDelete(false);
    setSelectedBudget(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (budget: BudgetType) => {
    setIsEdit(true);
    setIsDelete(false);
    setSelectedBudget(budget);
    setIsModalOpen(true);
  };

  const handleOpenDeleteModal = (budget: BudgetType) => {
    setIsEdit(false);
    setIsDelete(true);
    setSelectedBudget(budget);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };



  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Budgets</h1>
        <p className="text-gray-600">
          Manage your spending limits
        </p>
      </div>

      {/* Summary Cards */}
      <SummaryCards />

      {/* Action Bar */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Your Budgets</h2>
        <button
          onClick={handleOpenAddModal}
          className="flex items-center space-x-2 px-4 py-2 shadow-md bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add New Budget</span>
        </button>
      </div>

      {isLoading && <BudgetGridSkeleton />}

      {!isLoading && error && <GridErrorHandling title="budgets" />}

      {!isLoading && !error && data && data.budgets && data.budgets.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
            {data.budgets.map((budget: BudgetType) => (
              <BudgetCard
                key={budget._id}
                budget={budget}
                onEdit={handleOpenEditModal}
                onDelete={handleOpenDeleteModal}
              />
            ))}
          </div>
          {data.totalPages > 1 && (
            <div className="mt-8">
              <Pagination
                limit={limit}
                page={page}
                total={data.total}
                totalPages={data.totalPages}
                setPage={setPage}
                setLimit={setLimit}
              />
            </div>
          )}
        </>
      )}

      {!isLoading && !error && (!data || !data.budgets || data.budgets.length === 0) && (
        <GridNoData
          title="No budgets yet"
          message="Set spending limits to keep your finances on track. Add your first budget to get started."
          buttonText="Create Budget"
          onAdd={handleOpenAddModal}
        />
      )}

      {isModalOpen && (
        <FormDataBudgetModal
          isModalOpen={isModalOpen}
          isCloseModal={handleCloseModal}
          isEdit={isEdit}
          isDelete={isDelete}
          selectedBudget={selectedBudget}
        />
      )}
    </div>
  );
};

export default BudgetsPage;
