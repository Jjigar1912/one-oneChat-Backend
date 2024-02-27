import express from 'express' ; 
import chatController from './chat.controller.js';
import { chat, chatConversation } from './chat.validation.js';
import { schemaValidation } from '../../../helper/validation.js';
import sendMessage from './chat.middleware.js';

const router = express.Router() ; 

router.post('/chatConversation',schemaValidation(chatConversation),chatController.insertChatConversation);
router.post('/add',sendMessage,schemaValidation(chat),chatController.insertChat);

export default router ; 