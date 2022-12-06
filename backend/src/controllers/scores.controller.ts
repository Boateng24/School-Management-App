import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/prismaInit';
import {studentscores} from '../@types'


export const createStudentScores = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const {examScore, testScore} = req.body as studentscores
        const createScores = await prisma.scores.create({
          data:{
            examScore,
            testScore,
            studentId: req.params.id
          }
        })
        res.status(200).json({scoreId: createScores.studentId, success: true})
    } catch (error) {
        next(error)
    }
}


export const getStudentScores = async (req:Request, res:Response, next:NextFunction) => {
    try{
        const getScore = await prisma.scores.findFirst({
            where:{
                studentId: req.params.id
            },
            select: {
                examScore: true,
                testScore: true
            }
        })
        res.status(200).json({getScore, success: true})
    }catch(error){
        next(error)
    }
}


export const updateScores = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const { examScore, testScore } = req.body as studentscores;
        const scoresUpdate = await prisma.scores.update({
            where: {
                studentId: req.params.id
            },
            data:{
              examScore,
              testScore
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
                studentId: req.params.id
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
                studentId: true,
                testScore: true,
                examScore: true
            }
        })
        res.status(200).json({allScores, success: true})
    } catch (error) {
        next(error)
    }
}
