import {Request, Response, NextFunction} from 'express';
import createHttpError from 'http-errors';
import { createUser, loginUser, userAddress, userGuardian, userStage, studentscores } from '../@types';
import { prisma } from '../config/prismaInit';
import { createAccessToken } from '../helpers/accessToken';
// import {registeruserService} from '../services/user.services'; will improve it later
import { hashedPassword, compare } from '../helpers/bcryptConfig';
import { createRefreshToken } from '../helpers/refreshToken';
import {config} from 'dotenv'
import * as nodemailer from 'nodemailer';

config()

const maxAge = 7 * 24 * 60 * 60 * 1000
export const userSignup = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const {fullname, email, password, confirmPassword,age, gender,role} = req.body as createUser
        const {father, mother, other} = req.body as userGuardian
        const {classType, mainStage} = req.body as userStage
        const {GPS, location, phoneNumber} = req.body as userAddress
        const {examScore, testScore, electiveSub, coreSub} = req.body as studentscores
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

        const transporter = nodemailer.createTransport({
          host: process.env.NODEMAILER_HOST,
          port: (<unknown>process.env.NODEMAILER_PORT) as number,
          auth: {
            user: process.env.SENDER_EMAIL,
            pass: process.env.GOOGLE_APP_PASSWORD,
          },
        });

        transporter.verify(function (error, success) {
          if (error) {
            console.log(error);
          } else {
            console.log('Server is ready to take our messages');
          }
        });

        const mailDetails = {
          from: process.env.SENDER_EMAIL,
          to: email,
          subject: 'Confirmation of sign up',
          html: `<a href="http://localhost:3000/usersLogin/" + ${newUser.id} + '/' + ${token}>Your account has been created click this link to update your details</a>
                <p>This is your password <b>${password}</b> </p>
          `,
        };

        transporter.sendMail(mailDetails, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log('email sent successfully');
          }
        });


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