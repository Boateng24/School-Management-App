import {Request, Response, NextFunction} from 'express';
import { Announcement } from '../@types';
import { prisma } from '../config/prismaInit';



export const createAnnouncement = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const {message, schoolId} = req.body as Announcement
        const postAnnouncement = await prisma.announcement.create({
            data:{
                message,
                schoolId
            }
        })
        res.status(200).json({announceId: postAnnouncement.id, success: true})
    } catch (error) {
        next(error)
    }
}


export const findAnnouncementById = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const Idnumber = parseInt(req.params.id)
        const singleAnnouncement = await prisma.announcement.findFirst({
            where: {
                id: Idnumber
            }
        })
        res.status(200).json({singleAnnouncement, success:true})
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


export const editAnnouncement = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const {message} = req.body
        const Idnumber = parseInt(req.params.id)
        const announcementEdit = await prisma.announcement.update({
            where:{
                id: Idnumber
            },
            data:{
                message:message,
                isEdited:true

            }
        })
        if(!announcementEdit){
            res.status(400).json({message:"Not successful"})
        }
        res.status(200).json({announcementEdit, success:true, editMessage:'edited'})
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