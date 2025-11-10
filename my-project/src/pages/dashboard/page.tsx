"use client";

import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  Plus,
  CreditCard,
  PiggyBank,
  Home,
  BarChart3,
  Wallet,
  Target as TargetIcon,
  Settings,
  User,
  Bell,
  HelpCircle,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useUserStore } from "../../stores/useUserStore";

const DashboardPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  // Static data for summary cards
  const summaryData = [
    {
      title: "Total Income",
      amount: "$5,250.00",
      change: "+12%",
      trend: "up",
      icon: TrendingUp,
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      title: "Total Expenses",
      amount: "$3,890.00",
      change: "+8%",
      trend: "down",
      icon: TrendingDown,
      color: "text-red-500",
      bgColor: "bg-red-50",
    },
    {
      title: "Balance",
      amount: "$1,360.00",
      change: "+5%",
      trend: "up",
      icon: DollarSign,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
  ];

  // Static data for spending by category (Pie Chart)
  const categoryData = [
    { name: "Food & Dining", value: 35, color: "#FF6B6B" },
    { name: "Shopping", value: 25, color: "#4ECDC4" },
    { name: "Transport", value: 15, color: "#45B7D1" },
    { name: "Entertainment", value: 12, color: "#FFA07A" },
    { name: "Bills", value: 8, color: "#98D8C8" },
    { name: "Others", value: 5, color: "#F7DC6F" },
  ];

  // Static data for income vs expense (Bar Chart)
  const monthlyData = [
    { month: "Jan", income: 4000, expense: 2400 },
    { month: "Feb", income: 3000, expense: 1398 },
    { month: "Mar", income: 2000, expense: 980 },
    { month: "Apr", income: 2780, expense: 3908 },
    { month: "May", income: 1890, expense: 4800 },
    { month: "Jun", income: 2390, expense: 3800 },
  ];

  // Static data for goals
  const goalsData = [
    {
      title: "Emergency Fund",
      target: 10000,
      current: 6500,
      progress: 65,
      icon: PiggyBank,
      color: "bg-blue-500",
    },
    {
      title: "New Laptop",
      target: 2000,
      current: 1200,
      progress: 60,
      icon: Target,
      color: "bg-green-500",
    },
    {
      title: "Vacation",
      target: 3000,
      current: 900,
      progress: 30,
      icon: Target,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="p-4 lg:p-6">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                Dashboard
              </h1>
              <p className="text-gray-600 text-sm lg:text-base">
                Your financial overview
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3 lg:space-x-4">
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-linear-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">JD</span>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
        {summaryData.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-4 lg:p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-gray-600 text-sm font-medium truncate">
                    {item.title}
                  </p>
                  <p className="text-xl lg:text-2xl font-bold text-gray-900 mt-1 lg:mt-2 truncate">
                    {item.amount}
                  </p>
                  <p
                    className={`text-xs lg:text-sm mt-1 ${
                      item.trend === "up" ? "text-green-500" : "text-red-500"
                    }`}>
                    {item.change} from last month
                  </p>
                </div>
                <div
                  className={`p-2 lg:p-3 rounded-full ${item.bgColor} shrink-0 ml-3`}>
                  <IconComponent
                    className={`w-5 h-5 lg:w-6 lg:h-6 ${item.color}`}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6 mb-6 lg:mb-8">
        {/* Spending by Category Pie Chart */}
        <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Spending by Category
          </h3>
          <div className="h-64 sm:h-72 lg:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={isMobile ? 40 : 60}
                  outerRadius={isMobile ? 60 : 80}
                  paddingAngle={2}
                  dataKey="value">
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend
                  layout={isMobile ? "horizontal" : "vertical"}
                  verticalAlign={isMobile ? "bottom" : "middle"}
                  align={isMobile ? "center" : "right"}
                  wrapperStyle={{
                    paddingTop: isMobile ? "10px" : "0",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Income vs Expense Bar Chart */}
        <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Income vs Expense
          </h3>
          <div className="h-64 sm:h-72 lg:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" fontSize={isMobile ? 12 : 14} />
                <YAxis fontSize={isMobile ? 12 : 14} />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="income"
                  fill="#4ECDC4"
                  name="Income"
                  radius={[2, 2, 0, 0]}
                />
                <Bar
                  dataKey="expense"
                  fill="#FF6B6B"
                  name="Expense"
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Goals and Quick Actions Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Goals Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4 lg:mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Active Goals
              </h3>
            </div>
            <div className="space-y-4 lg:space-y-6">
              {goalsData.map((goal, index) => {
                const IconComponent = goal.icon;
                return (
                  <div key={index} className="space-y-2 lg:space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 lg:space-x-3 min-w-0 flex-1">
                        <div
                          className={`p-1 lg:p-2 rounded-lg ${goal.color} bg-opacity-10 shrink-0`}>
                          <IconComponent
                            className={`w-4 h-4 ${goal.color.replace(
                              "bg-",
                              "text-"
                            )}`}
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-gray-900 truncate">
                            {goal.title}
                          </p>
                          <p className="text-xs lg:text-sm text-gray-600 truncate">
                            ${goal.current.toLocaleString()} of $
                            {goal.target.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 shrink-0 ml-2">
                        {goal.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${goal.color}`}
                        style={{ width: `${goal.progress}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 lg:mb-6">
            Quick Actions
          </h3>
          <div className="space-y-3 lg:space-y-4">
            <button className="w-full flex items-center justify-center space-x-2 p-3 lg:p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-gray-400 transition-colors text-gray-600 hover:text-gray-700 text-sm lg:text-base">
              <Plus className="w-4 h-4 lg:w-5 lg:h-5" />
              <span>Add Transaction</span>
            </button>

            <button className="w-full flex items-center justify-center space-x-2 p-3 lg:p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-gray-400 transition-colors text-gray-600 hover:text-gray-700 text-sm lg:text-base">
              <CreditCard className="w-4 h-4 lg:w-5 lg:h-5" />
              <span>Add Card</span>
            </button>

            <button className="w-full flex items-center justify-center space-x-2 p-3 lg:p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-gray-400 transition-colors text-gray-600 hover:text-gray-700 text-sm lg:text-base">
              <Target className="w-4 h-4 lg:w-5 lg:h-5" />
              <span>Add Goal</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
