import { useReportCharts } from "../../hooks/useReportCharts";
import IncomeExpenseChart from "./IncomeExpenseChart";
import ExpenseCategoryChart from "./ExpenseCategoryChart";
import SpendingTrendChart from "./SpendingTrendChart";
import TopSpendingCategories from "./TopSpendingCategories";

type ChartsSectionProps = {
  filters: { startDate: string; endDate: string; reportType: string };
};

const ChartsSection = ({ filters }: ChartsSectionProps) => {
  const { data, isLoading, error } = useReportCharts(filters);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-96 bg-gray-100 animate-pulse rounded-xl border border-gray-100"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return null;
  }

  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
        <IncomeExpenseChart data={data?.comparisonData} />
        <ExpenseCategoryChart data={data?.expenseCategoryData} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-4">
        <SpendingTrendChart data={data?.spendingTrendData} />
        <TopSpendingCategories data={data?.topSpending} />
      </div>
    </>
  );
};

export default ChartsSection;
