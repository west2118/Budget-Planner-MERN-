import { useQuery } from "@tanstack/react-query";
import api from "../lib/api";
import { useUserStore } from "../stores/useUserStore";
import type { GoalType } from "../lib/types";

type PaginatedGoalsResponse = {
  goals: GoalType[];
  totalPages: number;
  currentPage: number;
};

export const useAllGoals = (page: number, limit: number, status: string) => {
  const token = useUserStore((state) => state.userToken);

  return useQuery<PaginatedGoalsResponse>({
    queryKey: ["goals-paginated", page, limit, status],
    queryFn: async () => {
      const response = await api.get("/goals", {
        params: { page, limit, status },
      });
      return response.data;
    },
    enabled: !!token,
  });
};
