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
  ZipCode: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 5,
  },
  City: {
    type: String,
    required: true,
  },
  Teams: [
    {
      TeamName: {
        type: String,
        required: true,
      },
      TeamCaptain: {
        type: String, // SchemaTypes.ObjectId when users functionality complete
        required: true,
      },
      TeamMembers: [
        String, // SchemaTypes.ObjectId when users functionality complete
      ],
      PotentialTeamMembers: [
        String, // SchemaTypes.ObjectId when users functionality complete
      ],
      TeamFee: Number,
    },
  ],
  StartDate: {
    type: Date,
    required: true,
  },
  EndDate: {
    type: Date,
    required: true,
  },
});

export default mongoose.model("League", leagueSchema);
