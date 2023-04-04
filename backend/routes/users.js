const router = require('express').Router();
let User = require('../models/user.model');
const {
    getUser, createUser, deleteUser, updateContent
} = require('../controllers/userController')

router.route('/:id').get(getUser);

// router.post('/add').post((req, res, next) => {

// });

router.post('/add', createUser)

router.route('/delete/:id').delete(deleteUser);

router.post('/update/:id', updateContent);

module.exports = router;