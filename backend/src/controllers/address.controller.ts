import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/prismaInit';
import {userAddress} from '../@types';


// this code has an unknown issue when testing
export const getUserAddress = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const getAddress = await prisma.userAddress.findFirst({
            where: {
                userId: req.params.id
            }
        })
        if(!getAddress){
            return res.status(404).json({message: "User Address not found"})
        }
        res.status(200).json({getAddress, message: "User address successfully found"})
    } catch (error) {
        next(error);
    }
}



// this code has an unknown issue when testing
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


export const deleteUserAddress = async (req:Request, res:Response, next:NextFunction) => {
    try {
           await prisma.userAddress.delete({
            where:{
                userId: req.params.id
            }
        })
        res.status(200).json({message: "User Address successfully deleted"})
    } catch (error) {
        next(error)
    }
}