import React, { useState } from "react";
import { Plus, Target } from "lucide-react";
import FormDataGoalModal from "../../components/goals/FormDataGoalModal";
import { useUserStore } from "../../stores/useUserStore";
import GoalCard from "../../components/goals/GoalCard";
import { useAllGoals } from "../../hooks/useAllGoals";
import type { GoalType } from "../../lib/types";
import SummaryCardsGoals from "../../components/goals/SummaryCardsGoals";
import GoalGridSkeleton from "../../components/ui/GoalGridSkeleton";
import GridErrorHandling from "../../components/ui/GridErrorHandling";
import GridNoData from "../../components/ui/GridNoData";
import Pagination from "../../components/ui/Pagination";

// Static goals data

const GoalsPage = () => {
  const [selectedGoal, setSelectedGoal] = useState<GoalType | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [status, setStatus] = useState("all");

  const { data, error, isLoading } = useAllGoals(page, limit, status);

  const handleEditGoal = (goal: GoalType) => {
    setIsEdit(true);
    setIsModalOpen(true);
    setSelectedGoal(goal);
  };

  const handleDeleteGoal = (goal: GoalType) => {
    setIsDelete(true);
    setIsModalOpen(true);
    setSelectedGoal(goal);
  };

  const handleCloseGoal = () => {
    setSelectedGoal(null);
    setIsEdit(false);
    setIsDelete(false);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Financial Goals</h1>
        <p className="text-gray-600">
          Track your savings progress and achieve your dreams
        </p>
      </div>

      {/* Summary Cards */}
      <SummaryCardsGoals />

      {/* Action Bar */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Your Goals</h2>
        <div className="flex space-x-4 items-center">
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value="all">All Goals</option>
            <option value="active">Active Goals</option>
            <option value="completed">Completed</option>
          </select>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 shadow-md bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Add New Goal</span>
          </button>
        </div>
      </div>

      {/* Goals Grid */}
      {isLoading && <GoalGridSkeleton />}

      {!isLoading && error && <GridErrorHandling title="goals" />}

      {!isLoading && !error && data?.goals && data.goals.length > 0 && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {data.goals.map((goal) => (
              <GoalCard
                key={goal._id}
                goal={goal}
                handleEditGoal={handleEditGoal}
                handleDeleteGoal={handleDeleteGoal}
              />
            ))}
          </div>

          {data.totalPages > 1 && (
            <div className="mt-8">
              <Pagination
                limit={limit}
                page={page}
                total={undefined}
                totalPages={data.totalPages}
                setPage={setPage}
                setLimit={setLimit}
              />
            </div>
          )}
        </>
      )}

      {!isLoading && !error && (!data?.goals || data.goals.length === 0) && (
        <GridNoData
          title="No Goals Yet"
          message="Start tracking your financial milestones by creating your first savings goal."
          buttonText="Create New Goal"
          onAdd={() => setIsModalOpen(true)}
          Icon={Target}
        />
      )}

      {/* Add Goal Form Modal (Static) */}
      {isModalOpen && (
        <FormDataGoalModal
          isModalOpen={isModalOpen}
          isCloseModal={handleCloseGoal}
          selectedGoal={selectedGoal}
          isEdit={isEdit}
          isDelete={isDelete}
        />
      )}
    </div>
  );
};

export default GoalsPage;
