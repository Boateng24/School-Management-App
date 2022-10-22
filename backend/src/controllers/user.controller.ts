import {Request, Response, NextFunction} from 'express';
import createHttpError from 'http-errors';
import { createUser } from '../@types';
import { prisma } from '../config/prismaInit';
import { createAccessToken } from '../helpers/accessToken';
import {config} from 'dotenv';
import * as nodemailer from 'nodemailer';


config()

export const getUser = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const findUser = await prisma.user.findFirst({
            where:{
                id: req.params.id
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
            firstname:true,
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
        const{firstname, email, age} = req.body as createUser
        const userExits = await prisma.user.findFirst({
            where:{
                id: req.params.id
            }
        })
        if(!userExits) throw new createHttpError.NotFound("User not found");

        const userUpdate = await prisma.user.update({
           where:{
            id: req.params.id
           },
           data:{
            firstname,
            email,
            age
           }
        })

        res.status(200).json({userUpdate, success:true})

    } catch (error) {
        next(error)
    }
}

// Delete a user
export const deleteUser = async (req:Request, res:Response, next:NextFunction) => {
    try {

        const userDelete = await prisma.user.delete({
            where:{
                id: req.params.id
            }
        })
       res.json({success: true})
    } catch (error) {
        next(error)
    }
}


// Forgot password

export const forgotPassword = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const {email, password} = req.body as createUser
        const userId = req["payload"].id
        console.log(userId)
        const currentUser = await prisma.user.findFirst({
            where:{
                id: userId
            }
        })
        console.log(currentUser.id)
        if(!currentUser) throw new createHttpError.NotFound("user not found")

        const token = await createAccessToken(currentUser.id)

        const transporter = nodemailer.createTransport({
            host:'smtp.gmail.com',
            port: 587,      
            auth:{
             user: "tuffourboateng2@gmail.com", 
             pass: "fiqwmlszdtfywrjw"
            }
         })

         transporter.verify(function (error, success) {
            if (error) {
              console.log(error);
            } else {
              console.log("Server is ready to take our messages");
            }
          });
 
         const mailDetails ={
             from: "tuffourboateng2@gmail.com",
             to: email,
             subject: "Password reset link",
             html:   `<a href="/forgotPassword/" + ${currentUser.id} + '/' + ${token}>click this link to confirm password reset</a>`
         }
        
 
       transporter.sendMail(mailDetails, (err) => {
             if(err){
                 console.log(err)
             } else{
                 console.log("email sent successfully")
             }
         })

         await prisma.user.update({
            where:{
                id: currentUser.id
            },
            data:{
                password
            }
         })
         res.json({success:true})
    } catch (error) {
        next(error.message)
    }
}