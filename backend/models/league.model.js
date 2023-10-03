import mongoose from "mongoose";

const Schema = mongoose.Schema;

const leagueSchema = new Schema({
  LeagueName: {
    type: String,
    required: true,
    unique: true,
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
  Teams: {
    type: Array,
  },
});

export default mongoose.model("League", leagueSchema);
