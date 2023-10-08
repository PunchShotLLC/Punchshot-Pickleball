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

export const updateLeague = async(req, res, body) => {
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
          res.status(200).json(doc)
      })
      .catch((error) => {
          res.status(400).json({error: error.message});
      })
}

export const getLeagues = async (req,res) => {
  const allLeagues = await League.find({}).sort({createdAt: -1})
  res.status(200).json(allLeagues)
}