import mongoose from "mongoose";

const BudgetSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    budgetName: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      // We will allow predefined categories or "All"
    },
    amount: {
      type: Number,
      required: true,
    },
    period: {
      type: String,
      enum: ["Weekly", "Monthly", "Yearly", "One-Time"],
      required: true,
    },
    cardSelection: {
      type: String,
      enum: ["All Cards", "Selected Cards Only"],
      default: "All Cards",
      required: true,
    },
    selectedCards: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Card",
      },
    ],
  },
  {
    timestamps: true, // This automatically adds createdAt and updatedAt
  }
);

const Budget = mongoose.model("Budget", BudgetSchema);

export default Budget;
