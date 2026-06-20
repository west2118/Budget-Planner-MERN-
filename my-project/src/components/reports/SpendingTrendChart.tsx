import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { LineChart as LineChartIcon } from "lucide-react";

type SpendingTrendChartProps = {
  data: { period: string; spending: number; budget: number }[] | undefined;
};

const SpendingTrendChart = ({ data }: SpendingTrendChartProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <LineChartIcon className="w-5 h-5 mr-2 text-purple-500" />
          Spending Trend
        </h3>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip
              labelFormatter={(label, payload) => {
                if (payload && payload.length > 0 && payload[0].payload.fullPeriod) {
                  return payload[0].payload.fullPeriod;
                }
                return label;
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="spending"
              stroke="#8884d8"
              strokeWidth={2}
              name="Actual Spending"
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SpendingTrendChart;
