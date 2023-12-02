import express from "express";
import { getSales } from "../controllers/sales.js";
import { getPredictedSales } from "../controllers/sales.js";

const router = express.Router();

router.get("/revenue", getSales);
router.get("/prediction", getPredictedSales);

export default router;
