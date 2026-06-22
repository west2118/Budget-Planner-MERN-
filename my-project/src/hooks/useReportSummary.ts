import { useQuery } from "@tanstack/react-query";
import api from "../lib/api";

type ReportSummaryResponse = {
  totalIncome: number;
  totalExpenses: number;
  netSavings: number;
  savingsRate: number;
};

export const useReportSummary = (filters: { startDate: string; endDate: string }) => {

  return useQuery<ReportSummaryResponse>({
    queryKey: ["report-summary", filters],
    queryFn: async () => {
      const response = await api.get("/reports/summary", { params: filters });
      return response.data;
    },
  });
};
