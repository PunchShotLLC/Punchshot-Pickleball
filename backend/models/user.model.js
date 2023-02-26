const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    Email:{
        type: String,
        required: true
        
    },
    Username:{
        type: String,
        required: true
    },
    Password:{
        type: String,
        required: true
    },
    FirstName:{
        type: String,
    },
    LastName:{
        type: String,
    },
    ZipCode:{
        type: Number
    },
    SkillLevel:{
        type: String
    },
    Bio:{
        type: String
    },
    ProfilePhoto:{
        type: String
    }
});

const User = mongoose.model('User', userSchema);//looks for "users" collection in mongodb

module.exports = User;