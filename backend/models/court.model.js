// backend/models/court.model.js

import mongoose from "mongoose";

const courtSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  zip: { type: String, required: true }
});

const Court = mongoose.model("Court", courtSchema);

export default Court;