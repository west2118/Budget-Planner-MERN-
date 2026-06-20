import { useCardsSummary } from "../../hooks/useCardsSummary";
import { CreditCard, DollarSign, TrendingDown, TrendingUp } from "lucide-react";
import StatCard from "../ui/StatCard";

const SummaryCards = () => {
  const { data: summary, isLoading } = useCardsSummary();

  const totalBalance = summary?.totalBalance ?? 0;
  const totalCreditLimit = summary?.totalCreditLimit ?? 0;
  const totalCreditUsed = summary?.totalCreditUsed ?? 0;
  const totalCards = summary?.totalCards ?? 0;
  const creditCardsCount = summary?.creditCardsCount ?? 0;

  const summaryData = [
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

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="h-24 bg-gray-100 animate-pulse rounded-xl"></div>
        <div className="h-24 bg-gray-100 animate-pulse rounded-xl"></div>
        <div className="h-24 bg-gray-100 animate-pulse rounded-xl"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {summaryData.map((item, index) => (
        <StatCard key={index} {...item} />
      ))}
    </div>
  );
};

export default SummaryCards;
