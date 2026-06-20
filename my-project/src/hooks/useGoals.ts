import { useQuery } from "@tanstack/react-query";
import api from "../lib/api";
import { useUserStore } from "../stores/useUserStore";
import type { GoalType } from "../lib/types";

export const useGoals = () => {
  const token = useUserStore((state) => state.userToken);

  return useQuery<GoalType[]>({
    queryKey: ["goals"],
    queryFn: async () => {
      const response = await api.get("/goals/active");
      return response.data;
    },
    enabled: !!token,
  });
};
