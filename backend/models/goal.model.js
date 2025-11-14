import mongoose from "mongoose";

const GoalSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    title: { type: String, required: true },
    category: { type: String, required: true },
    targetAmount: { type: Number, required: true },
    currentAmount: { type: Number, default: 0 },
    deadline: { type: Date, required: true },
    description: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const Goal = mongoose.model("Goal", GoalSchema);

export default Goal;
