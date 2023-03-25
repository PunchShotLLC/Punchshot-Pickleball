
const router = require('express').Router();
let Tournament = require('../models/tournament.model');

const {
    getTournament, createTournament, deleteTournament, getTournaments
} = require('../controllers/tournamentController')

//all routes on express router
router.route('/:id').get(getTournament);
router.route('/').get(getTournaments);
router.post('/add', createTournament);
router.route('/delete/:id').delete(deleteTournament);

module.exports = router;