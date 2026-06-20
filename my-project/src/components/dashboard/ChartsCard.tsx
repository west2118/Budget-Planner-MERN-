import { useMemo, useState } from "react";
import type { TransactionType } from "../../lib/types";
import { monthNames } from "../../lib/constants";
import SpendingPieChart from "./SpendingPieChart";
import IncomeExpenseBarChart from "./IncomeExpenseBarChart";
import { useCategoryCounts, useMonthlyTotals } from "../../lib/utils";
import { useTransactions } from "../../hooks/useTransactions";

const ChartsCard = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const { data: transactions, isLoading, error } = useTransactions();

  const categoryCountsData = useCategoryCounts(transactions ?? null);
  const monthlyTotalsData = useMonthlyTotals(transactions ?? null);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6 mb-6 lg:mb-8 animate-pulse">
        <div className="bg-gray-100 rounded-xl shadow-sm h-[400px]"></div>
        <div className="bg-gray-100 rounded-xl shadow-sm h-[400px]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-center mb-6 lg:mb-8">
        Failed to load chart data.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6 mb-6 lg:mb-8">
      {/* Spending by Category Pie Chart */}
      <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Spending by Category
        </h3>
        <div className="h-64 sm:h-72 lg:h-80">
          <SpendingPieChart
            categoryCountsData={categoryCountsData}
            isMobile={isMobile}
          />
        </div>
      </div>

      {/* Income vs Expense Bar Chart */}
      <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Income vs Expense
        </h3>
        <div className="h-64 sm:h-72 lg:h-80">
          <IncomeExpenseBarChart
            monthlyTotalsData={monthlyTotalsData}
            isMobile={isMobile}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartsCard;
