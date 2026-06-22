import { useMemo } from "react";
import { useCardsSummary } from "../../hooks/useCardsSummary";
import { CreditCard, DollarSign, TrendingDown, TrendingUp } from "lucide-react";
import SummaryCardsGrid from "../ui/SummaryCardsGrid";

const SummaryCards = () => {
  const { data: summary, isLoading, error } = useCardsSummary();

  const summaryData = useMemo(() => {
    const totalBalance = summary?.totalBalance ?? 0;
    const totalCreditLimit = summary?.totalCreditLimit ?? 0;
    const totalCreditUsed = summary?.totalCreditUsed ?? 0;
    const totalCards = summary?.totalCards ?? 0;
    const creditCardsCount = summary?.creditCardsCount ?? 0;

    return [
      {
        title: "Total Balance",
        total: totalBalance,
        prefix: "$",
        icon: DollarSign,
        trend: "up" as const,
        color: "text-green-500",
        bgColor: "bg-green-50",
        extraInfo: "+2.5% from last month",
      },
      {
        title: "Credit Utilization",
        total: totalCreditLimit > 0 ? Math.round((totalCreditUsed / totalCreditLimit) * 100) : 0,
        prefix: "",
        icon: TrendingDown,
        color: "text-purple-500",
        bgColor: "bg-blue-50",
        extraInfo: `$${totalCreditUsed} of $${totalCreditLimit}`,
      },
      {
        title: "Total Cards",
        total: totalCards,
        prefix: "",
        icon: CreditCard,
        color: "text-blue-500",
        bgColor: "bg-purple-50",
        extraInfo: `${creditCardsCount} credit, ${totalCards - creditCardsCount} others`,
      },
    ];
  }, [summary]);

  return <SummaryCardsGrid data={summaryData} isLoading={isLoading} error={error} columns={3} />;
};

export default SummaryCards;
