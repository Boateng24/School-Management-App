import {Request, Response, NextFunction} from 'express';
import { prisma } from '../config/prismaInit';
import createError from 'http-errors'
import { createUser } from '../@types';


export const registeruserService = async (email:string, password:string, confirmPassword:string) => {
    try {
        // check if user already exists
      const userExists =   await prisma.user.findFirst({
            where:{
                email: email
            }
        })
        if(userExists) throw new createError.Conflict("User already exists")
        
        if (password !== confirmPassword) { // check if password matches
            throw new createError.ExpectationFailed('Passwords do not match');
          }
    } catch (error) {
        createError(error.message)
    }
}