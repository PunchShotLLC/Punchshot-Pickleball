import express from "express";

const router = express.Router();

import { createLeague, updateLeague } from "../controllers/leagueController.js";

router.post("/createLeague", createLeague);
router.route("/updateLeague/:id").patch(updateLeague)

export default router;
