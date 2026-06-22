import React from "react";
import StatCard from "./StatCard";

type SummaryItem = {
  title: string;
  total: number | string;
  prefix?: string;
  icon: any;
  trend?: "up" | "down" | "neutral";
  color: string;
  bgColor: string;
  extraInfo?: string;
};

type SummaryCardsGridProps = {
  data: SummaryItem[];
  isLoading?: boolean;
  error?: any;
  columns?: 3 | 4;
};

const SummaryCardsGrid = ({
  data,
  isLoading = false,
  error = null,
  columns = 3,
}: SummaryCardsGridProps) => {
  const gridClass = `grid grid-cols-1 sm:grid-cols-2 ${columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
    } gap-4 lg:gap-6 mb-6 lg:mb-8`;

  if (isLoading) {
    const skeletonCount = data.length > 0 ? data.length : columns;
    return (
      <div className={`${gridClass} animate-pulse`}>
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <div
            key={i}
            className="bg-gray-100 rounded-xl shadow-sm p-6 lg:p-8 h-34"
          ></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-sm mb-6 lg:mb-8">
        Failed to load summary statistics.
      </div>
    );
  }

  return (
    <div className={gridClass}>
      {data.map((item, index) => (
        <StatCard key={index} {...item} />
      ))}
    </div>
  );
};

export default React.memo(SummaryCardsGrid);
