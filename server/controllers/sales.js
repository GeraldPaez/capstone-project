import AllStat from "../models/allStat.js";
import Prediction from "../models/transaction.js";

export const getSales = async (req, res) => {
  try {
    const allStats = await AllStat.find();

    res.status(200).json(allStats[0]);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPredictedSales = async (req, res) => {
  try {
    const predictedsales = await Prediction.find();

    res.status(200).json(predictedsales[0]);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
