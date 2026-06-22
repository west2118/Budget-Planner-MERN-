import { useQuery } from "@tanstack/react-query";
import api from "../lib/api";

export type DashboardChartsData = {
  categoryCountsData: Record<string, number>;
  barChartData: { name: string; Income: number; Expense: number }[];
};

export const useDashboardCharts = () => {

  return useQuery<DashboardChartsData>({
    queryKey: ["dashboard-charts"],
    queryFn: async () => {
      const response = await api.get("/transactions/charts");
      return response.data;
    },
  });
};
