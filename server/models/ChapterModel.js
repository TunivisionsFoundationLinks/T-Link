import mongoose from "mongoose";

const ChapterSchema = new mongoose.Schema(
  {
    ChapterName: {
      type: String,
      required: true,
    },
    emailChapters: {
      //this mail will be used by 3 role accounts administrators only
      type: String,
      required: true,
    },
    password: {
      // this password will be created by 3 roles administrators only (coordinator / head management / Web Master)
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ChapterModel = mongoose.model("Chapter", ChapterSchema);
export default ChapterModel;
