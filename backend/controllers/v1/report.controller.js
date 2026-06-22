import Transaction from "../../models/transaction.model.js";
import User from "../../models/user.model.js";

export const getReportSummary = async (req, res) => {
  try {
    const { _id } = req.user;
    const { startDate, endDate } = req.query;

    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const matchQuery = { userId: user._id };
    if (startDate && endDate) {
      matchQuery.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const transactions = await Transaction.find(matchQuery);

    const totals = transactions.reduce(
      (acc, t) => {
        if (t.type === "Income") acc.income += Number(t.amount);
        else if (t.type === "Expense") acc.expense += Number(t.amount);
        return acc;
      },
      { income: 0, expense: 0 }
    );

    const balance = totals.income - totals.expense;
    const savingsRate =
      totals.income > 0 ? ((balance / totals.income) * 100).toFixed(1) : 0;

    res.status(200).json({
      totalIncome: totals.income,
      totalExpenses: totals.expense,
      netSavings: balance,
      savingsRate: Number(savingsRate),
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getReportCharts = async (req, res) => {
  try {
    const { _id } = req.user;
    const { startDate, endDate, reportType = "Monthly" } = req.query;

    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const matchQuery = { userId: user._id };
    if (startDate && endDate) {
      matchQuery.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const transactions = await Transaction.find(matchQuery);

    // 1. Expense by Category
    const categoryMap = {};
    let totalExpense = 0;
    transactions.forEach((t) => {
      if (t.type === "Expense") {
        categoryMap[t.category] = (categoryMap[t.category] || 0) + Number(t.amount);
        totalExpense += Number(t.amount);
      }
    });

    const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8", "#F7DC6F", "#BB8FCE"];
    const expenseCategoryData = Object.keys(categoryMap).map((key, index) => ({
      name: key,
      value: categoryMap[key],
      color: colors[index % colors.length],
    }));

    // 2. Top Spending Categories
    const topSpending = expenseCategoryData
      .sort((a, b) => b.value - a.value)
      .slice(0, 5)
      .map((item) => ({
        category: item.name,
        amount: item.value,
        percentage: totalExpense > 0 ? Math.round((item.value / totalExpense) * 100) : 0,
      }));

    // 3. Comparison Data & Spending Trend Data
    // Grouping based on reportType: Weekly (by day), Monthly (by week or day), Annually (by month), Yearly (by year)
    // We will simplify: 
    // - Weekly: Group by Day of week
    // - Monthly: Group by Day of month
    // - Annually: Group by Month
    // - Yearly: Group by Year
    
    let diffDays = 0;
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      diffDays = Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;
    }

    let dateFormat = "%Y-%m-%d";
    let dynamicGrouping = null;

    if (reportType === "Weekly") {
      dateFormat = "%Y-%m-%d";
    } else if (reportType === "Monthly") {
      dateFormat = "%Y-%m-%d";
    } else if (reportType === "Annually") {
      dateFormat = "%Y-%m";
    } else if (reportType === "Yearly") {
      dateFormat = "%Y";
    } else if (reportType === "Range") {
      if (diffDays <= 14) {
        dateFormat = "%Y-%m-%d";
        dynamicGrouping = "daily";
      } else if (diffDays <= 60) {
        dateFormat = "%Y-%m-%d";
        dynamicGrouping = "weekly";
      } else if (diffDays <= 365) {
        dateFormat = "%Y-%m";
        dynamicGrouping = "monthly";
      } else {
        dateFormat = "%Y";
        dynamicGrouping = "yearly";
      }
    }

    const aggregatedData = await Transaction.aggregate([
      { $match: matchQuery },
      {
        $group: {
          _id: { $dateToString: { format: dateFormat, date: "$date" } },
          income: {
            $sum: { $cond: [{ $eq: ["$type", "Income"] }, "$amount", 0] }
          },
          expense: {
            $sum: { $cond: [{ $eq: ["$type", "Expense"] }, "$amount", 0] }
          }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const comparisonDataMap = {};
    aggregatedData.forEach((item) => {
      comparisonDataMap[item._id] = item;
    });

    const comparisonData = [];
    const spendingTrendData = [];

    if (startDate && endDate) {
      let current = new Date(startDate);
      const end = new Date(endDate);

      if (reportType === "Monthly") {
        const weeksMap = {
          1: { income: 0, expense: 0, start: null, end: null },
          2: { income: 0, expense: 0, start: null, end: null },
          3: { income: 0, expense: 0, start: null, end: null },
          4: { income: 0, expense: 0, start: null, end: null },
          5: { income: 0, expense: 0, start: null, end: null },
        };
        
        while (current <= end) {
          let periodStr = current.toISOString().split("T")[0];
          const existing = comparisonDataMap[periodStr];
          const dayOfMonth = current.getUTCDate();
          
          let weekNum = Math.floor((dayOfMonth - 1) / 7) + 1;
          if (weekNum > 5) weekNum = 5;

          const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          const shortDateStr = `${monthNames[current.getUTCMonth()]} ${dayOfMonth}`;
          
          if (!weeksMap[weekNum].start) weeksMap[weekNum].start = shortDateStr;
          weeksMap[weekNum].end = shortDateStr;

          if (existing) {
            weeksMap[weekNum].income += existing.income;
            weeksMap[weekNum].expense += existing.expense;
          }

          current.setUTCDate(current.getUTCDate() + 1);
        }

        Object.keys(weeksMap).forEach(w => {
          if (weeksMap[w].start) {
            comparisonData.push({
              period: `Week ${w}`,
              fullPeriod: `Week ${w} (${weeksMap[w].start} - ${weeksMap[w].end})`,
              Income: weeksMap[w].income,
              Expense: weeksMap[w].expense
            });
            spendingTrendData.push({
              period: `Week ${w}`,
              fullPeriod: `Week ${w} (${weeksMap[w].start} - ${weeksMap[w].end})`,
              spending: weeksMap[w].expense,
              budget: 0
            });
          }
        });
      } else if (reportType === "Range" && dynamicGrouping === "weekly") {
        let weeksArr = [];
        let currentWeek = null;
        let dayCounter = 0;

        while (current <= end) {
          if (dayCounter % 7 === 0) {
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const startStr = `${monthNames[current.getUTCMonth()]} ${current.getUTCDate()}`;
            currentWeek = {
              start: startStr,
              end: startStr,
              income: 0,
              expense: 0
            };
            weeksArr.push(currentWeek);
          }

          let periodStr = current.toISOString().split("T")[0];
          const existing = comparisonDataMap[periodStr];

          const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          currentWeek.end = `${monthNames[current.getUTCMonth()]} ${current.getUTCDate()}`;

          if (existing) {
            currentWeek.income += existing.income;
            currentWeek.expense += existing.expense;
          }

          current.setUTCDate(current.getUTCDate() + 1);
          dayCounter++;
        }

        weeksArr.forEach(w => {
          comparisonData.push({
            period: `Week of ${w.start}`,
            fullPeriod: `${w.start} - ${w.end}`,
            Income: w.income,
            Expense: w.expense
          });
          spendingTrendData.push({
            period: `Week of ${w.start}`,
            fullPeriod: `${w.start} - ${w.end}`,
            spending: w.expense,
            budget: 0
          });
        });
      } else {
        while (current <= end) {
          let periodStr = "";
          let displayPeriod = "";
          let fullPeriod = "";

          if (dateFormat === "%Y-%m-%d") {
            periodStr = current.toISOString().split("T")[0];
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const shortDateStr = `${monthNames[current.getUTCMonth()]} ${current.getUTCDate()}`;

            if (reportType === "Weekly" || (reportType === "Range" && dynamicGrouping === "daily")) {
              const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
              const dayName = days[current.getUTCDay()];
              
              if (reportType === "Range" && diffDays > 7) {
                displayPeriod = shortDateStr;
                fullPeriod = `${dayName} (${shortDateStr})`;
              } else {
                displayPeriod = dayName;
                fullPeriod = `${displayPeriod} (${shortDateStr})`;
              }
            } else {
              displayPeriod = periodStr;
              fullPeriod = periodStr;
            }
            current.setUTCDate(current.getUTCDate() + 1);
          } else if (dateFormat === "%Y-%m") {
            periodStr = current.toISOString().substring(0, 7);
            
            if (reportType === "Annually" || (reportType === "Range" && dynamicGrouping === "monthly")) {
              const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
              displayPeriod = monthNames[current.getUTCMonth()];
              fullPeriod = `${displayPeriod} ${current.getUTCFullYear()}`;
            } else {
              displayPeriod = periodStr;
              fullPeriod = periodStr;
            }
            
            current.setUTCMonth(current.getUTCMonth() + 1);
          } else if (dateFormat === "%Y") {
            periodStr = current.toISOString().substring(0, 4);
            displayPeriod = periodStr;
            fullPeriod = periodStr;
            current.setUTCFullYear(current.getUTCFullYear() + 1);
          }

          const existing = comparisonDataMap[periodStr];
          comparisonData.push({
            period: displayPeriod,
            fullPeriod: fullPeriod,
            Income: existing ? existing.income : 0,
            Expense: existing ? existing.expense : 0,
          });

          spendingTrendData.push({
            period: displayPeriod,
            fullPeriod: fullPeriod,
            spending: existing ? existing.expense : 0,
            budget: 0,
          });
        }
      }
    } else {
      aggregatedData.forEach(item => {
        comparisonData.push({
          period: item._id,
          Income: item.income,
          Expense: item.expense
        });
        spendingTrendData.push({
          period: item._id,
          spending: item.expense,
          budget: 0
        });
      });
    }

    res.status(200).json({
      expenseCategoryData,
      topSpending,
      comparisonData,
      spendingTrendData
    });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
