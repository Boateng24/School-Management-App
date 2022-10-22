import { prisma } from "../config/prismaInit";
import { NextFunction, Request, Response } from "express";
import { createSchool } from "../@types";
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