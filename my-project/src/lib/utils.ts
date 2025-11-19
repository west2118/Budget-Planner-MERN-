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

export function useCategoryCounts(transactions: TransactionType[] | null = []) {
  return useMemo<Record<string, number>>(() => {
    if (!transactions) return {};

    return transactions.reduce<Record<string, number>>((acc, transaction) => {
      if (transaction.type !== "Expense" || !transaction.category) return acc;

      acc[transaction.category] = (acc[transaction.category] || 0) + 1;
      return acc;
    }, {});
  }, [transactions]);
}

export const useMonthlyTotals = (
  transactions: TransactionType[] | null = [],
  monthsCount = 5
) => {
  return useMemo(() => {
    if (!transactions) return [];

    const months: string[] = [];
    const now = new Date();
    for (let i = monthsCount; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push(monthNames[d.getMonth()]);
    }

    const totals: Record<string, { Income: number; Expense: number }> = {};
    months.forEach((m) => (totals[m] = { Income: 0, Expense: 0 }));

    transactions.forEach((t) => {
      if (!t.date) return;

      const date = new Date(t.date);
      const month = monthNames[date.getMonth()];

      if (!totals[month]) return;

      if (t.type === "Income") totals[month].Income += Number(t.amount);
      else if (t.type === "Expense") totals[month].Expense += Number(t.amount);
    });

    return months.map((m) => ({ month: m, ...totals[m] }));
  }, [transactions]);
};
