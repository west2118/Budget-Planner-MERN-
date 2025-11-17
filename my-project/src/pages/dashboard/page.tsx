"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  PiggyBank,
  Target as TargetIcon,
  Bell,
} from "lucide-react";
import { useUserStore } from "../../stores/useUserStore";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SummaryCards from "../../components/dashboard/SummaryCards";
import ChartsCard from "../../components/dashboard/ChartsCard";
import GoalsActionsCard from "../../components/dashboard/GoalsActionsCard";

const DashboardPage = () => {
  const token = useUserStore((state) => state.userToken);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard-data"],
    queryFn: async () => {
      if (!token) return null;

      const [transactionsRes, goalsRes] = await Promise.all([
        axios.get("http://localhost:8080/api/v1/transactions", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:8080/api/v1/goals", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      return {
        transactions: transactionsRes.data,
        goals: goalsRes.data,
      };
    },
    enabled: !!token,
  });

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
      <SummaryCards summaryData={summaryData} />

      {/* Charts Section */}
      <ChartsCard categoryData={categoryData} monthlyData={monthlyData} />

      {/* Goals and Quick Actions Section */}
      <GoalsActionsCard goalsData={goalsData} />
    </div>
  );
};

export default DashboardPage;
