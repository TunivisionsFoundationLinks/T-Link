import express from 'express';
import {CreateChapter} from "../controllers/ChapterController.js"
import authMiddleWare from '../middleware/AuthMiddleware.js';
const router = express.Router();


router.post('/', authMiddleWare,CreateChapter);


export default router;