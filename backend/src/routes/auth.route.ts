import express from 'express';
import { signUp, login} from '../controllers/auth.controller';
import { passwordValidator, validatorSchema } from '../middlewares/validators';

const authRouter = express.Router();

authRouter.post('/signup', validatorSchema, passwordValidator, signUp)
authRouter.post('/login', login)


export default authRouter;