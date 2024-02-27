import express from 'express';
import userController from './user.controller.js';
import { schemaValidation } from '../../../helper/validation.js';
import { user } from './user.validation.js';

const router = express.Router();

router.post('/register',schemaValidation(user),userController.insertUser);

export default router ; 