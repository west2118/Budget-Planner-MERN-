import Card from "../../models/card.model.js";
import User from "../../models/user.model.js";

export const getUserCards = async (req, res) => {
  try {
    const { _id } = req.user;
    const { page, limit } = req.query;

    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    if (page && limit) {
      const pageNumber = parseInt(page, 10);
      const limitNumber = parseInt(limit, 10);
      const skip = (pageNumber - 1) * limitNumber;

      const cards = await Card.find({ userId: user._id }).skip(skip).limit(limitNumber);
      const totalCards = await Card.countDocuments({ userId: user._id });
      const totalPages = Math.ceil(totalCards / limitNumber);

      return res.status(200).json({ cards, totalPages, currentPage: pageNumber, total: totalCards });
    } else {
      const cards = await Card.find({ userId: user._id });
      return res.status(200).json(cards);
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getCardsSummary = async (req, res) => {
  try {
    const { _id } = req.user;

    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const cards = await Card.find({ userId: user._id });

    const totalBalance = cards.reduce((sum, card) => sum + card.balance, 0);
    const creditCards = cards.filter((card) => card.type === "Credit");
    const totalCreditLimit = cards.reduce(
      (sum, card) => sum + (card.budgetLimit || 0),
      0
    );
    const totalCreditUsed = creditCards.reduce((sum, card) => sum + card.balance, 0);

    res.status(200).json({
      totalBalance,
      totalCreditLimit,
      totalCreditUsed,
      totalCards: cards.length,
      creditCardsCount: creditCards.length,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const postCard = async (req, res) => {
  try {
    const { _id } = req.user;
    const { name, balance = 0, type, budgetLimit = null } = req.body;

    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const cardLimit = await Card.countDocuments({ userId: user._id });
    if (cardLimit >= 6) {
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
    const { _id } = req.user;
    const { id } = req.params;
    const { formData } = req.body;

    console.log(formData);

    const user = await User.findById(_id);
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
    const { _id } = req.user;
    const { id } = req.params;

    const user = await User.findById(_id);
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
