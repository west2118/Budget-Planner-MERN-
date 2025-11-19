import { useMemo } from "react";
import type { TransactionType } from "../../lib/types";
import { DollarSign, TrendingDown, TrendingUp } from "lucide-react";

const SummaryCards = ({
  transactions,
}: {
  transactions: TransactionType[] | null;
}) => {
  const summaryData = useMemo(() => {
    const totals = transactions?.reduce(
      (acc, t) => {
        if (t.type === "Income") acc.income += Number(t.amount);
        else if (t.type === "Expense") acc.expense += Number(t.amount);
        return acc;
      },
      { income: 0, expense: 0 }
    ) ?? { income: 0, expense: 0 };

    const balance = totals.income - totals.expense;

    return [
      {
        title: "Total Income",
        total: totals.income,
        icon: TrendingUp,
        trend: "up",
        color: "text-green-500",
        bgColor: "bg-green-50",
      },
      {
        title: "Total Expense",
        total: totals.expense,
        icon: TrendingDown,
        trend: "down",
        color: "text-red-500",
        bgColor: "bg-red-50",
      },
      {
        title: "Total Balance",
        total: balance,
        icon: DollarSign,
        trend: "up",
        color: "text-blue-500",
        bgColor: "bg-blue-50",
      },
    ];
  }, [transactions]);

  return (
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
                  $
                  {`${Number(item.total).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`}
                </p>
                <p
                  className={`text-xs lg:text-sm mt-1 ${
                    item.trend === "up" ? "text-green-500" : "text-red-500"
                  }`}>
                  {/* {item.change} from last month */}
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
  );
};

export default SummaryCards;
