import Card from "../../models/card.model.js";
import Goal from "../../models/goal.model.js";
import Transaction from "../../models/transaction.model.js";
import User from "../../models/user.model.js";

export const getTransaction = async (req, res) => {
  try {
    const { uid } = req.user;

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const transactions = await Transaction.find({ userId: user._id }).populate(
      "cardId",
      "name"
    );

    res.status(201).json(transactions);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const postTransaction = async (req, res) => {
  try {
    const { uid } = req.user;
    const { cardId, goalId, type, amount, category, date, note } = req.body;

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    await Transaction.create({
      userId: user._id,
      cardId: cardId || null,
      goalId: goalId || null,
      type,
      amount,
      category,
      date,
      note,
    });

    if (cardId) {
      const card = await Card.findById(cardId);
      if (!card) {
        return res.status(404).json({ message: "Card not found" });
      }

      if (type === "Income") card.balance += Number(amount);
      else if (type === "Expense") card.balance -= Number(amount);

      await card.save();
    }

    if (goalId) {
      const goal = await Goal.findById(goalId);
      if (!goal) {
        return res.status(404).json({ message: "Goal not found" });
      }

      if (type === "Income") goal.balance += Number(amount);
      else if (type === "Expense") goal.balance -= Number(amount);

      await goal.save();
    }

    res.status(201).json({ message: "Transaction created successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
