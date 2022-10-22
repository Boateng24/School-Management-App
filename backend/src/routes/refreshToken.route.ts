import express from 'express';
import {renewAccessToken} from '../controllers/renewtoken.controller';

const refreshRouter = express.Router();

refreshRouter.get('/refresh', renewAccessToken)

export default refreshRouter