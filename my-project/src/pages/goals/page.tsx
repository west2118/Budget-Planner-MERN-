import React, { useState } from "react";
import { Plus, Target } from "lucide-react";
import FormDataGoalModal from "../../components/goals/FormDataGoalModal";
import { useUserStore } from "../../stores/useUserStore";
import GoalCard from "../../components/goals/GoalCard";
import { useAllGoals } from "../../hooks/useAllGoals";
import type { GoalType } from "../../lib/types";
import SummaryCardsGoals from "../../components/goals/SummaryCardsGoals";

// Static goals data

const GoalsPage = () => {
  const token = useUserStore((state) => state.userToken);
  const [selectedGoal, setSelectedGoal] = useState<GoalType | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("all");
  const limit = 6;

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
      <SummaryCardsGoals goals={data?.goals ?? null} />

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
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-center" role="alert">
          Failed to load goals.
        </div>
      ) : data?.goals?.length === 0 ? (
        <div className="max-w-md flex flex-col items-center justify-center min-h-[300px] bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
            <Target className="w-8 h-8 text-blue-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No Goals Yet</h3>
          <p className="text-gray-500 max-w-sm mb-6">
            Start tracking your financial milestones by creating your first savings goal.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white font-medium rounded-xl hover:bg-blue-600 transition-colors shadow-md hover:shadow-lg">
            <Plus className="w-5 h-5" />
            <span>Create New Goal</span>
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {data?.goals?.map((goal) => (
              <GoalCard
                key={goal._id}
                goal={goal}
                handleEditGoal={handleEditGoal}
                handleDeleteGoal={handleDeleteGoal}
              />
            ))}
          </div>
          {data && data.totalPages > 1 && (
            <div className="flex justify-center items-center space-x-4 mt-8">
              <button
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-gray-600 font-medium">
                Page {page} of {data.totalPages}
              </span>
              <button
                disabled={page === data.totalPages}
                onClick={() => setPage(p => p + 1)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* Add Goal Form Modal (Static) */}
      {isModalOpen && (
        <FormDataGoalModal
          isModalOpen={isModalOpen}
          isCloseModal={handleCloseGoal}
          token={token}
          selectedGoal={selectedGoal}
          isEdit={isEdit}
          isDelete={isDelete}
        />
      )}
    </div>
  );
};

export default GoalsPage;
