import {Request, Response, NextFunction} from 'express';
import createHttpError from 'http-errors';
import { createUser, loginUser } from '../@types';
import { prisma } from '../config/prismaInit';
import { createAccessToken } from '../helpers/accessToken';
// import {registeruserService} from '../services/user.services'; will improve it later
import { hashedPassword, compare } from '../helpers/bcryptConfig';
import { createRefreshToken } from '../helpers/refreshToken';
import {config} from 'dotenv'

config()

const maxAge = 7 * 24 * 60 * 60 * 1000
export const signUp = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const {firstname, email, password, confirmPassword} = req.body as createUser
        const userExists =   await prisma.user.findFirst({
            where:{
                email
            }
        })
        if(userExists) res.status(403).json({message:"User already exists"})

        // check if password matches
        if (!(password.match(confirmPassword))) return res.json({message:'Passwords do not match'});


        const newUser = await prisma.user.create({
            data:{
                firstname,
                email,
                password: await hashedPassword(password),
                role: req.body?.role,
                age: req.body?.age
            }
        })
        const createdUser = newUser.id
       res.json({createdUser, success: true})
    } catch (error) {
        next(error)
    }
}


export const login = async (req:Request, res:Response, next:NextFunction) => {
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
        const loggedInUser = {id: foundUser.id, firstname: foundUser.firstname, email:foundUser.email, accessToken}
        res.status(200).json({loggedInUser, success: true})
    } catch (error) {
        next(error)
    }
}