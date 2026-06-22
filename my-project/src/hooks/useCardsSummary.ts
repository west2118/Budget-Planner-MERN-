import { useQuery } from "@tanstack/react-query";
import api from "../lib/api";

type CardsSummaryResponse = {
  totalBalance: number;
  totalCreditLimit: number;
  totalCreditUsed: number;
  totalCards: number;
  creditCardsCount: number;
};

export const useCardsSummary = () => {

  return useQuery<CardsSummaryResponse>({
    queryKey: ["cards-summary"],
    queryFn: async () => {
      const response = await api.get("/cards/summary");
      return response.data;
    },
  });
};
