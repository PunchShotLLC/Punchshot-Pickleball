const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const leagueSchema = new Schema({
    LeagueName:{
        type: String,
        required: true,
        unique: true
    },
    NumCompetitors:{
        type: Number,
        required: true
    },
    SkillLevel:{
        type: String,
        required: true,
        enum: ['Novice', 'Intermediate', 'Advanced']
    },
    ZipCode:{
        type: String,
        required: true,
        minLength: 5,
        maxLength: 5,
    },
    City:{
        type: String,
        required: true,
    },
    Prize:{
        type: String
    },
    Email:{
        type: String,
        required: true,
        unique: true
    }

});

const User = mongoose.model('League', leagueSchema);

module.exports = User;