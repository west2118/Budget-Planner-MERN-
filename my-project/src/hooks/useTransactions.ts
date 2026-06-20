import { useQuery } from "@tanstack/react-query";
import api from "../lib/api";
import { useUserStore } from "../stores/useUserStore";
import type { TransactionType } from "../lib/types";

export const useTransactions = (populated: boolean = false) => {
  const token = useUserStore((state) => state.userToken);

  return useQuery<TransactionType[]>({
    queryKey: ["transactions", populated],
    queryFn: async () => {
      // The backend has two endpoints:
      // /transactions -> unpopulated
      // /transaction -> populated with card name
      const endpoint = populated ? "/transaction" : "/transactions";
      const response = await api.get(endpoint);
      return response.data;
    },
    enabled: !!token,
  });
};
