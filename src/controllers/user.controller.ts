import {Request, Response, NextFunction} from 'express';
import createHttpError from 'http-errors';
import { prisma } from '../config/prismaInit';


export const findUsers = async (req:Request, res:Response, next:NextFunction) => {
    try {

        const getUsers = await prisma.user.findMany({
          select:{
            id: true,
            firstname:true,
            email:true,
            role: true
          }
        })
        res.json({getUsers, success: true})

    } catch (error) {
        next(error)
    }
}

export const deleteUser = async (req:Request, res:Response, next:NextFunction) => {
    try {

        const userDelete = await prisma.user.delete({
            where:{
                id: req.params.id
            }
        })
       res.json({success: true})
    } catch (error) {
        next(error)
    }
}