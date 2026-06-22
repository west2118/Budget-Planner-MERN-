import { useQuery } from "@tanstack/react-query";
import api from "../lib/api";
import type { TransactionType } from "../lib/types";

export const useTransactions = (populated: boolean = false) => {

  return useQuery<TransactionType[]>({
    queryKey: ["transactions", populated],
    queryFn: async () => {
      const response = await api.get("/transactions", {
        params: { populated }
      });
      return response.data;
    },
  });
};
