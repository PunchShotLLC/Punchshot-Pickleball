const { default: mongoose } = require('mongoose');
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
        const newTournament = await Tournament.create(
            {
                Tournament_Name: Tournament_Name,
                Skill_Level: Skill_Level,
                Divisions_Offered: Divisions_Offered,
                Entry_Fee: Entry_Fee,
                Prize: Prize,
                Registration_Deadline: Registration_Deadline
            }
        );
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


const updateTournament = async(req,res) => {
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
    await Tournament.findByIdAndUpdate(req.params.id, req.body)
        .then((doc) => {
            res.status(200).json(doc)
        })
        .catch((error) => {
            res.status(400).json({error: error.message});
        })
}

module.exports = {
    getTournament,
    getTournaments,
    createTournament,
    deleteTournament,
    updateTournament
}