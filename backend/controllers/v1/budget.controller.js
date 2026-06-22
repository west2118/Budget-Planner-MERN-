import Budget from "../../models/budget.model.js";
import Transaction from "../../models/transaction.model.js";
import User from "../../models/user.model.js";

// Helper to get date range based on period
const getDateRangeForPeriod = (period, createdAt) => {
  const now = new Date();
  let startDate = new Date(now);
  let endDate = new Date(now);

  if (period === "Weekly") {
    // Start of current week (Monday)
    const day = now.getDay(); // 0 is Sunday, 1 is Monday
    const diffToMonday = day === 0 ? 6 : day - 1;
    startDate.setDate(now.getDate() - diffToMonday);
    startDate.setHours(0, 0, 0, 0);

    // End of current week (Sunday)
    endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    endDate.setHours(23, 59, 59, 999);
  } else if (period === "Monthly") {
    // Start of current month
    startDate.setDate(1);
    startDate.setHours(0, 0, 0, 0);
    
    // End of current month
    endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
    endDate.setHours(23, 59, 59, 999);
  } else if (period === "Yearly") {
    // Start of current year
    startDate = new Date(now.getFullYear(), 0, 1);
    startDate.setHours(0, 0, 0, 0);
    
    // End of current year
    endDate = new Date(now.getFullYear(), 11, 31);
    endDate.setHours(23, 59, 59, 999);
  } else {
    // One-Time
    startDate = new Date(createdAt);
    endDate = new Date("2100-01-01"); // Arbitrarily far in the future
  }

  return { startDate, endDate };
};

export const getBudgets = async (req, res) => {
  try {
    const { _id } = req.user;
    const { page, limit } = req.query;
    
    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    let budgetsQuery = Budget.find({ userId: user._id }).sort({ createdAt: -1 });
    let totalBudgets = 0;
    let totalPages = 1;
    let currentPage = 1;

    if (page && limit) {
      const pageNumber = parseInt(page, 10);
      const limitNumber = parseInt(limit, 10);
      const skip = (pageNumber - 1) * limitNumber;
      
      totalBudgets = await Budget.countDocuments({ userId: user._id });
      totalPages = Math.ceil(totalBudgets / limitNumber);
      currentPage = pageNumber;
      
      budgetsQuery = budgetsQuery.skip(skip).limit(limitNumber);
    }

    const budgets = await budgetsQuery;

    const budgetsWithSpent = await Promise.all(
      budgets.map(async (budget) => {
        const { startDate, endDate } = getDateRangeForPeriod(budget.period, budget.createdAt);
        
        let matchQuery = {
          userId: user._id,
          type: "Expense",
          date: { $gte: startDate, $lte: endDate }
        };

        if (budget.category !== "All") {
          matchQuery.category = budget.category;
        }

        if (budget.cardSelection === "Selected Cards Only" && budget.selectedCards && budget.selectedCards.length > 0) {
          matchQuery.cardId = { $in: budget.selectedCards };
        }

        const transactions = await Transaction.find(matchQuery);
        const spentAmount = transactions.reduce((acc, curr) => acc + curr.amount, 0);

        return {
          ...budget.toObject(),
          spentAmount
        };
      })
    );

    if (page && limit) {
      res.status(200).json({ budgets: budgetsWithSpent, totalPages, currentPage, total: totalBudgets });
    } else {
      res.status(200).json(budgetsWithSpent);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getBudgetSummary = async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const budgets = await Budget.find({ userId: user._id });

    let totalBudgetLimit = 0;
    let totalSpent = 0;
    let overBudgetCount = 0;

    await Promise.all(
      budgets.map(async (budget) => {
        const { startDate, endDate } = getDateRangeForPeriod(budget.period, budget.createdAt);
        
        let matchQuery = {
          userId: user._id,
          type: "Expense",
          date: { $gte: startDate, $lte: endDate }
        };

        if (budget.category !== "All") {
          matchQuery.category = budget.category;
        }

        if (budget.cardSelection === "Selected Cards Only" && budget.selectedCards && budget.selectedCards.length > 0) {
          matchQuery.cardId = { $in: budget.selectedCards };
        }

        const transactions = await Transaction.find(matchQuery);
        const spentAmount = transactions.reduce((acc, curr) => acc + curr.amount, 0);

        totalBudgetLimit += budget.amount;
        totalSpent += spentAmount;
        if (spentAmount > budget.amount) {
          overBudgetCount += 1;
        }
      })
    );

    res.status(200).json({
      totalBudgetLimit,
      totalSpent,
      overBudgetCount,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const createBudget = async (req, res) => {
  try {
    const { _id } = req.user;
    const { budgetName, category, amount, period, cardSelection, selectedCards } = req.body;

    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    // Check if same category and period exists
    const existing = await Budget.findOne({ userId: user._id, category, period });
    if (existing) {
      return res.status(400).json({ message: `A ${period} budget for ${category} already exists.` });
    }

    await Budget.create({
      userId: user._id,
      budgetName,
      category,
      amount: Number(amount),
      period,
      cardSelection: cardSelection || "All Cards",
      selectedCards: selectedCards || []
    });

    res.status(201).json({ message: "Budget created successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateBudget = async (req, res) => {
  try {
    const { _id } = req.user;
    const { id } = req.params;
    const { budgetName, category, amount, period, cardSelection, selectedCards } = req.body;

    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const budget = await Budget.findById(id);
    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    if (budget.userId.toString() !== user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await Budget.findByIdAndUpdate(id, { 
      budgetName, 
      category, 
      amount: Number(amount), 
      period,
      cardSelection: cardSelection || "All Cards",
      selectedCards: selectedCards || [] 
    });

    res.status(200).json({ message: "Budget updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteBudget = async (req, res) => {
  try {
    const { _id } = req.user;
    const { id } = req.params;

    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const budget = await Budget.findById(id);
    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    if (budget.userId.toString() !== user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await Budget.findByIdAndDelete(id);

    res.status(200).json({ message: "Budget deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
