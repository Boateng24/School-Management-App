import express from 'express';
import {deleteUser, findUsers, forgotPassword, getUser, updateUser} from '../controllers/user.controller'
import { verifyAccessToken, verifyUser } from '../middlewares/verifyToken';
const userRouter = express.Router();

userRouter.get('/user/:id', getUser)
userRouter.delete('/user/:id', deleteUser)
userRouter.get('/users', findUsers)
userRouter.post('/forgotPassword', forgotPassword)
userRouter.patch('/user/:id', updateUser)


export default userRouter