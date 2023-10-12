import express from "express";

const router = express.Router();

import { createLeague, updateLeague, getLeagues, getLeague, deleteLeague } from "../controllers/leagueController.js";

router.post("/createLeague", createLeague);
router.route("/").get(getLeagues)
router.route("/:id").get(getLeague)
router.route("/updateLeague/:id").patch(updateLeague)
router.route("/deleteLeague/:id").delete(deleteLeague)

export default router;
