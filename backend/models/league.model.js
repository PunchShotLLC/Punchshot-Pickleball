import mongoose, { SchemaType, SchemaTypes } from "mongoose";

const Schema = mongoose.Schema;

const leagueSchema = new Schema({
  LeagueName: {
    type: String,
    required: true,
  },
  LeagueOwner: {
    type: String,
    required: true,
  },
  NumTeams: {
    type: Number,
    required: true,
  },
  ZipCode: [{
    type: String,
    required: true,
    minLength: 5,
    maxLength: 5,
  }],
  City: {
    type: String,
    required: true,
  },
  Teams: [{
    Name: {
      type: String,
      required: true,
    },
    TeamCaptain: {
      type: SchemaTypes.ObjectId,
      required: true,
    },
    TeamMembers: [
      SchemaTypes.ObjectId,
    ],
    TeamFee: Number
  }],
  StartDate: Date,
  EndDate: Date,
});

export default mongoose.model("League", leagueSchema);
