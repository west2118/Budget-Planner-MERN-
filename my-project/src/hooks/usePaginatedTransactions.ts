import { useQuery } from "@tanstack/react-query";
import api from "../lib/api";
import type { TransactionType } from "../lib/types";

export type PaginatedTransactions = {
  data: TransactionType[];
  total: number;
  totalPages: number;
  currentPage: number;
};

export const usePaginatedTransactions = (page: number, limit: number) => {

  return useQuery<PaginatedTransactions>({
    queryKey: ["transactions", "paginated", page, limit],
    queryFn: async () => {
      const response = await api.get("/transactions", {
        params: { page, limit, populated: true },
      });
      return response.data;
    },
  });
};
