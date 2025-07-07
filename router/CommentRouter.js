import express from 'express';
import { saveComment,getComments } from '../controller/CommentController.js'; 
import  {verifyToken}  from '../middleware/auth.js';
const rotuer = express.Router();

rotuer.post ('/comment', verifyToken, saveComment);
rotuer.get ('/comment/:id', verifyToken, getComments);
export const RouterComment = rotuer;