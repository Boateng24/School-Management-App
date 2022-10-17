import express from 'express';
import {deleteUser, findUsers} from '../controllers/user.controller'
const userRouter = express.Router();

userRouter.delete('/user/:id', deleteUser)
userRouter.get('/users', findUsers)

export default userRouter