let User = require('../models/user.model');
const bcrypt = require('bcrypt')
var jwt = require("jsonwebtoken");

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

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

//get user with username, password
const loginUser = async(req, res) =>{
    const {Username, Password} = req.body;
    
    try{
        // console.log(req.body);
        // console.log(Username, Password);
        if (!Username || !Password) {
            throw Error('All fields must be filled')
        }
        const user = await User.findOne({Username})
        if (!user) {
            throw Error('Incorrect email')
        }

        console.log(user);
          
        // let match1 = await bcrypt.compare(Password, user.Password)     
        // if (!match1) {
        //     throw Error('Incorrect password')
        // }
        let match2 = (Password === user.Password)
        if (!match2) {
            throw Error('Incorrect password')
        }
        // const token = createToken(user._id)
        // const p = user.Password
        res.status(200).json({Username, Password})
        console.log("logged in");
        // res.status(200).json({p})
    } catch (error){
        res.status(400).json({error: error.message})
    }

}

// create new user
const createUser = async (req, res) => {
    const {Email, Username, Password, FirstName, LastName, ZipCode, SkillLevel, Bio, ProfilePhoto} = req.body;


    // let duplEmail = await User.find({Email : req.body.Email});
    // let duplUsername = await User.find({Username : req.body.Username});

    // if (duplUsername.length > 0) { // removed check for duplEmail here - since not in create for now
    //     res.status(400).json({error : "Duplicate user", "duplUser" : duplUsername});
    // } else 
    // {
        try {
            // const newUser = await User.create({Email, Username, Password, FirstName, LastName, ZipCode, SkillLevel, Bio, ProfilePhoto});
            const newUser = await User.create({Username, Password});

            res.status(200).json(newUser);
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    // }
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
    updateContent,
    loginUser
}