import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Username: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
    minLength: 8,
  },
  Name: {
    type: String,
    required: true,
  },
  Sex: {
    type: String,
    required: true,
  },
  ZipCode: {
    type: String,
    minLength: 5,
  },
  SkillLevel: {
    type: String,
    // required: true,
    enum: ["Novice", "Intermediate", "Advanced"],
  },
  Bio: {
    type: String,
  },
  ProfilePhoto: {
    type: String,
  },
  Leagues: [
    {
      LeagueName:{
        type: String, // SchemaTypes.ObjectId when users functionality complete
        required: true
      }, 
      TeamName:{
        type: String,  // SchemaTypes.ObjectId when users functionality complete
        required: true
      }
    }
  ]
});

export default mongoose.model("User", userSchema);
