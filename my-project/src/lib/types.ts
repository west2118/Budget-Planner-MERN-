export type UserType = {
  _id: string;
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type CardType = {
  _id: string;
  userId: string;
  name: string;
  type: string;
  balance: number;
  budgetLimit: number | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type PaginatedCardsResponse = {
  cards: CardType[];
  totalPages: number;
  currentPage: number;
  total: number;
};

export type TransactionType = {
  _id: string;
  userId: string;
  cardId: {
    _id: string;
    name: string;
  } | null;
  goalId: string | null;
  amount: number;
  category: string;
  type: "Income" | "Expense";
  note: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type GoalType = {
  _id: string;
  userId: string;
  title: string;
  description: string;
  category: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};


export type BudgetType = {
  _id: string;
  userId: string;
  budgetName: string;
  category: string;
  amount: number;
  period: "Weekly" | "Monthly" | "Yearly" | "One-Time";
  cardSelection?: "All Cards" | "Selected Cards Only";
  selectedCards?: string[];
  spentAmount: number; // dynamically added in backend
  createdAt: string;
  updatedAt: string;
};
