import mongoose from "mongoose";

const projectSchema = mongoose.Schema(
  {
    name: String,
    description: { type: String, required: true },
    likes: [],
    createdAt: {
      type: Date,
      default: new Date(),
    },
    image: String,
    verify: Boolean,
  },

  { timestamps: true }
);
var projects = mongoose.model("Projects", projectSchema);
export default projects;
