import express from "express";

const router = express.Router();

import { createLeague } from "../controllers/leagueController.js";

router.post("/createLeague", createLeague);

export default router;
