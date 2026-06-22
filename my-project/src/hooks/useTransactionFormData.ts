import { useQuery } from "@tanstack/react-query";
import api from "../lib/api";
import type { CardType, GoalType } from "../lib/types";

export type TransactionFormDataResponse = {
  cards: CardType[];
  goals: GoalType[];
};

export const useTransactionFormData = () => {
  return useQuery<TransactionFormDataResponse>({
    queryKey: ["transaction-form-data"],
    queryFn: async () => {
      const [cardsRes, goalsRes] = await Promise.all([
        api.get("/cards"),
        api.get("/goals/active"),
      ]);
      return {
        cards: cardsRes.data,
        goals: goalsRes.data,
      };
    },
  });
};
