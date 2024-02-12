import express from "express";

const router = express.Router();

import {
  createLeague,
  updateLeague,
  getLeagues,
  getLeague,
  deleteLeague,
  sendRequestEmail,
  getAddressInfo,
  startLeague,
  getStandings,
  checkAddressWithinRadius,
} from "../controllers/leagueController.js";

router.route("/address").get(getAddressInfo);
router.route("/checkAddress").get(checkAddressWithinRadius);
router.route("/sendRequestEmail").get(sendRequestEmail);
router.route("/").get(getLeagues);
router.route("/:id/standings").get(getStandings);
router.post("/createLeague", createLeague);
router.route("/:zip").get(getLeague);
router.route("/updateLeague/:id").patch(updateLeague);
router.route("/startLeague/:id").patch(startLeague);
router.route("/deleteLeague/:id").delete(deleteLeague);
router.route("/").get(getLeagues);

export default router;
