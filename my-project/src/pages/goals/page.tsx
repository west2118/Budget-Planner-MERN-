import React, { useState } from "react";
import { Plus } from "lucide-react";
import FormDataGoalModal from "../../components/goals/FormDataGoalModal";
import { useUserStore } from "../../stores/useUserStore";
import GoalCard from "../../components/goals/GoalCard";
import { fetchData } from "../../lib/utils";
import { useQuery } from "@tanstack/react-query";
import type { GoalType } from "../../lib/types";
import SummaryCardsGoals from "../../components/goals/SummaryCardsGoals";

// Static goals data

const GoalsPage = () => {
  const token = useUserStore((state) => state.userToken);
  const [selectedGoal, setSelectedGoal] = useState<GoalType | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, error, isLoading } = useQuery<GoalType[]>({
    queryKey: ["user-goals"],
    queryFn: fetchData("http://localhost:8080/api/v1/goal", token),
    enabled: !!token,
  });

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
      <SummaryCardsGoals goals={data ?? null} />

      {/* Action Bar */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Your Goals</h2>
        <div className="flex space-x-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 shadow-md bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Add New Goal</span>
          </button>
        </div>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {data?.map((goal) => (
          <GoalCard
            key={goal._id}
            goal={goal}
            handleEditGoal={handleEditGoal}
            handleDeleteGoal={handleDeleteGoal}
          />
        ))}
      </div>

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
