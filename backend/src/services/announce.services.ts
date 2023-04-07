import { prisma } from "../config/prismaInit";


export const createAnnouncemService = async(message:string, schoolId:string) => {
    try {
        const announce = await prisma.announcement.create({
            data:{
                message,
                schoolId
            }
        })
        return announce
    } catch (error) {
       return error.message
    }
}

export const getAnnouncementByIdService = async(id:number) => {
    try {
        const fetchSingleAnnouncement = await prisma.announcement.findFirst({
            where:{
                id
            }
        })
        return fetchSingleAnnouncement
    } catch (error) {
       return error.message 
    }
}

export const fetchallAnnouncementService = async () => {
    try {
          const fetchAnnouncements = await prisma.announcement.findMany({
            select: {
              id: true,
              message: true,
            },
            orderBy: {
              id: 'desc',
            },
            take: 20,
          });
          return fetchAnnouncements
    } catch (error) {
        return error.message
    }
}

export const editAnnouncementService = async(Idnumber:number, message:string) => {
    try {
        const annoucementUpdate = await prisma.announcement.update({
          where: {
            id: Idnumber
          },
          data: {
            message: message,
            isEdited: true,
          },
        });
        return annoucementUpdate
    } catch (error) {
        return error.message
    }
}

export const deleteAnnouncementService = async(announceId:number) => {
    try {
        const announcementDel = await prisma.announcement.delete({
          where: {
            id: announceId,
          },
        });
        return announcementDel
    } catch (error) {
        return error.message
    }
}