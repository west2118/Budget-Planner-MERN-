import axios from "axios";
import { useMemo } from "react";
import type { TransactionType } from "./types";
import { monthNames } from "./constants";

export const fetchData =
  (url: string, token: string | null, withParams = false) =>
  async ({ queryKey }: { queryKey: any }) => {
    const [_key, param] = queryKey;
    const finalUrl = withParams ? `${url}/${param}` : url;

    const res = await axios.get(finalUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  };


