import express from 'express';
import { signUp, login} from '../controllers/auth.controller';
import { passwordValidator, validatorSchema } from '../middlewares/validators';
import { verifyAdmin } from '../middlewares/verifyToken';

const authRouter = express.Router();

authRouter.post('/signup', validatorSchema, passwordValidator, verifyAdmin, signUp)
authRouter.post('/login', login)


export default authRouter;