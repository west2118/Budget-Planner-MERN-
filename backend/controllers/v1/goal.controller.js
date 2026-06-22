import Goal from "../../models/goal.model.js";
import User from "../../models/user.model.js";

export const getAllUserGoals = async (req, res) => {
  try {
    const { _id } = req.user;
    const { page = 1, limit = 6, status = "all" } = req.query;

    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    let filter = { userId: user._id };
    if (status === "active") {
      filter.$expr = { $lt: ["$currentAmount", "$targetAmount"] };
    } else if (status === "completed") {
      filter.$expr = { $gte: ["$currentAmount", "$targetAmount"] };
    }

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    const goals = await Goal.find(filter).skip(skip).limit(limitNumber);
    const totalGoals = await Goal.countDocuments(filter);
    const totalPages = Math.ceil(totalGoals / limitNumber);

    res.status(200).json({ goals, totalPages, currentPage: pageNumber });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getUserGoals = async (req, res) => {
  try {
    const { _id } = req.user;

    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const goals = await Goal.find({ 
      userId: user._id,
      $expr: { $lt: ["$currentAmount", "$targetAmount"] }
    });

    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getGoalsSummary = async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const goals = await Goal.find({ userId: user._id });

    const totalGoals = goals.length;
    const totalCompleted = goals.filter((goal) => goal.targetAmount <= goal.currentAmount).length;
    const totalTarget = goals.reduce((acc, t) => acc + t.targetAmount, 0);
    const totalSaved = goals.reduce((acc, t) => acc + t.currentAmount, 0);
    const totalRemaining = totalTarget > totalSaved ? totalTarget - totalSaved : 0;
    const overallProgress = totalTarget > 0 ? Math.min(100, Math.round((totalSaved / totalTarget) * 100)) : 0;

    res.status(200).json({
      totalGoals,
      totalCompleted,
      totalTarget,
      totalSaved,
      totalRemaining,
      overallProgress,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const postGoal = async (req, res) => {
  try {
    const { _id } = req.user;
    const {
      title,
      category,
      targetAmount,
      currentAmount,
      deadline,
      description,
    } = req.body;

    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const goalLimit = await Goal.countDocuments({ userId: user._id });
    if (goalLimit >= 9) {
      return res.status(400).json({ message: "Goal limit reached" });
    }

    const goalExist = await Goal.findOne({ userId: user._id, title });
    if (goalExist) {
      return res.status(400).json({ message: "Goal already exist" });
    }

    const newGoal = await Goal.create({
      userId: user._id,
      title,
      category,
      targetAmount: Number(targetAmount),
      currentAmount: Number(currentAmount),
      deadline,
      description,
    });

    res.status(200).json({ message: "Goal created successfully!", newGoal });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const putGoal = async (req, res) => {
  try {
    const { _id } = req.user;
    const { id } = req.params;
    const { formData } = req.body;

    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const goal = await Goal.findById(id);
    if (!goal) {
      return res.status(400).json({ message: "Goal didn't exist" });
    }

    await Goal.findByIdAndUpdate(id, { ...formData }, { new: true });

    res.status(200).json({
      message: "Goal updated successfully!",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteGoal = async (req, res) => {
  try {
    const { _id } = req.user;
    const { id } = req.params;

    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const goal = await Goal.findById(id);
    if (!goal) {
      return res.status(400).json({ message: "Goal didn't exist" });
    }

    await Goal.findByIdAndDelete(id);

    res.status(200).json({ message: "Goal deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
