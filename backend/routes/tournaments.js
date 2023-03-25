
const router = require('express').Router();
let Tournament = require('../models/tournament.model');

const {
    getTournament, createTournament, deleteTournament, updateTournament
} = require('../controllers/tournamentController')

router.route('/:id').get(getTournament);
router.post('/add', createTournament);
router.route('/delete/:id').delete(deleteTournament);

module.exports = router;