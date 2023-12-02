// import User from "../models/user.js";
import Users from "../models/userModel.js";
import Transaction from "../models/transaction.js";

export const getCustomers = async (req, res) => {
  try {
    const customers = await Users.find({ role: "Business Owner" }).select(
      "-password"
    );
    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : 0),
      };

      return sortFormatted;
    };
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const transactions = await Transaction.find({
      $or: [
        { ProdID: { $regex: new RegExp(search, "i") } },
        { Name: { $regex: new RegExp(search, "i") } },
        { Unit: { $regex: new RegExp(search, "i") } },
        { Date: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await Transaction.countDocuments({
      name: { $regex: search, $options: "i" },
    });

    res.status(200).json({
      transactions,
      total,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
