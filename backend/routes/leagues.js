import express from "express";

const router = express.Router();

import { createLeague, updateLeague, getLeagues, getLeague, deleteLeague, sendRequestEmail, testroute } from "../controllers/leagueController.js";

router.route("/sendRequestEmail").get(sendRequestEmail)
router.route("/testroute").get(testroute)
router.post("/createLeague", createLeague);
router.route("/:zip").get(getLeague)
router.route("/updateLeague/:id").patch(updateLeague)
router.route("/deleteLeague/:id").delete(deleteLeague)
router.route("/").get(getLeagues)

export default router;
