import mongoose from "mongoose";

const ClubSchema = mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  mail: { type: String, required: true },
  Location: { type: String, required: true },
  membres: [],
  Bureau:[],
});

var ClubModel = mongoose.model("Club", ClubSchema);
export default ClubModel;
