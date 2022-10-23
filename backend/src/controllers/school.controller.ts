import { prisma } from "../config/prismaInit";
import { NextFunction, Request, Response } from "express";
import { createSchool, updateSchool } from "../@types";
import createHttpError from "http-errors";



export const newSchool = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const {schoolName, email, password, confirmPassword} = req.body as createSchool

        const schoolExits = await prisma.school.findUnique({
            where:{
                email
            }
        })

        if (schoolExits) return res.json({message: `${schoolExits.schoolName} already exist`})

        if (!(password.match(confirmPassword))) return res.json({message:'Passwords do not match'});

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

            const {schoolName, email, dateOfestablishment, address, NumOfNonTeachingStaff, NumOfStudents, NumOfTeachers } = req.body as updateSchool
            // check for who can perform this operation
            const permittedUser = await prisma.user.findFirst({
                where:{
                    id
                }
            })

            if(!(["Admin"].includes(permittedUser.role))) return res.json({message: "Not allowed for this operation"})

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