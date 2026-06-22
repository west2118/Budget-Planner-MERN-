import QuickActionsCard from "./QuickActionsCard";
import DashboardBudgetsCard from "./DashboardBudgetsCard";
import DashboardGoalsCard from "./DashboardGoalsCard";

const GoalsActionsCard = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
      <div className="lg:col-span-1">
        <DashboardGoalsCard />
      </div>

      <div className="lg:col-span-1">
        <DashboardBudgetsCard />
      </div>

      <div className="lg:col-span-1">
        <QuickActionsCard />
      </div>
    </div>
  );
};

export default GoalsActionsCard;
