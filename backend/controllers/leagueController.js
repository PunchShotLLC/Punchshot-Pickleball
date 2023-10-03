import User from "../models/league.model.js";
import League from "../models/league.model.js";

export const createLeague = async (req, body) => {
  const {
    LeagueName,
    NumCompetitors,
    SkillLevel,
    ZipCode,
    City,
    Prize,
    Email,
  } = req.body;

  if (!LeagueName) {
    return res.json({
      error: "LeagueName is required",
    });
  }

  if (!NumCompetitors) {
    return res.json({
      error: "Number of Competitors is required",
    });
  }

  if (!SkillLevel) {
    return res.json({
      error: "Skill Level is required",
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

  if (!Email) {
    return res.json({
      error: "Email is required",
    });
  }

  const exist = await User.findOne({ Email });
  if (exist) {
    return res.json({
      error: "Tournament Already Created. Email already exists.",
    });
  }

  try {
    const league = await new League({
      LeagueName,
      NumCompetitors,
      SkillLevel,
      ZipCode,
      City,
      Prize,
      Email,
    }).save();

    return res.json({ league });
  } catch {
    console.log(error);
  }
};
