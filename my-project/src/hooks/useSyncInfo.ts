import { useEffect, useRef } from "react";
import api from "../lib/api";
import { useUserStore } from "../stores/useUserStore";

export const useSyncInfo = () => {
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);

  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (hasFetched.current) return;
      hasFetched.current = true;
      
      try {
        const response = await api.get("/user");
        setUser(response?.data);
      } catch (error) {
        // Interceptor handles 401 refresh, or user is simply not logged in
      }
    };

    if (!user) {
      fetchUserInfo();
    }
  }, [user, setUser]);
};
