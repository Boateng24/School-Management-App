import { prisma } from "../config/prismaInit";
import { NextFunction, Request, Response } from "express";
import { createSchool, updateSchool } from "../@types";
import createHttpError from "http-errors";



export const newSchool = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const {schoolName, email, password, confirmPassword} = req.body as createSchool

        const schoolExists = await prisma.school.findFirst({
            where:{
                email
            }
        })
        if(schoolExists) res.json(`${schoolExists.schoolName} already exists`)

        // check if password matches
        if (password !== confirmPassword) return res.json({message:'Passwords do not match'});

        const createnewSchool = await prisma.school.create({
            data:{
                schoolName,
                email, 
                password
            }
        })
        res.json({createnewSchool, success:true})
    } catch (error) {
        next(error)
    }
}


export const getSchool = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const id = req.params.id

        const findSchool = await prisma.school.findFirst({
            where:{
                id
            },
            select:{
                id: true,
                schoolName: true,
                email: true,
                address: true,
                dateOfestablishment: true,
                NumOfStudents: true,
                NumOfTeachers: true,
                NumOfNonTeachingStaff: true
            }
        })

        res.status(200).json({findSchool, success: true})

    } catch (error) {
        next(error)
    }
}


export const updateSchoolDetails = async (req:Request, res:Response, next: NextFunction) => {
    try {
            const id = req["payload"].id

            const {schoolName, email, dateOfestablishment, NumOfNonTeachingStaff, NumOfStudents, NumOfTeachers } = req.body as updateSchool
            // check for who can perform this operation
            const permittedUser = await prisma.user.findFirst({
                where:{
                    id
                }
            })

            if(!(["Admin"].includes(permittedUser.role))) return res.status(401).json({message: "Not allowed for this operation"})

            // update school

            const updateSchool = await prisma.school.update({
                where:{
                    id: req.params.id
                },
                data:{
                    schoolName,
                    email,
                    address:{
                        create:{
                           GPS: req.body.GPS,
                           POBox: req.body.POBox,
                            location: req.body.location,

                        }
                    },
                    dateOfestablishment,
                    NumOfStudents,
                    NumOfTeachers,
                    NumOfNonTeachingStaff,
                }
            })

            res.json({updateSchool, success:true})
    } catch (error) {
         next(error)
    }
}



export const deleteSchool = async (req:Request, res:Response,next:NextFunction) => {
    try {
        // check if school exists in db
        const schoolExists = await prisma.school.findFirst({
            where:{
                id: req.body.id
            }
        })
        if(!schoolExists) res.status(404).json({message: "school not found", sucess: false})

        const permittedRole = await prisma.user.findFirst({
            where:{
                id: req["payload"].id
            }
        })

        if(!(["Admin"].includes(permittedRole.role))) res.status(401).json({message: "unauthorized for this operation", success: false})

         await prisma.school.delete({
            where:{
                id: req.body.schoolId
            }
        })

        res.status(200).json({message: `${schoolExists.schoolName} is deleted successfully`, success: true})
    } catch (error) {
        next(error)
    }
}


export const findAllSchools = async (req:Request, res:Response, next:NextFunction) => {
    try {
        
        const permittedRole = await prisma.user.findFirst({
            where:{
                id: req["payload"].id
            }
        })

        if(!(["Admin"].includes(permittedRole.role))) res.status(401).json({message: "unauthorized for this operation", success: false})

        const allSchools = await prisma.school.findMany({
          select:{
            id: true,
            schoolName: true,
            email: true,
            address: true
          }  
        })

        res.status(200).json({allSchools, success: true})
    } catch (error) {
        next(error)
    }
}