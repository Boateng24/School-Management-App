import express from 'express';
import {deleteUser, findUsers, forgotPassword, getUser, updateUser, fileStorage} from '../controllers/user.controller'
import { verifyAccessToken, verifyUser } from '../middlewares/verifyToken';
import multer from 'multer';
const upload = multer({ storage: fileStorage });
const userRouter = express.Router();

userRouter.get('/user/:id', getUser)
userRouter.delete('/user/:id', deleteUser)
userRouter.get('/users', findUsers)
userRouter.post('/forgotPassword', forgotPassword)
userRouter.patch('/user/:id', upload.single('profilePicture'),updateUser)


export default userRouter