import { useQuery } from "@tanstack/react-query";
import api from "../lib/api";

export type GoalsSummaryType = {
  totalGoals: number;
  totalCompleted: number;
  totalTarget: number;
  totalSaved: number;
  totalRemaining: number;
  overallProgress: number;
};

export const useGoalsSummary = () => {

  return useQuery<GoalsSummaryType>({
    queryKey: ["goals-summary"],
    queryFn: async () => {
      const response = await api.get("/goals/summary");
      return response.data;
    },
  });
};
