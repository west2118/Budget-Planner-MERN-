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
