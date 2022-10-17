import express from 'express';
import { signUp } from '../controllers/auth.controller';
import { passwordValidator, validatorSchema } from '../middlewares/validators';

const authRouter = express.Router();

authRouter.post('/signup', validatorSchema, passwordValidator, signUp)


export default authRouter;