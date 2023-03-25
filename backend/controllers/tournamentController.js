let Tournament = require('../models/tournament.model');

const getTournaments = async (req,res) => {
    const alltournaments = await Tournament.find({}).sort({createdAt: -1})
    res.status(200).json(alltournaments)
}

const getTournament = async (req, res) => {
    const tournament = await Tournament.findById(req.params.id)
        .then((doc) => {
            res.status(200).json(doc)
        })
        .catch((error) => {
            res.status(400).json({error: error.message});
        })
}

const createTournament = async(req,res) => {
    const {Tournament_Name, Skill_Level, Divisions_Offered, Entry_Fee, Prize, Registration_Deadline} = req.body;

    try {
        const newTournament = await Tournament.create({Tournament_Name, Skill_Level, Divisions_Offered, Entry_Fee, Prize, Registration_Deadline});
        //res.json({mssg:"POST a new tournament"})
        res.status(200).json(newTournament);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const deleteTournament = async(req, res) => {
    await Tournament.findByIdAndDelete(req.params.id)
        .then((doc) => {
            res.status(200).json(doc)
        })
        .catch((error) => {
            res.status(400).json({error: error.message});
        })
}

/*
const updateTournament = async(req,res) => {

}*/

module.exports = {
    getTournament,
    getTournaments,
    createTournament,
    deleteTournament
}