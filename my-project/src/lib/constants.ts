import {
  PiggyBank,
  Plane,
  Monitor,
  Car,
  Home,
  GraduationCap,
  Sparkles,
  MoreHorizontal,
} from "lucide-react";

export const accountColor = [
  {
    name: "Cash",
    color: "bg-gradient-to-br from-yellow-400 to-orange-500",
    textColor: "text-white",
  },
  {
    name: "Debit",
    color: "bg-gradient-to-br from-blue-500 to-indigo-600",
    textColor: "text-white",
  },
  {
    name: "Credit",
    color: "bg-gradient-to-br from-purple-500 to-pink-600",
    textColor: "text-white",
  },
];

export const cardType = [
  { value: "Credit", label: "Credit Card" },
  { value: "Debit", label: "Debit Card" },
  { value: "Cash", label: "Cash Wallet" },
];

export const categoriesGoal = [
  {
    label: "Savings",
    color: "#4CAF50",
    icon: PiggyBank,
  },
  {
    label: "Travel",
    color: "#2196F3",
    icon: Plane,
  },
  {
    label: "Electronics",
    color: "#9C27B0",
    icon: Monitor,
  },
  {
    label: "Vehicle",
    color: "#FF9800",
    icon: Car,
  },
  {
    label: "Home",
    color: "#795548",
    icon: Home,
  },
  {
    label: "Education",
    color: "#3F51B5",
    icon: GraduationCap,
  },
  {
    label: "Life Event",
    color: "#E91E63",
    icon: Sparkles,
  },
  {
    label: "Other",
    color: "#9E9E9E",
    icon: MoreHorizontal,
  },
];

export function getRemainingDays(deadline: string) {
  const now = new Date();
  const end = new Date(deadline);

  const diffMs = end.getTime() - now.getTime(); // difference in milliseconds
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24)); // convert to days

  return diffDays < 0 ? 0 : diffDays; // never return negative days
}

export const categories = [
  "Food & Dining",
  "Shopping",
  "Transport",
  "Entertainment",
  "Bills",
  "Salary",
  "Freelance",
];
