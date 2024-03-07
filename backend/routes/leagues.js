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
  deleteTeam,
  updateTeamCaptain
} from "../controllers/leagueController.js";

router.route("/address").get(getAddressInfo);
router.route("/checkAddress").get(checkAddressWithinRadius);
router.route("/sendRequestEmail").get(sendRequestEmail);
router.route("/").get(getLeagues);
router.route("/:id/standings").get(getStandings);
router.route("/:leagueName").get(getLeague);
router.post("/createLeague", createLeague);
router.route("/updateLeague/:id").patch(updateLeague);
router.route("/updateLeague/updateTeamCaptain/:leagueId/:teamId/:username").patch(updateTeamCaptain);
router.route("/startLeague/:id").patch(startLeague);
router.route("/deleteLeague/:id").delete(deleteLeague);
router.route("/deleteTeam/:leagueId/:teamId").delete(deleteTeam)
router.route("/deleteTeam/:leagueId/:teamId").delete(deleteTeam)

router.route("/").get(getLeagues);

export default router;