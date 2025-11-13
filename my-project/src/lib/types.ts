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

export type TransactionType = {
  _id: string;
  userId: string;
  cardId: {
    _id: string;
    name: string;
  };
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
