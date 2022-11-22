import {Request, Response, NextFunction} from 'express';
import { prisma } from '../config/prismaInit';



export const findallStudents = async (req:Request, res:Response, next:NextFunction) => {
    try {
     
        const fetchstudents = await prisma.user.findMany({
            where:{
                role:{
                    equals: "student"
                }
            },
            select:{
                firstname: true,
                stage: true,
                gender: true,
                profilePic:true,
                isPrefect: true,
                age: true,
                email: true,
                guardian: true
            }
        })

        res.status(200).json({fetchstudents, success: true})
    } catch (error) {
        next(error)
    }
}
export const countallStudents = async (req:Request, res:Response, next:NextFunction) => {
    try {
     
        const countstudents = await prisma.user.count({
            where:{
                role:{
                    equals: "student"
                }
            }
        })

        res.status(200).json({countstudents, success: true})
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
                    AND:[
                        {
                            isPrefect: {
                                equals: true
                            }
                        },
                        {
                            gender:{
                                equals: "female",
                                mode: "insensitive"
                            }
                        }
                    ]
            }
        })

        const countmalePrefects = await prisma.user.count({
          where: {
            AND: [
              {
                isPrefect: {
                  equals: true,
                },
              },
              {
                gender: {
                  equals: 'male',
                  mode: 'insensitive',
                },
              },
            ],
          },
        });
        res.status(200).json({fetchPrefects, countfemalePrefects, countmalePrefects, success: true})
    } catch (error) {
        next(error)
    }
}


export const allPrimaryStudents = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const fetchPrimaryStudents = await prisma.user.count({
            where:{
                stage:{
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
                stage:{
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