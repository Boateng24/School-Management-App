import express from 'express';
import {deleteUser, findUsers, forgotPassword} from '../controllers/user.controller'
import { verifyAccessToken, verifyUser } from '../middlewares/verifyToken';
const userRouter = express.Router();

userRouter.delete('/user/:id', deleteUser)
userRouter.get('/users', findUsers)
userRouter.post('/forgotPassword', forgotPassword)

export default userRouter