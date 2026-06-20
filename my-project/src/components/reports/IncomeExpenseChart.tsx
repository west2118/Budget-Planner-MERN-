import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { BarChart3 } from "lucide-react";
import { useState, useEffect } from "react";

type IncomeExpenseChartProps = {
  data: { period: string; Income: number; Expense: number }[] | undefined;
};

const IncomeExpenseChart = ({ data }: IncomeExpenseChartProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2 text-blue-500" />
          Income vs Expenses
        </h3>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" fontSize={isMobile ? 12 : 14} />
            <YAxis fontSize={isMobile ? 12 : 14} />
            <Tooltip
              labelFormatter={(label, payload) => {
                if (payload && payload.length > 0 && payload[0].payload.fullPeriod) {
                  return payload[0].payload.fullPeriod;
                }
                return label;
              }}
            />
            <Legend />
            <Bar dataKey="Income" fill="#4ECDC4" name="Income" radius={[2, 2, 0, 0]} />
            <Bar dataKey="Expense" fill="#FF6B6B" name="Expense" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IncomeExpenseChart;
