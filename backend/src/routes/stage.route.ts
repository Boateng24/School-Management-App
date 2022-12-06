import express from 'express';
import {
 updateUserStage
} from '../controllers/stage.controller';
const stageRouter = express.Router();


stageRouter.patch('/updateStage/:id', updateUserStage)

export default stageRouter