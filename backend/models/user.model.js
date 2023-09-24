import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
    minLength: 8,
  },
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
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
  Friends: [
    {
      Email: {
        type: String,
      },
      FirstName: {
        type: String,
      },
      LastName: {
        type: String,
      },
      ProfilePhoto: {
        type: String,
      },
    },
  ],
});

export default mongoose.model("User", userSchema);
