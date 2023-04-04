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


    let duplEmail = await User.find({Email : req.body.Email});
    let duplUsername = await User.find({Username : req.body.Username});

    if (duplEmail.length > 0 || duplUsername.length > 0) {
        res.status(400).json({error : "Duplicate user"});
    } else {
        try {
            const newUser = await User.create({Email, Username, Password, FirstName, LastName, ZipCode, SkillLevel, Bio, ProfilePhoto});
            res.status(200).json(newUser);
        } catch (error) {
            res.status(400).json({error: error.message});
        }
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


// update name, email, username, password, content (zipcode, skilllevel, bio, profilephoto)
const updateContent = async(req, res) => {
    const filter = {_id : req.params.id};
    const update = req.body;
    await User.findByIdAndUpdate(filter, update, {new : true})
        .then((doc) => {
            res.status(200).json(doc);
        })
        .catch((error) => {
            res.status(400).json({error : error.message});
        })
}





module.exports = {
    getUser,
    createUser,
    deleteUser,
    updateContent
}