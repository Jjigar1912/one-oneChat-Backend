import express from 'express';
import userRoutes from '../modules/user/user.routes.js';
import chatRoutes from '../modules/chat/chat.routes.js';


const router = express.Router();

router.use('/user',userRoutes);
router.use('/chat',chatRoutes);

export default router ; 