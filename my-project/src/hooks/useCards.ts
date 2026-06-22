import { useQuery } from "@tanstack/react-query";
import api from "../lib/api";
import type { CardType, PaginatedCardsResponse } from "../lib/types";

export const useCards = (page?: number, limit?: number) => {
  return useQuery<PaginatedCardsResponse>({
    queryKey: page && limit ? ["cards", page, limit] : ["cards"],
    queryFn: async () => {
      const params: any = {};
      if (page && limit) {
        params.page = page;
        params.limit = limit;
      }
      const response = await api.get("/cards", { params });
      return response.data;
    },
  });
};
