import User from "../models/league.model.js";
import League from "../models/league.model.js";

export const createLeague = async (req, res, body) => {
  const { LeagueName, NumTeams, ZipCode, City } = req.body;

  if (!LeagueName) {
    return res.json({
      error: "LeagueName is required",
    });
  }

  if (!NumTeams) {
    return res.json({
      error: "Number of Competitors is required",
    });
  }

  if (!ZipCode) {
    return res.json({
      error: "Zip Code is required",
    });
  }

  if (!City) {
    return res.json({
      error: "City is required",
    });
  }

  try {
    const league = await new League({
      LeagueName,
      NumTeams,
      ZipCode,
      City,
    }).save();

    return res.json({ league });
  } catch (error) {
    console.log(error);
    return res.error;
  }
};

export const addTeamToLeague = async (req, res, body) => {};
