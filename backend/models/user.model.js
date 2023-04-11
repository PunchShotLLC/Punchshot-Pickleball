const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    Email:{
        type: String,
        // required: true,
        // unique: true
    },
    Username:{
        type: String,
        required: true,
        unique: true,
        immutable: true
    },
    Password:{
        type: String,
        required: true,
        minLength: 8
    },
    FirstName:{
        type: String,
    },
    LastName:{
        type: String,
    },
    ZipCode:{
        type: String,
        // required: true,
        minLength: 5
    },
    SkillLevel:{
        type: String,
        // required: true,
        enum: ['Novice', 'Intermediate', 'Advanced']
    },
    Bio:{
        type: String
    },
    ProfilePhoto:{
        type: String
    },
    Friends: [{
        Id: {
            type: Number
        },
        FirstName: {
            type: String
        },
        LastName: {
            type: String
        },
        ProfilePhoto: {
            type: String
        }
    }]
});

const User = mongoose.model('User', userSchema);//looks for "users" collection in mongodb

module.exports = User;