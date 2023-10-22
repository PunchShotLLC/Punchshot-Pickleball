import League from "../models/league.model.js";
import User from "../models/user.model.js";

export const createLeague = async (req, res, body) => {
  const {
    LeagueName,
    LeagueOwner,
    NumTeams,
    ZipCode,
    City,
    StartDate,
    EndDate,
  } = req.body;

  if (!LeagueName) {
    return res.json({
      error: "LeagueName is required",
    });
  }
  if (!LeagueOwner) {
    return res.json({
      error: "LeagueOwner is required",
    });
  }
  if (!NumTeams) {
    return res.json({
      error: "Number of Teams is required",
    });
  }

  if (!ZipCode || ZipCode.length !== 5) {
    return res.json({
      error: "Valid zip code is required",
    });
  }

  if (!City) {
    return res.json({
      error: "City is required",
    });
  }

  if (!StartDate) {
    return res.json({
      error: "Start Date is required",
    });
  }

  if (!EndDate) {
    return res.json({
      error: "End Date is required",
    });
  }

  const existUsername = await User.findOne({ LeagueOwner });
  if (!existUsername) {
    return res.json({
      error: "League owner does not exist",
    });
  }

  try {
    const league = await new League({
      LeagueName,
      LeagueOwner,
      NumTeams,
      ZipCode,
      City,
      StartDate,
      EndDate,
    }).save();

    return res.json({ league });
  } catch (error) {
    console.log(error);
    return res.error;
  }
};

export const updateLeague = async (req, res, body) => {
  /*
  const {id} = req.params

  if (!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({error:'No such Tournament'})
  }
  const tourney = await Tournament.findOneAndUpdate({_id:id}, {...req.body})
  if (!tourney){
      return res.status(400).json({error:'No such Tournament'})
  }
  res.status(200).json(tourney)
  */
  await League.findByIdAndUpdate(req.params.id, req.body)
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};

export const getLeagues = async (req, res) => {
  const allLeagues = await League.find({}).sort({ createdAt: -1 });
  res.status(200).json(allLeagues);
};

export const getLeague = async (req, res) => {
  const league = await League.findById(req.params.id)
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};

export const deleteLeague = async (req, res) => {
  await League.findByIdAndDelete(req.params.id)
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};
