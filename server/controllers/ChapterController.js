import ChapterModel from "../models/ChapterModel.js";
import UserModel from "../models/userModel.js"

export const CreateChapter =async (req,res) => {
    try {
        const data = req.body;
        const Chapter = ChapterModel.find(req.body.ChapterName);
        if (!Chapter) {
          return res.status(400).json({msg : "this Chapter already exit "})
        }else {
          const newChapter  = await ChapterModel.create(data);
          return res.status(200).send({msg : "Chapter Created successfully"});
        }
   
    
    } catch (error) {
        return res.status(401).json({msg :"Failed to create chapter because : " + error.message});
    }
}