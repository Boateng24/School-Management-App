import express from 'express';
import {allstudentScores, createStudentScores, deleteScores,getStudentScores,updateScores} from '../controllers/scores.controller'
const scoreRouter = express.Router();

scoreRouter.post('/createScore', createStudentScores)
scoreRouter.get('/getScore/:studentId', getStudentScores)
scoreRouter.patch('/updateScore/:id', updateScores)
scoreRouter.delete('/deleteScore', deleteScores)
scoreRouter.get('/allScores', allstudentScores)

export default scoreRouter