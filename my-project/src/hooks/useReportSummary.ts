import { useQuery } from "@tanstack/react-query";
import api from "../lib/api";
import { useUserStore } from "../stores/useUserStore";

type ReportSummaryResponse = {
  totalIncome: number;
  totalExpenses: number;
  netSavings: number;
  savingsRate: number;
};

export const useReportSummary = (filters: { startDate: string; endDate: string }) => {
  const token = useUserStore((state) => state.userToken);

  return useQuery<ReportSummaryResponse>({
    queryKey: ["report-summary", filters],
    queryFn: async () => {
      const response = await api.get("/reports/summary", { params: filters });
      return response.data;
    },
    enabled: !!token,
  });
};
