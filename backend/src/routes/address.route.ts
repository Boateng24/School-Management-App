import express from 'express';
import {deleteUserAddress, getUserAddress, updateUserAddress} from '../controllers/address.controller';
const addressRouter = express.Router();


addressRouter.get('/getUserAddress/:id', getUserAddress);
addressRouter.patch('/userAddress/:id', updateUserAddress)
addressRouter.delete('/deleteUserAddress/:id', deleteUserAddress);


export default addressRouter;