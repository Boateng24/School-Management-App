import express from 'express';
import {updateUserAddress} from '../controllers/address.controller';
const addressRouter = express.Router();


addressRouter.patch('/userAddress/:id', updateUserAddress)

export default addressRouter;