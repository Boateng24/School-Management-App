import express from 'express';
import {  userSignup, userLogin} from '../controllers/auth.controller';
import { passwordValidator, validatorSchema } from '../middlewares/validators';

const authRouter = express.Router();

authRouter.post('/usersignup', validatorSchema, passwordValidator,  userSignup) 
authRouter.post('/userlogin', userLogin)


export default authRouter;