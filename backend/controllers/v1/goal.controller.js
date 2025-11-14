import Goal from "../../models/goal.model.js";
import User from "../../models/user.model.js";

export const getUserGoals = async (req, res) => {
  try {
    const { uid } = req.user;

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const goals = await Goal.find({ userId: user._id });

    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const postGoal = async (req, res) => {
  try {
    const { uid } = req.user;
    const {
      title,
      category,
      targetAmount,
      currentAmount,
      deadline,
      description,
    } = req.body;

    const user = await User.findOne({ uid });
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
