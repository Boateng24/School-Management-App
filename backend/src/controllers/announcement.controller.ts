import {Request, Response, NextFunction} from 'express';
import { Announcement } from '../@types';
import { prisma } from '../config/prismaInit';



export const createAnnouncement = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const {message, adminId, schoolId} = req.body as Announcement
        const postAnnouncement = await prisma.announcement.create({
            data:{
                message,
                adminId,
                schoolId,
            }
        })
        res.status(200).json({announceId: postAnnouncement.id, success: true})
    } catch (error) {
        next(error)
    }
}


export const findAnnouncement = async (_req:Request, res:Response, next:NextFunction) => {
    try {
        const getAnnouncement = await prisma.announcement.findMany({
            select:{
                id: true,
                message: true
            },
            orderBy: {
                id: "desc"
            },
            take: 20
        })
        res.status(200).json({getAnnouncement, success: true})
    } catch (error) {
        next(error)
    }
}


export const deleteAnnouncement = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const announceId = parseInt(req.params.id)
        const announcementDelete = await prisma.announcement.delete({
            where:{
                id: announceId
            }
        })
        res.status(200).json({id: announcementDelete.id, message: "successfully deleted"})
    } catch (error) {
        next(error)
    }
}