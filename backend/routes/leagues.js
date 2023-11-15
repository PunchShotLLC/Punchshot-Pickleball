import express from "express";

const router = express.Router();

import { createLeague, updateLeague, getLeagues, getLeague, deleteLeague, sendRequestEmail, testroute, getAddressInfo } from "../controllers/leagueController.js";


router.route("/").get(getLeagues);
router.route("/address").get(getAddressInfo);
router.route("/sendRequestEmail").get(sendRequestEmail);
router.route("/testroute").get(testroute);
router.post("/createLeague", createLeague);
router.route("/:zip").get(getLeague);
router.route("/updateLeague/:id").patch(updateLeague);
router.route("/deleteLeague/:id").delete(deleteLeague);

export default router;
