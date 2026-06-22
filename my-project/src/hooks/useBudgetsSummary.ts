import { useQuery } from "@tanstack/react-query";
import api from "../lib/api";

type BudgetSummaryType = {
  totalBudgetLimit: number;
  totalSpent: number;
  overBudgetCount: number;
};

export const useBudgetsSummary = () => {

  return useQuery<BudgetSummaryType>({
    queryKey: ["budgets-summary"],
    queryFn: async () => {
      const response = await api.get("/budgets/summary");
      return response.data;
    },
  });
};
