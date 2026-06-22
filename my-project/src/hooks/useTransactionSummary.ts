import { useQuery } from "@tanstack/react-query";
import api from "../lib/api";

export type TransactionSummaryType = {
  income: number;
  expense: number;
  balance: number;
};

export const useTransactionSummary = () => {

  return useQuery<TransactionSummaryType>({
    queryKey: ["transactions-summary"],
    queryFn: async () => {
      const response = await api.get("/transactions/summary");
      return response.data;
    },
  });
};
