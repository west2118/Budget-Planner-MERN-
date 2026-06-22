import { useQuery } from "@tanstack/react-query";
import api from "../lib/api";

export const useTransactionsReport = () => {

  return useQuery<any[]>({
    queryKey: ["transactions-report"],
    queryFn: async () => {
      const response = await api.get("/transactions/report");
      return response.data;
    },
  });
};
