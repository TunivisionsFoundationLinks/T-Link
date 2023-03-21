import express from 'express';
import {CreateChapter, DeleteChapter, getAllChapters,getChapter, UpdateChapter} from "../controllers/ChapterController.js"
import authMiddleWare from '../middleware/AuthMiddleware.js';
const router = express.Router();


router.post('/', authMiddleWare,CreateChapter);
router.get('/', authMiddleWare,getAllChapters);
router.get('/:id', authMiddleWare,getChapter);
router.patch('/:id', authMiddleWare,UpdateChapter);
router.delete('/:id', authMiddleWare,DeleteChapter);


export default router;