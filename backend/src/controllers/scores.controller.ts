import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/prismaInit';
import {studentscores, userStage} from '../@types'


export const createStudentScores = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const {examScore, testScore, studentId, coreSub, electiveSub} = req.body as studentscores
        const {mainStage} = req.body as userStage
        const createScores = await prisma.scores.createMany({
          data:[
            {
                examScore,
                testScore,
                mainStage,
                studentId,
                coreSub,
                electiveSub
            }
          ]
        })
        res.status(200).json({scoreId: createScores, success: true})
    } catch (error) {
        next(error)
    }
}


export const getStudentScores = async (req:Request, res:Response, next:NextFunction) => {
    try{
        const getScore = await prisma.scores.findMany({
            where:{
                studentId: req.params.id
            },
            select: {
                id: true,
                examScore: true,
                testScore: true,
                mainStage: true,
                studentId: true,
                coreSub: true,
                electiveSub: true
            },
            orderBy:{
                mainStage: "asc"
            }
        })
        res.status(200).json({getScore, success: true})
    }catch(error){
        next(error)
    }
}


export const updateScores = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const { examScore, testScore, electiveSub, coreSub } = req.body as studentscores;
        const {mainStage} = req.body as userStage
        const scoresUpdate = await prisma.scores.update({
            where:{
                id: parseInt(req.params.id)
            },
            data:{
                  examScore,
                  testScore, 
                  mainStage,
                  coreSub,
                  electiveSub  
            }
        })
        res.status(200).json({scoresUpdate, success:true})
    } catch (error) {
        next(error)
    }
}

export const deleteScores = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const scoreDelete = await prisma.scores.delete({
            where:{
               id: parseInt(req.params.id)
            }
        })
        res.status(200).json({id: scoreDelete.studentId, success: true})
    } catch (error) {
        next(error)
    }
}


export const allstudentScores = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const allScores = await prisma.scores.findMany({
            select:{
                id: true,
                studentId: true,
                testScore: true,
                examScore: true,
                coreSub: true,
                electiveSub: true
            },
            take: 20,
            orderBy: {
                id: "asc"
            }
        })
        res.status(200).json({allScores, success: true})
    } catch (error) {
        next(error)
    }
}
