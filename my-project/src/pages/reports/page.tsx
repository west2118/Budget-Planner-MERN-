"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Download,
  Filter,
  Calendar,
  TrendingUp,
  TrendingDown,
  DollarSign,
  PieChart as PieChartIcon,
  BarChart3,
  LineChart as LineChartIcon,
} from "lucide-react";

const ReportsPage = () => {
  // Static data for Income vs Expenses (Bar Chart)
  const monthlyComparisonData = [
    { month: "Jan", income: 4200, expenses: 2800 },
    { month: "Feb", income: 3800, expenses: 3200 },
    { month: "Mar", income: 5100, expenses: 2900 },
    { month: "Apr", income: 4800, expenses: 3500 },
    { month: "May", income: 5200, expenses: 3100 },
    { month: "Jun", income: 4900, expenses: 3300 },
    { month: "Jul", income: 5300, expenses: 3400 },
    { month: "Aug", income: 4700, expenses: 3600 },
    { month: "Sep", income: 5100, expenses: 3200 },
    { month: "Oct", income: 5400, expenses: 3800 },
    { month: "Nov", income: 5200, expenses: 3500 },
    { month: "Dec", income: 5800, expenses: 4000 },
  ];

  // Static data for Expense by Category (Pie Chart)
  const expenseCategoryData = [
    { name: "Housing", value: 35, color: "#FF6B6B" },
    { name: "Food & Dining", value: 20, color: "#4ECDC4" },
    { name: "Transportation", value: 15, color: "#45B7D1" },
    { name: "Entertainment", value: 12, color: "#FFA07A" },
    { name: "Shopping", value: 10, color: "#98D8C8" },
    { name: "Healthcare", value: 5, color: "#F7DC6F" },
    { name: "Other", value: 3, color: "#BB8FCE" },
  ];

  // Static data for Spending Trend (Line Chart)
  const spendingTrendData = [
    { week: "Week 1", spending: 850, budget: 1000 },
    { week: "Week 2", spending: 720, budget: 1000 },
    { week: "Week 3", spending: 950, budget: 1000 },
    { week: "Week 4", spending: 680, budget: 1000 },
    { week: "Week 5", spending: 890, budget: 1000 },
  ];

  // Static summary statistics
  const summaryStats = [
    {
      title: "Total Income",
      value: "$58,400",
      change: "+12.5%",
      trend: "up",
      icon: TrendingUp,
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      title: "Total Expenses",
      value: "$39,200",
      change: "+8.2%",
      trend: "down",
      icon: TrendingDown,
      color: "text-red-500",
      bgColor: "bg-red-50",
    },
    {
      title: "Net Savings",
      value: "$19,200",
      change: "+15.3%",
      trend: "up",
      icon: DollarSign,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      title: "Savings Rate",
      value: "32.9%",
      change: "+4.1%",
      trend: "up",
      icon: TrendingUp,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
  ];

  // Top spending categories
  const topSpending = [
    { category: "Housing", amount: 13720, percentage: 35 },
    { category: "Food & Dining", amount: 7840, percentage: 20 },
    { category: "Transportation", amount: 5880, percentage: 15 },
    { category: "Entertainment", amount: 4704, percentage: 12 },
    { category: "Shopping", amount: 3920, percentage: 10 },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Financial Reports</h1>
        <p className="text-gray-600">
          Detailed analytics and insights about your finances
        </p>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Date Range */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Range
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white">
                  <option>January 2024</option>
                  <option>February 2024</option>
                  <option>March 2024</option>
                  <option>April 2024</option>
                  <option>May 2024</option>
                  <option>June 2024</option>
                  <option>July 2024</option>
                  <option>August 2024</option>
                  <option>September 2024</option>
                  <option>October 2024</option>
                  <option>November 2024</option>
                  <option>December 2024</option>
                </select>
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white">
                  <option>2024</option>
                  <option>2023</option>
                  <option>2022</option>
                </select>
              </div>
            </div>
          </div>

          {/* Report Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Report Type
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white">
              <option>Monthly Summary</option>
              <option>Yearly Overview</option>
              <option>Spending Analysis</option>
              <option>Income Report</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex items-end space-x-3">
            <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Apply</span>
            </button>
            <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {summaryStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {stat.value}
                  </p>
                  <p
                    className={`text-sm mt-1 ${
                      stat.trend === "up" ? "text-green-500" : "text-red-500"
                    }`}>
                    {stat.change} from last period
                  </p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <IconComponent className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
        {/* Income vs Expenses Bar Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-blue-500" />
              Income vs Expenses
            </h3>
            <span className="text-sm text-gray-500">Monthly Comparison</span>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyComparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="income"
                  fill="#4ECDC4"
                  name="Income"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="expenses"
                  fill="#FF6B6B"
                  name="Expenses"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Expense by Category Pie Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <PieChartIcon className="w-5 h-5 mr-2 text-green-500" />
              Expense by Category
            </h3>
            <span className="text-sm text-gray-500">Year 2024</span>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseCategoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(1 * 100).toFixed(0)}%`
                  }>
                  {expenseCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Additional Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
        {/* Spending Trend Line Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <LineChartIcon className="w-5 h-5 mr-2 text-purple-500" />
              Weekly Spending Trend
            </h3>
            <span className="text-sm text-gray-500">Last 5 Weeks</span>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={spendingTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="spending"
                  stroke="#8884d8"
                  strokeWidth={2}
                  name="Actual Spending"
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="budget"
                  stroke="#82ca9d"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Budget Limit"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Spending Categories */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Top Spending Categories
            </h3>
            <span className="text-sm text-gray-500">Total: $39,200</span>
          </div>
          <div className="space-y-4">
            {topSpending.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.category}</span>
                  <span className="font-semibold text-gray-900">
                    ${item.amount.toLocaleString()} ({item.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-blue-500 transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}></div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Stats */}
          <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">$3,267</p>
              <p className="text-sm text-gray-600">Avg. Monthly Spend</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-500">$1,867</p>
              <p className="text-sm text-gray-600">Avg. Monthly Savings</p>
            </div>
          </div>
        </div>
      </div>

      {/* Insights Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Financial Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-4 h-4 text-blue-500" />
              <span className="font-semibold text-blue-700">
                Positive Trend
              </span>
            </div>
            <p className="text-sm text-blue-600">
              Your savings rate increased by 4.1% compared to last year. Keep it
              up!
            </p>
          </div>

          <div className="p-4 bg-yellow-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingDown className="w-4 h-4 text-yellow-500" />
              <span className="font-semibold text-yellow-700">Watch Out</span>
            </div>
            <p className="text-sm text-yellow-600">
              Entertainment spending is 15% higher than budget. Consider
              adjusting your limits.
            </p>
          </div>

          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <DollarSign className="w-4 h-4 text-green-500" />
              <span className="font-semibold text-green-700">Great Job</span>
            </div>
            <p className="text-sm text-green-600">
              You've stayed under budget for 3 consecutive months. Excellent
              financial discipline!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
