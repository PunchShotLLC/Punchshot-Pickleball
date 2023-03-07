const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tournamentSchema = new Schema({
    Tournament_Name:{
        type: String,
        required: true
    },
    Skill_Level:{
        type: String,
        required: true,
        enum:['Novice', 'Intermediate','Advanced']
    },
    Divisions_Offered:{
        type: [String],
        required: true,
        enum: ['Singles', 'Doubles', 'Novice', 'Intermediate','Advanced']
    },
    Entry_Fee:{
        type: Number,
        required: true
    },
    Prize:{
        type: Number,
        required: true
    },
    Registration_Deadline:{
        type: Date,
        required: true
    }
})

const Tournament = mongoose.model('Tournament', tournamentSchema);//looks for "users" collection in mongodb

module.exports = User;