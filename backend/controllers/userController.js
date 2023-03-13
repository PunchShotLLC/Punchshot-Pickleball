let User = require('../models/user.model');

// get user w id
const getUser = async (req, res) => {
    const user = await User.findById(req.params.id)
        .then((doc) => {
            res.status(200).json(doc)
        })
        .catch((error) => {
            res.status(400).json({error: error.message});
        })
}

// create new user
const createUser = async (req, res) => {
    const {Email, Username, Password, FirstName, LastName, ZipCode, SkillLevel, Bio, ProfilePhoto} = req.body;

    try {
        const newUser = await User.create({Email, Username, Password, FirstName, LastName, ZipCode, SkillLevel, Bio, ProfilePhoto});
        res.status(200).json(newUser);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

// delete user by id
const deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id)
        .then((doc) => {
            res.status(200).json(doc)
        })
        .catch((error) => {
            res.status(400).json({error: error.message});
        })
} 

module.exports = {
    getUser,
    createUser,
    deleteUser
}