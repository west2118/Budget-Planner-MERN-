import { useQuery } from "@tanstack/react-query";
import api from "../lib/api";
import type { BudgetType } from "../lib/types";

export const useBudgets = (page?: number, limit?: number) => {
  return useQuery<any>({
    queryKey: page && limit ? ["budgets", page, limit] : ["budgets"],
    queryFn: async () => {
      const params: any = {};
      if (page && limit) {
        params.page = page;
        params.limit = limit;
      }
      const response = await api.get("/budgets", { params });
      return response.data;
    },
  });
};
