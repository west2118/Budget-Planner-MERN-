import { useQuery } from "@tanstack/react-query";
import api from "../lib/api";

type ReportChartsResponse = {
  expenseCategoryData: { name: string; value: number; color: string }[];
  topSpending: { category: string; amount: number; percentage: number }[];
  comparisonData: { period: string; Income: number; Expense: number }[];
  spendingTrendData: { period: string; spending: number; budget: number }[];
};

export const useReportCharts = (filters: { startDate: string; endDate: string; reportType: string }) => {

  return useQuery<ReportChartsResponse>({
    queryKey: ["report-charts", filters],
    queryFn: async () => {
      const response = await api.get("/reports/charts", { params: filters });
      return response.data;
    },
  });
};
