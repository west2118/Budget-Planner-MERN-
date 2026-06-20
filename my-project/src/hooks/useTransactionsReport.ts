import { useQuery } from "@tanstack/react-query";
import api from "../lib/api";
import { useUserStore } from "../stores/useUserStore";

export const useTransactionsReport = () => {
  const token = useUserStore((state) => state.userToken);

  return useQuery<any[]>({
    queryKey: ["transactions-report"],
    queryFn: async () => {
      const response = await api.get("/transactions-report");
      return response.data;
    },
    enabled: !!token,
  });
};
