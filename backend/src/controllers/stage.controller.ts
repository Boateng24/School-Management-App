import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/prismaInit';
import {userStage} from '../@types';



export const updateUserStage = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const {classType, mainStage, teacher} = req.body as userStage
        const updatestage = await prisma.stage.update({
            where:{
                studentId: req.params.id
            },
            data:{
                classType,
                mainStage,
                teacher
            }
        })
        res.status(200).json({updatestage, success:true})
    } catch (error) {
        next(error)
    }
}