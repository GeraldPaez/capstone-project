import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import multer from "multer";
// import { fileURLtoPath } from "url";
import dashboardRoutes from "./routes/dashboard.js";
import inventoryRoutes from "./routes/inventory.js";
import customerRoutes from "./routes/client.js";
import salesRoutes from "./routes/sales.js";
import authRoutes from "./routes/auth.js";
import { register } from "./controllers/auth.js";

// Data Imports
import Inventory from "./models/inventory.js";
import User from "./models/user.js";
import {
  userData,
  inventoryData,
  transactionData,
  transactionData2,
  dataAllStat,
  dataProductStat,
} from "./data/index.js";
import Transaction from "./models/transaction.js";
import AllStat from "./models/allStat.js";
import InventoryStat from "./models/inventoryStat.js";

// Configuration
dotenv.config();
const app = express();
const { path } = "path";
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
// const __filename = fileURLtoPath(import.meta.url);
// const __dirname = path / DocumentFragment(__filename);
// app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// Routes
app.use("/dashboard", dashboardRoutes);
app.use("/inventory", inventoryRoutes);
app.use("/client", customerRoutes);
app.use("/inventory/items", inventoryRoutes);
app.use("/sales", salesRoutes);
app.use("/transactions", customerRoutes);
app.use("/auth", authRoutes);
// app.use("/workers", express.static(path.join(__dirname, "workers")));
app.use(
  "/workers",
  express.static("workers", { type: "application/javascript" })
);

// app.use("/auth/register", express.static(path.join(__dirname, "uploads")));

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);

// Mongoose Setup
const PORT = process.env.PORT || 3030;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* Only add data one time */
    // Inventory.insertMany(inventoryData);
    // User.insertMany(userData);
    // Transaction.insertMany(transactionData);
    // Transaction.insertMany(transactionData2);
    // AllStat.insertMany(dataAllStat);
    // InventoryStat.insertMany(dataProductStat);
  })
  .catch((error) => console.log(`${error} Database did not connect`));
