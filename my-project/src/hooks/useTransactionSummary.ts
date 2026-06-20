import { useQuery } from "@tanstack/react-query";
import api from "../lib/api";
import { useUserStore } from "../stores/useUserStore";

export type TransactionSummaryType = {
  income: number;
  expense: number;
  balance: number;
};

export const useTransactionSummary = () => {
  const token = useUserStore((state) => state.userToken);

  return useQuery<TransactionSummaryType>({
    queryKey: ["transactions-summary"],
    queryFn: async () => {
      const response = await api.get("/transactions/summary");
      return response.data;
    },
    enabled: !!token,
  });
};
