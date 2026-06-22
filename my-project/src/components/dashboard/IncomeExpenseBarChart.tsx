import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type BarData = {
  name: string;
  Income: number;
  Expense: number;
};

const IncomeExpenseBarChart = ({
  barChartData,
  isMobile,
}: {
  barChartData: BarData[];
  isMobile: boolean;
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={barChartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" fontSize={isMobile ? 12 : 14} />
        <YAxis fontSize={isMobile ? 12 : 14} />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="Income"
          fill="#4ECDC4"
          name="Income"
          radius={[2, 2, 0, 0]}
        />
        <Bar
          dataKey="Expense"
          fill="#FF6B6B"
          name="Expense"
          radius={[2, 2, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default IncomeExpenseBarChart;
