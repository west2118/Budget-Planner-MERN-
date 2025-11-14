import React, { useState } from "react";
import {
  Plus,
  Target,
  Calendar,
  DollarSign,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";
import FormDataGoalModal from "../../components/goals/FormDataGoalModal";
import { useUserStore } from "../../stores/useUserStore";
import GoalCard from "../../components/goals/GoalCard";
import { fetchData } from "../../lib/utils";
import { useQuery } from "@tanstack/react-query";
import type { GoalType } from "../../lib/types";

const GoalsPage = () => {
  const token = useUserStore((state) => state.userToken);
  // Static goals data
  const goals = [
    {
      id: 1,
      title: "Emergency Fund",
      targetAmount: 10000,
      currentAmount: 6500,
      progress: 65,
      deadline: "2024-12-31",
      category: "Savings",
      completed: false,
      color: "bg-blue-500",
      icon: Target,
    },
    {
      id: 2,
      title: "New Laptop",
      targetAmount: 2000,
      currentAmount: 1200,
      progress: 60,
      deadline: "2024-06-30",
      category: "Electronics",
      completed: false,
      color: "bg-green-500",
      icon: TrendingUp,
    },
    {
      id: 3,
      title: "Vacation to Japan",
      targetAmount: 5000,
      currentAmount: 1500,
      progress: 30,
      deadline: "2024-09-15",
      category: "Travel",
      completed: false,
      color: "bg-purple-500",
      icon: Calendar,
    },
    {
      id: 4,
      title: "Car Down Payment",
      targetAmount: 8000,
      currentAmount: 8000,
      progress: 100,
      deadline: "2024-03-31",
      category: "Vehicle",
      completed: true,
      color: "bg-emerald-500",
      icon: CheckCircle2,
    },
    {
      id: 5,
      title: "Home Renovation",
      targetAmount: 15000,
      currentAmount: 4500,
      progress: 30,
      deadline: "2024-11-30",
      category: "Home",
      completed: false,
      color: "bg-orange-500",
      icon: DollarSign,
    },
    {
      id: 6,
      title: "Wedding Savings",
      targetAmount: 20000,
      currentAmount: 7500,
      progress: 38,
      deadline: "2025-06-30",
      category: "Life Event",
      completed: false,
      color: "bg-pink-500",
      icon: Target,
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, error, isLoading } = useQuery<GoalType[]>({
    queryKey: ["user-goals"],
    queryFn: fetchData("http://localhost:8080/api/v1/goal", token),
    enabled: !!token,
  });

  // Calculate totals
  const totalGoals = goals.length;
  const completedGoals = goals.filter((goal) => goal.completed).length;
  const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const totalSaved = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const overallProgress = Math.round((totalSaved / totalTarget) * 100);

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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* Total Goals */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Goals</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {totalGoals}
              </p>
              <p className="text-green-500 text-sm mt-1">
                {completedGoals} completed
              </p>
            </div>
            <div className="p-3 rounded-full bg-blue-50">
              <Target className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </div>

        {/* Total Target */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Target</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                ${totalTarget.toLocaleString()}
              </p>
              <p className="text-gray-600 text-sm mt-1">Across all goals</p>
            </div>
            <div className="p-3 rounded-full bg-green-50">
              <DollarSign className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </div>

        {/* Total Saved */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Saved</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                ${totalSaved.toLocaleString()}
              </p>
              <p className="text-gray-600 text-sm mt-1">
                ${(totalTarget - totalSaved).toLocaleString()} to go
              </p>
            </div>
            <div className="p-3 rounded-full bg-purple-50">
              <TrendingUp className="w-6 h-6 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Overall Progress */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">
                Overall Progress
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {overallProgress}%
              </p>
              <p className="text-gray-600 text-sm mt-1">
                {completedGoals}/{totalGoals} goals
              </p>
            </div>
            <div className="p-3 rounded-full bg-orange-50">
              <CheckCircle2 className="w-6 h-6 text-orange-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Your Goals</h2>
        <div className="flex space-x-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Add New Goal</span>
          </button>
        </div>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {data?.map((goal) => (
          <GoalCard key={goal._id} goal={goal} />
        ))}
      </div>

      {/* Add Goal Form Modal (Static) */}
      {isModalOpen && (
        <FormDataGoalModal
          isModalOpen={isModalOpen}
          isCloseModal={() => setIsModalOpen(false)}
          token={token}
          isEdit={false}
          selectedGoal={null}
        />
      )}
    </div>
  );
};

export default GoalsPage;
