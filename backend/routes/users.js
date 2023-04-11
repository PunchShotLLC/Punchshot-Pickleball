const router = require('express').Router();
let User = require('../models/user.model');
const {
    getUser, createUser, deleteUser, updateContent, loginUser
} = require('../controllers/userController')

router.route('/:id').get(getUser);

// router.post('/add').post((req, res, next) => {

// });

router.post('/login', loginUser);

router.post('/add', createUser)

router.route('/delete/:id').delete(deleteUser);

router.post('/update/:id', updateContent);

module.exports = router;