import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/prismaInit';
import {userAddress} from '../@types';

export const updateUserAddress = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const {GPS, location, phoneNumber} = req.body as userAddress
        const addressUpdate = await prisma.userAddress.update({
            where:{
                userId: req.params.id
            },
            data:{
                GPS,
                location,
                phoneNumber
            }
        })
        res.status(200).json({addressUpdate, success: true})
    } catch (error) {
        next(error)
    }
}