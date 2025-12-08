import Transaction from "../models/transaction.model.js";
import User from "../models/user.model.js"; // Assuming you have a User model

export async function getIncomeVsExpenses(period = "day") {
  const currentDate = new Date();

  // Generate the list of 7 days (from today to 6 days ago)
  const dates = [];
  for (let i = 0; i <= 7; i++) {
    const date = new Date();
    date.setDate(currentDate.getDate() - i);
    date.setHours(0, 0, 0, 0); // Set time to midnight for accurate comparison
    dates.push(date.toISOString().split("T")[0]); // Format as YYYY-MM-DD
  }

  console.log("Dates for the last 7 days:", dates);

  try {
    // Aggregation pipeline to get income and expenses for the past 7 days
    const aggregationPipeline = [
      {
        $match: {
          date: { $gte: new Date(dates[6]) }, // Match transactions from 7 days ago
        },
      },
      {
        $addFields: {
          period: {
            $dateToString: {
              format: "%Y-%m-%d", // Group by day
              date: "$date", // Use the date field
            },
          },
        },
      },
      {
        $group: {
          _id: "$period", // Group by day
          total_income: {
            $sum: { $cond: [{ $eq: ["$type", "Income"] }, "$amount", 0] },
          },
          total_expenses: {
            $sum: { $cond: [{ $eq: ["$type", "Expense"] }, "$amount", 0] },
          },
        },
      },
      { $sort: { _id: 1 } }, // Sort by period in ascending order (oldest first)
    ];

    // Perform aggregation
    const result = await Transaction.aggregate(aggregationPipeline);
    console.log("Aggregation Result: ", result);

    // Merge the result with the 7 days array
    const finalResult = dates.map((date) => {
      const transaction = result.find((r) => r._id === date);
      if (transaction) {
        return transaction;
      } else {
        // If no transaction data, return 0 income/expenses
        return { _id: date, total_income: 0, total_expenses: 0 };
      }
    });

    return finalResult; // Return the full 7 days result
  } catch (error) {
    console.error("Error in getIncomeVsExpenses:", error);
    throw error;
  }
}
