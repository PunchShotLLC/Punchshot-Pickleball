
const router = require('express').Router();
let User = require('../models/user.model');

const {
    getUser, addFriend, deleteFriend
} = require('../controllers/friendsController')

//all routes on express router
router.route('/:id').get(getUser);
router.post('/add', addFriend);
router.route('/delete').delete(deleteFriend);

module.exports = router;