import {Request, Response, NextFunction} from 'express';
import { prisma } from '../config/prismaInit';


export const allStudents = async (req:Request, res:Response, next:NextFunction) => {
    try {
     
        const fetchstudents = await prisma.user.count({
            where:{
                role:{
                    equals: "student"
                }
            }
        })

        res.status(200).json({fetchstudents, success: true})
    } catch (error) {
        next(error)
    }
}


export const allPrefects = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const fetchPrefects = await prisma.user.count({
            where:{
                isPrefect:{
                    equals: true
                }
            }
        })

        const countfemalePrefects = await prisma.user.count({
            where:{
                    gender: {
                        equals: "female",
                        mode: "insensitive"
                    }
            }
        })

        const countmalePrefects = await prisma.user.count({
            where:{
                    gender: {
                        equals: "male",
                        mode: "insensitive"
                    }
            }
        })
        res.status(200).json({fetchPrefects, countfemalePrefects, countmalePrefects, success: true})
    } catch (error) {
        next(error)
    }
}


export const allPrimaryStudents = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const fetchPrimaryStudents = await prisma.user.count({
            where:{
                class:{
                    some:{
                        classType:{
                            equals: "Primary"
                        }
                    }
                }
            }
        })
        res.status(200).json({fetchPrimaryStudents, success:true})
    } catch (error) {
        next(error)
    }
}
export const allJuniorHighStudents = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const fetchJuniorHigh = await prisma.user.count({
            where:{
                class:{
                    some:{
                        classType:{
                            equals: "JuniorHigh"
                        }
                    }
                }
            }
        })
        res.status(200).json({fetchJuniorHigh, success:true})
    } catch (error) {
        next(error)
    }
}