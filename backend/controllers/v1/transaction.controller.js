import Card from "../../models/card.model.js";
import Goal from "../../models/goal.model.js";
import Transaction from "../../models/transaction.model.js";
import User from "../../models/user.model.js";
import { getIncomeVsExpenses } from "../../services/transactionService.js";



export const getUserReportTransactions = async (req, res) => {
  try {
    const { _id } = req.user;

    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const data = await getIncomeVsExpenses();

    res.status(201).json(data);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getUserTransactions = async (req, res) => {
  try {
    const { _id } = req.user;
    const { page, limit, populated } = req.query;

    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    let query = Transaction.find({ userId: user._id });
    
    if (populated === 'true') {
      query = query.populate("cardId", "name");
    }

    if (page && limit) {
      const skip = (parseInt(page) - 1) * parseInt(limit);
      const transactions = await query
        .sort({ date: -1, createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));
      
      const total = await Transaction.countDocuments({ userId: user._id });

      return res.status(200).json({
        data: transactions,
        total,
        totalPages: Math.ceil(total / parseInt(limit)),
        currentPage: parseInt(page)
      });
    }

    const transactions = await query.sort({ date: -1, createdAt: -1 });

    res.status(200).json(transactions);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const postTransaction = async (req, res) => {
  try {
    const { _id } = req.user;
    const { cardId, goalId, type, amount, category, date, note } = req.body;

    const user = await User.findById(_id);
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

      if (type === "Income") goal.currentAmount += Number(amount);
      else if (type === "Expense") goal.currentAmount -= Number(amount);

      await goal.save();
    }

    res.status(201).json({ message: "Transaction created successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const putTransaction = async (req, res) => {
  try {
    const { _id } = req.user;
    const { id } = req.params;
    const { formData } = req.body;

    const user = await User.findById(_id);
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
          oldGoal.currentAmount -= Number(transaction.amount);
        else if (transaction.type === "Expense")
          oldGoal.currentAmount += Number(transaction.amount);
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
        newGoal.currentAmount += Number(formData.amount);
      else if (formData.type === "Expense")
        newGoal.currentAmount -= Number(formData.amount);

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
    const { _id } = req.user;
    const { id } = req.params;

    const user = await User.findById(_id);
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
          oldGoal.currentAmount -= Number(transaction.amount);
        else if (transaction.type === "Expense")
          oldGoal.currentAmount += Number(transaction.amount);
        await oldGoal.save();
      }
    }

    await Transaction.findByIdAndDelete(id);

    res.status(200).json({ message: "Transaction deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getTransactionSummary = async (req, res) => {
  try {
    const { _id } = req.user;

    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const result = await Transaction.aggregate([
      { $match: { userId: user._id } },
      {
        $group: {
          _id: null,
          totalIncome: {
            $sum: { $cond: [{ $eq: ["$type", "Income"] }, "$amount", 0] },
          },
          totalExpense: {
            $sum: { $cond: [{ $eq: ["$type", "Expense"] }, "$amount", 0] },
          },
        },
      },
    ]);

    const income = result.length > 0 ? result[0].totalIncome : 0;
    const expense = result.length > 0 ? result[0].totalExpense : 0;
    const balance = income - expense;

    res.status(200).json({ income, expense, balance });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getDashboardCharts = async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    // 1. Category Counts for Pie Chart (Expenses only)
    const categoryCountsResult = await Transaction.aggregate([
      { $match: { userId: user._id, type: "Expense" } },
      { $group: { _id: "$category", total: { $sum: "$amount" } } }
    ]);

    const categoryCountsData = {};
    categoryCountsResult.forEach(item => {
      if (item._id) {
        categoryCountsData[item._id] = item.total;
      }
    });

    // 2. Income vs Expense for Bar Chart (Last 7 Days)
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const now = new Date();
    const days = [];
    const totalsMap = {};

    // Generate the past 7 days, from 6 days ago up to today
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const dateString = `${year}-${month}-${day}`; // "YYYY-MM-DD"
      const dayName = dayNames[d.getDay()];
      
      days.push(dateString);
      totalsMap[dateString] = { name: dayName, Income: 0, Expense: 0 };
    }

    const startDateString = days[0]; // 6 days ago

    // Fetch transactions from the last 7 days
    const recentTransactions = await Transaction.find({
      userId: user._id,
      date: { $gte: startDateString }
    });

    recentTransactions.forEach(t => {
      if (!t.date) return;
      const tDate = new Date(t.date).toISOString().split("T")[0]; // Handle Date object correctly
      if (totalsMap[tDate]) {
        if (t.type === "Income") totalsMap[tDate].Income += Number(t.amount);
        if (t.type === "Expense") totalsMap[tDate].Expense += Number(t.amount);
      }
    });

    const barChartData = Object.values(totalsMap);

    res.status(200).json({ categoryCountsData, barChartData });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
