import express from "express";

const router = express.Router();

import { createLeague, updateLeague, getLeagues } from "../controllers/leagueController.js";

router.post("/createLeague", createLeague);
router.route("/").get(getLeagues)
router.route("/updateLeague/:id").patch(updateLeague)

export default router;
