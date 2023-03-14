const router = require('express').Router();
let User = require('../models/user.model');
const {
    getUser, createUser, deleteUser
} = require('../controllers/userController')

router.route('/:id').get(getUser);

// router.post('/add').post((req, res, next) => {

// });

router.post('/add', createUser)

router.route('/delete/:id').delete(deleteUser);

module.exports = router;