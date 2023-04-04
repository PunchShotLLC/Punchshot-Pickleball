let User = require('../models/user.model');

// get user w id (user contains all friends)
const getUser = async (req, res) => {
    const user = await User.findById(req.params.id)
        .then((doc) => {
            res.status(200).json(doc)
        })
        .catch((error) => {
            res.status(400).json({error: error.message});
        })
}

// add friend by id
const addFriend = async (req, res) => {
    const {myId, friendId} = req.body;

    try {
        const friend = await User.findById(friendId);
        const friendFirstName = friend.FirstName;
        const friendLastName = friend.LastName;
        const friendProfilePhoto = friend.ProfilePhoto;
        const updatedUser = await User.findOneAndUpdate({_id: myId}, {
            $addToSet: {
                Friends: {
                    friendId, friendFirstName, friendLastName, friendProfilePhoto
                }
            }
        }, {new: true});
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

// delete user by id
const deleteFriend = async (req, res) => {
    const {myId, friendId} = req.body;

    await User.findOneAndUpdate({_id: myId}, {
        $pull: {
            Friends: {
                Id: friendId
            }
        }
    }, {new: true})
        .then((doc) => {
            res.status(200).json(doc)
        })
        .catch((error) => {
            res.status(400).json({error: error.message});
        })
} 

module.exports = {
    getUser,
    addFriend,
    deleteFriend
}