import {Request, Response, NextFunction} from 'express';
import { createUser,userupdate, uploadedFile} from '../@types';
import { prisma } from '../config/prismaInit';
import { createAccessToken } from '../helpers/accessToken';
import {config} from 'dotenv';
import { deleteUserService, updateUserService } from '../services/user.services';
import { resetUserPassEmailService } from '../services/email.services';


config()

export const getUser = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const findUser = await prisma.user.findFirst({
            where:{
                id: req.params.id
            },
            select:{
                fullname: true,
                email: true,
                stage: true,
                address: true,
                gender: true,
                profilePic: true,
                guardian: true,
                score: true,
                role: true
            }
        })
        res.status(200).json({findUser, success: true})
    } catch (error) {
        next(error)
    }
}


// Get all users
export const findUsers = async (req:Request, res:Response, next:NextFunction) => {
    try {

        const getUsers = await prisma.user.findMany({
          select:{
            id: true,
            fullname:true,
            email:true,
            role: true
          }
        })
        res.json({getUsers, success: true})

    } catch (error) {
        next(error)
    }
}


export const updateUser = async (req:Request, res:Response, next:NextFunction) => {
    try {
         const file = req.file as uploadedFile;
         const profilePic = file.path
         const id  = req.params.id
         console.log(file);
        const{fullname, email, age, gender} = req.body as userupdate;
        const userUpdate = await updateUserService({id, fullname, email, age, gender, profilePic})

        res.status(200).json({userUpdate, success:true})

    } catch (error) {
        next(error)
    }
}

// Delete a user
export const deleteUser = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const id = req.params.id
        const findUser = await prisma.user.findFirst({
            where:{
                id
            }
        })
        if(!findUser) return res.json({msg: 'user not found'})

        const userDelete = await deleteUserService(id)
        
       res.json({msg:`${userDelete.fullname} deleted from your school`})
    } catch (error) {
        next(error)
    }
}


// Forgot password

export const forgotPassword = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const {email} = req.body as createUser
        const currentUser = await prisma.user.findUnique({
            where:{
                email
            }
        })
        console.log(currentUser.id)

        const token = await createAccessToken(currentUser.id)

        await resetUserPassEmailService(email, currentUser, token)

     await prisma.user.update({
            where:{
                id: currentUser.id
            },
            data:{
                password: req.body.password as string
            }
         })
         res.json({success:true})
    } catch (error) {
        next(error.message)
    }
}