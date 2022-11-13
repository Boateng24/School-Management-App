import express from 'express';
import {  userSignup, userLogin} from '../controllers/auth.controller';
import { passwordValidator, validatorSchema } from '../middlewares/validators';
import { verifyAdmin } from '../middlewares/verifyToken';

const authRouter = express.Router();

authRouter.post('/usersignup', validatorSchema, passwordValidator,  userSignup) //will add the verifyAdmin middleware later
authRouter.post('/userlogin', userLogin)


export default authRouter;