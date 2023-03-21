import ChapterModel from "../models/ChapterModel.js";
import bcrypt from "bcrypt";

export const CreateChapter = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPass;
    const newChapter = new ChapterModel(req.body);
    // addition new
    const oldChapter = await ChapterModel.findOne({
      ChapterName: newChapter.ChapterName,
    });
    if (oldChapter)
      return res.status(400).json({ message: "Chapter already exists" });

    // changed
    const Chapter = await newChapter.save();
    res.status(200).json({ Chapter });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllChapters = async (req, res) => {
  try {
    let Chapters = await ChapterModel.find();
    Chapters = Chapters.map((chapter) => {
      const { password, ...otherDetails } = chapter._doc;
      return otherDetails;
    });
    res.status(200).json(Chapters);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getChapter = async (req, res) => {
  try {
    const id = req.params.id;
    const Chapter = await ChapterModel.findById(id);
    if (Chapter) {
      const { password, ...otherDetails } = Chapter._doc;

      res.status(200).json({ otherDetails });
    } else {
      res.status(404).json("No such Chapter");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const UpdateChapter = async (req, res) => {
  try {
    const id = req.params.id;
    const Chapter = await ChapterModel.findByIdAndUpdate(id, req.body);
    Chapter.save();
    res.status(200).json({ Chapter });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const DeleteChapter = async (req, res) => {
  try {
    const id = req.params.id;
    const Chapter = await ChapterModel.findById({ _id: id });
    await Chapter.deleteOne();
    res.status(200).json({ msg: "chapter deleted success" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
