import express from 'express';
import {createGuardian, updateGuardian} from '../controllers/guardian.controller'
const guardianRouter = express.Router();


guardianRouter.post('/studentGuardian', createGuardian)
guardianRouter.patch('/guardianUpdate/:id', updateGuardian)

export default guardianRouter