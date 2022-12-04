import express from 'express';
import {createStudentScores, deleteScores,getStudentScores,updateScores} from '../controllers/scores.controller'
const scoreRouter = express.Router();

scoreRouter.post('/createScore', createStudentScores)
scoreRouter.get('/getScore/:studentId', getStudentScores)
scoreRouter.patch('/updateScore', updateScores)
scoreRouter.delete('/deleteScore', deleteScores)

export default scoreRouter