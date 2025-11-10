import React from "react";
import {
  Plus,
  Target,
  Calendar,
  DollarSign,
  TrendingUp,
  CheckCircle2,
  Edit,
  Trash2,
  PlusCircle,
} from "lucide-react";

const GoalsPage = () => {
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
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Add New Goal</span>
          </button>
        </div>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {goals.map((goal) => {
          const IconComponent = goal.icon;
          const daysLeft = Math.ceil(1 / (1000 * 60 * 60 * 24));

          return (
            <div
              key={goal.id}
              className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden ${
                goal.completed ? "ring-2 ring-emerald-200" : ""
              }`}>
              {/* Goal Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 rounded-lg ${goal.color} bg-opacity-10`}>
                      <IconComponent
                        className={`w-5 h-5 ${goal.color.replace(
                          "bg-",
                          "text-"
                        )}`}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {goal.title}
                      </h3>
                      <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full mt-1">
                        {goal.category}
                      </span>
                    </div>
                  </div>
                  {goal.completed && (
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                  )}
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-semibold text-gray-900">
                      {goal.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${goal.color} transition-all duration-500`}
                      style={{ width: `${goal.progress}%` }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>${goal.currentAmount.toLocaleString()}</span>
                    <span>${goal.targetAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Goal Details */}
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <p className="text-gray-500">Target</p>
                    <p className="font-semibold text-gray-900">
                      ${goal.targetAmount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Current</p>
                    <p className="font-semibold text-gray-900">
                      ${goal.currentAmount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Remaining</p>
                    <p className="font-semibold text-gray-900">
                      $
                      {(
                        goal.targetAmount - goal.currentAmount
                      ).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Deadline</p>
                    <p className="font-semibold text-gray-900">
                      {new Date(goal.deadline).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                {/* Days Left */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-4">
                  <span className="text-sm text-gray-600">Days left</span>
                  <span
                    className={`text-sm font-semibold ${
                      daysLeft < 30 ? "text-red-600" : "text-gray-900"
                    }`}>
                    {daysLeft} days
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  {!goal.completed && (
                    <button className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm">
                      <PlusCircle className="w-4 h-4" />
                      <span>Add Money</span>
                    </button>
                  )}
                  <button className="flex items-center justify-center px-3 py-2 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors text-sm">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="flex items-center justify-center px-3 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors text-sm">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Goal Form Modal (Static) */}
      <div className="hidden fixed inset-0 bg-black bg-opacity-50 items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Create New Goal
              </h3>
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form className="space-y-4">
              {/* Goal Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Goal Title
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Emergency Fund, New Car, Vacation"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="Savings">Savings</option>
                  <option value="Travel">Travel</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Vehicle">Vehicle</option>
                  <option value="Home">Home</option>
                  <option value="Education">Education</option>
                  <option value="Life Event">Life Event</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Target Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Target Amount
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0.00"
                />
              </div>

              {/* Current Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Amount{" "}
                  <span className="text-gray-500 text-sm">(Optional)</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0.00"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Amount already saved for this goal
                </p>
              </div>

              {/* Deadline */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Deadline
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description{" "}
                  <span className="text-gray-500 text-sm">(Optional)</span>
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Add a description for your goal..."
                />
              </div>

              {/* Buttons */}
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  Create Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalsPage;
