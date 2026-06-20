import { useQuery } from "@tanstack/react-query";
import api from "../lib/api";
import { useUserStore } from "../stores/useUserStore";

export type CardType = {
  _id: string;
  name: string;
  balance: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export const useCards = () => {
  const token = useUserStore((state) => state.userToken);

  return useQuery<CardType[]>({
    queryKey: ["cards"],
    queryFn: async () => {
      const response = await api.get("/cards");
      return response.data;
    },
    enabled: !!token,
  });
};
