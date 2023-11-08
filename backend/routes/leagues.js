import express from "express";

const router = express.Router();

import { createLeague, updateLeague, getLeagues, getLeague, deleteLeague, getCourts } from "../controllers/leagueController.js";


router.post("/createLeague", createLeague);
router.route("/:zip").get(getLeague)
router.route("/updateLeague/:id").patch(updateLeague)
router.route("/deleteLeague/:id").delete(deleteLeague)  
router.route("/").get(getLeagues)
router.get("/courts", getCourts);

export default router;
