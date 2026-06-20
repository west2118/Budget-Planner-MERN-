import { useQuery } from "@tanstack/react-query";
import api from "../lib/api";
import { useUserStore } from "../stores/useUserStore";

type CardsSummaryResponse = {
  totalBalance: number;
  totalCreditLimit: number;
  totalCreditUsed: number;
  totalCards: number;
  creditCardsCount: number;
};

export const useCardsSummary = () => {
  const token = useUserStore((state) => state.userToken);

  return useQuery<CardsSummaryResponse>({
    queryKey: ["cards-summary"],
    queryFn: async () => {
      const response = await api.get("/cards/summary");
      return response.data;
    },
    enabled: !!token,
  });
};
