import { useMemo, useState } from "react";
import type { TransactionType } from "../../lib/types";
import { monthNames } from "../../lib/constants";
import SpendingPieChart from "./SpendingPieChart";
import IncomeExpenseBarChart from "./IncomeExpenseBarChart";
import { useCategoryCounts, useMonthlyTotals } from "../../lib/utils";

const ChartsCard = ({
  transactions,
}: {
  transactions: TransactionType[] | null;
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const categoryCountsData = useCategoryCounts(transactions);
  const monthlyTotalsData = useMonthlyTotals(transactions);

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
