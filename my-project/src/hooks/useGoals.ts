import { useQuery } from "@tanstack/react-query";
import api from "../lib/api";
import type { GoalType } from "../lib/types";

export const useGoals = () => {

  return useQuery<GoalType[]>({
    queryKey: ["goals"],
    queryFn: async () => {
      const response = await api.get("/goals/active");
      return response.data;
    },
  });
};
