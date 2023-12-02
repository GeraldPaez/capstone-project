import User from "../models/user.js";
import AllStat from "../models/allStat.js";
import Transaction from "../models/transaction.js";
// import InventoryStat from "../models/inventoryStat.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    // Get current date
    // const currentDate = new Date();

    // Extract year, month, and day from the current date
    // const currentYear = currentDate.getFullYear();
    // const currentMonth = new Intl.DateTimeFormat('en-PH', { month: 'long' }).format(currentDate);
    // const currentDay = currentDate.toLocaleDateString('en-PH');

    // hardcoded values
    const currentMonth = "December";
    const currentYear = 2021;
    const currentDay = "12/12/2021";

    /* Recent Transactions */
    const transactions = await Transaction.find()
      .limit(30)
      .sort({ createdOn: -1 });

    // Calculate total quantity from transactions
    const totalQuantity = transactions.reduce(
      (total, transaction) => total + transaction.Quantity,
      0
    );

    /* Overall Stats */
    const allStat = await AllStat.find({ year: currentYear });

    const {
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByUnits,
    } = allStat[0];

    const thisMonthStats = allStat[0].monthlyData.find(({ month }) => {
      return month === currentMonth;
    });

    const todayStats = allStat[0].dailyData.find(({ date }) => {
      return date === currentDay;
    });

    res.status(200).json({
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByUnits,
      thisMonthStats,
      todayStats,
      transactions,
      totalQuantity,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
