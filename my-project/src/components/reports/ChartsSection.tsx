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
  PieChart as PieChartIcon,
  BarChart3,
  LineChart as LineChartIcon,
} from "lucide-react";
import type { TransactionType } from "../../lib/types";
import { useCategoryCounts, useMonthlyTotals } from "../../lib/utils";
import { useState } from "react";
import IncomeExpenseBarChart from "../dashboard/IncomeExpenseBarChart";
import SpendingPieChart from "../dashboard/SpendingPieChart";

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

// Top spending categories
const topSpending = [
  { category: "Housing", amount: 13720, percentage: 35 },
  { category: "Food & Dining", amount: 7840, percentage: 20 },
  { category: "Transportation", amount: 5880, percentage: 15 },
  { category: "Entertainment", amount: 4704, percentage: 12 },
  { category: "Shopping", amount: 3920, percentage: 10 },
];

const ChartsSection = ({
  transactions,
}: {
  transactions: TransactionType[];
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const categoryCountsData = useCategoryCounts(transactions);
  const monthlyTotalsData = useMonthlyTotals(transactions, 11);

  return (
    <>
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
            <IncomeExpenseBarChart
              monthlyTotalsData={monthlyTotalsData}
              isMobile={isMobile}
            />
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
            <SpendingPieChart
              categoryCountsData={categoryCountsData}
              isMobile={isMobile}
            />
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
    </>
  );
};

export default ChartsSection;
