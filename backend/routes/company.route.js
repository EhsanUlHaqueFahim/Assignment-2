import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getCompany, registerCompany } from "../controllers/company.controller.js";

const router = express.Router();

router.route("/register").post(isAuthenticated,registerCompany);
router.route("/get").get(isAuthenticated,getCompany);

export default router;
