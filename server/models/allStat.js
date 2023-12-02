import mongoose from "mongoose";

const AllStatSchema = new mongoose.Schema(
  {
    totalCustomers: Number,
    yearlySalesTotal: Number,
    yearlyTotalSoldUnits: Number,
    year: [Number],
    monthlyData: [
      {
        month: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
    dailyData: [
      {
        date: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
    salesByUnits: {
      type: Map,
      of: Number,
    },
  },
  { timestamps: true }
);

const AllStat = mongoose.model("AllStat", AllStatSchema);
export default AllStat;
