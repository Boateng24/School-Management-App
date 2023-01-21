import express from 'express';
import {deleteUser, findUsers, forgotPassword, getUser, updateUser, fileStorage} from '../controllers/user.controller'
import { verifyAccessToken } from '../middlewares/verifyToken';
import { verifyUser, verifyAdmin } from '../middlewares/permission';
import multer from 'multer';
const upload = multer({ storage: fileStorage });
const userRouter = express.Router();

userRouter.get('/user/:id', getUser)
userRouter.delete('/user/:id', verifyAdmin, deleteUser)
userRouter.get('/users', findUsers)
userRouter.post('/forgotPassword', forgotPassword)
userRouter.patch('/user/:id', verifyUser, upload.single('profilePicture'),updateUser)


export default userRouter