import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
  
    isAdmin: { type: Boolean, default: false },
    isBureau: { type: Boolean, default: false },
    isClub: { type: Boolean, default: false },
    role: {
      type: String,
      required: true,
    },

    Chapter: {
      type: String,
      required: true,
    },
    points: {
      type: Number,
      default: 0,
    },
    profilePicture: String,
    coverPicture: String,
    followers: [],
    following: [],
  },
  { timestamps: true }
);

const UserModel = mongoose.model("Users", UserSchema);
export default UserModel;
