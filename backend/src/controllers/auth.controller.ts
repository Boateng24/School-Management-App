import {Request, Response, NextFunction} from 'express';
import createHttpError from 'http-errors';
import { createUser, loginUser, userAddress, userGuardian, userStage, studentscores } from '../@types';
import { prisma } from '../config/prismaInit';
import { createAccessToken } from '../helpers/accessToken';
import { hashedPassword, compare } from '../helpers/bcryptConfig';
import { createRefreshToken } from '../helpers/refreshToken';
import {config} from 'dotenv';
import {newUserEmailService} from '../services/email.services'
import { registerErrorsService } from '../services/user.services';

config()

const maxAge = 7 * 24 * 60 * 60 * 1000
export const userSignup = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const {fullname, email, password, confirmPassword,age, gender,role} = req.body as createUser
        const {father, mother, other} = req.body as userGuardian
        const {classType, mainStage} = req.body as userStage
        const {GPS, location, phoneNumber} = req.body as userAddress
        const {examScore, testScore, electiveSub, coreSub} = req.body as studentscores
       
        const registrationErrors = await registerErrorsService(email, password, confirmPassword)

        if(registrationErrors){
          return res.status(registrationErrors.status).json({message: registrationErrors.message})
        }

        const newUser = await prisma.user.create({
            data:{
                fullname,
                email,
                password: await hashedPassword(password),
                role,
                age,
                gender,
                stage:{
                    create:{
                        classType,
                        teacher: req.body?.teacher,
                        mainStage
                    }
                },
                guardian: {
                  create: {
                    mother,
                    father,
                    other
                  }
                },
               address:{
                create:{
                  location,
                  GPS,
                  phoneNumber
                }
               },
               score:{
                create:{
                  examScore,
                  testScore,
                  coreSub,
                  electiveSub
                }
               }
            }
        })

        
        const token = await createAccessToken(newUser.id);

        await newUserEmailService(email, newUser, password, token)

        const createdUser = newUser.id
       res.json({createdUser, success: true})
    } catch (error) {
        next(error)
    }
}


export const userLogin = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const {email, password} = req.body as loginUser
        const foundUser = await prisma.user.findUnique({
            where:{
                email
            }
        })
        if(!foundUser) res.json({message:"User not registered"})

        const matchPassword = await compare(password, foundUser?.password)
        if(!matchPassword) throw new createHttpError.NotAcceptable("Invalid credentials")

        // create both acess and refresh token for current user
        const accessToken = await createAccessToken(foundUser.id)
        const refreshToken = await createRefreshToken(foundUser.id)

        res.cookie('jwt-access', refreshToken, {httpOnly: true, sameSite: 'none', secure: true, maxAge})
        const loggedInUser = {id: foundUser.id, firstname: foundUser.fullname, email:foundUser.email, role: foundUser.role, accessToken}
        res.status(200).json({loggedInUser, success: true})
    } catch (error) {
        next(error)
    }
}