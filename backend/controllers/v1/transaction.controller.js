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

export const putTransaction = async (req, res) => {
  try {
    const { uid } = req.user;
    const { id } = req.params;
    const { formData } = req.body;

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const transaction = await Transaction.findById(id);
    if (!transaction) {
      return res.status(400).json({ message: "Transaction didn't exist" });
    }

    if (transaction.cardId) {
      const oldCard = await Card.findById(transaction.cardId);
      if (oldCard) {
        if (transaction.type === "Income")
          oldCard.balance -= Number(transaction.amount);
        else if (transaction.type === "Expense")
          oldCard.balance += Number(transaction.amount);
        await oldCard.save();
      }
    }

    if (transaction.goalId) {
      const oldGoal = await Goal.findById(transaction.goalId);
      if (oldGoal) {
        if (transaction.type === "Income")
          oldGoal.balance -= Number(transaction.amount);
        else if (transaction.type === "Expense")
          oldGoal.balance += Number(transaction.amount);
        await oldGoal.save();
      }
    }

    if (formData.cardId) {
      const newCard = await Card.findById(formData.cardId);
      if (!newCard)
        return res.status(404).json({ message: "New card not found" });

      if (formData.type === "Income")
        newCard.balance += Number(formData.amount);
      else if (formData.type === "Expense")
        newCard.balance -= Number(formData.amount);

      await newCard.save();
    }

    if (formData.goalId) {
      const newGoal = await Goal.findById(formData.goalId);
      if (!newGoal)
        return res.status(404).json({ message: "New goal not found" });

      if (formData.type === "Income")
        newGoal.balance += Number(formData.amount);
      else if (formData.type === "Expense")
        newGoal.balance -= Number(formData.amount);

      await newGoal.save();
    }

    await Transaction.findByIdAndUpdate(id, { ...formData }, { new: true });

    res.status(200).json({
      message: "Transaction updated successfully!",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const { uid } = req.user;
    const { id } = req.params;

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const transaction = await Transaction.findById(id);
    if (!transaction) {
      return res.status(400).json({ message: "Transaction didn't exist" });
    }

    if (user._id.toString() !== transaction.userId.toString()) {
      return res
        .status(400)
        .json({ message: "You don't have authorized in this card!" });
    }

    await Card.findByIdAndDelete(id);

    res.status(200).json({ message: "Card deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
