import mongoose from "mongoose";

const CardSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    balance: { type: Number, required: true, default: 0 },
    type: { type: String, required: true },
    budgetLimit: { type: Number, default: null },
  },
  {
    timestamps: true,
  }
);

const Card = mongoose.model("Card", CardSchema);

export default Card;
