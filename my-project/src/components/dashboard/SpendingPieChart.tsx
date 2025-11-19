import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  type PieLabelRenderProps,
  Legend,
} from "recharts";
import { categories } from "../../lib/constants";

const SpendingPieChart = ({
  categoryCountsData,
  isMobile,
}: {
  categoryCountsData: Record<string, number>;
  isMobile: boolean;
}) => {
  const chartData = Object.entries(categoryCountsData).map(([name, value]) => {
    const category = categories.find((category) => category.name === name);

    return {
      name,
      value,
      color: category ? category.color : "#E5E7EB",
    };
  });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={2}
          dataKey="value"
          label={(props: PieLabelRenderProps) => {
            const name = props.name as string;
            const percent =
              typeof props.percent === "number" ? props.percent : 0;
            return `${name} ${(percent * 100).toFixed(0)}%`;
          }}>
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [value, "Transactions"]} />
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
  );
};

export default SpendingPieChart;
