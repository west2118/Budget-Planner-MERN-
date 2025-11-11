import Card from "../../models/card.model.js";
import User from "../../models/user.model.js";

export const getUserCards = async (req, res) => {
  try {
    const { uid } = req.user;

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const cards = await Card.find({ userId: user._id });

    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const postCard = async (req, res) => {
  try {
    const { uid } = req.user;
    const { name, balance = 0, type, budgetLimit = null } = req.body;

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const cardLimit = await Card.countDocuments({ userId: user._id });
    if (cardLimit >= 7) {
      return res.status(400).json({ message: "Card limit reached" });
    }

    const cardExist = await Card.findOne({ userId: user._id, name });
    if (cardExist) {
      return res.status(400).json({ message: "Card already exist" });
    }

    const newCard = await Card.create({
      userId: user._id,
      name,
      balance: Number(balance),
      type,
      budgetLimit:
        budgetLimit === null || Number(budgetLimit) === 0
          ? null
          : Number(budgetLimit),
    });

    res.status(200).json({ message: "Card created successfully!", newCard });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const putCard = async (req, res) => {
  try {
    const { uid } = req.user;
    const { id } = req.params;
    const { formData } = req.body;

    console.log(formData);

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const card = await Card.findById(id);
    if (!card) {
      return res.status(400).json({ message: "Card didn't exist" });
    }

    const cardExist = await Card.findOne({
      userId: user._id,
      name: formData.name,
      _id: { $ne: id },
    });
    if (cardExist) {
      return res.status(400).json({ message: "Card already exist" });
    }

    const updatedCard = await Card.findByIdAndUpdate(
      id,
      { ...formData },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Card updated successfully!", updatedCard });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteCard = async (req, res) => {
  try {
    const { uid } = req.user;
    const { id } = req.params;

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const card = await Card.findById(id);
    if (!card) {
      return res.status(400).json({ message: "Card didn't exist" });
    }

    if (user._id.toString() !== card.userId.toString()) {
      return res
        .status(400)
        .json({ message: "You don't have authorized in this card!" });
    }

    await Card.findByIdAndDelete(id);

    res.status(200).json({ message: "Card deleted successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
