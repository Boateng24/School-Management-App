import { prisma } from '../config/prismaInit';
import { NextFunction, Request, Response } from 'express';
import { createSchool, schoolAddress, updateSchool} from '../@types';
import { compare, hashedPassword } from '../helpers/bcryptConfig';
import { createAccessToken } from '../helpers/accessToken';
import { createRefreshToken } from '../helpers/refreshToken';
import { refreshTokens, removeRefreshToken } from './renewtoken.controller';
import * as nodemailer from 'nodemailer';

const maxAge = 7 * 24 * 60 * 60 * 1000;
export const newSchool = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { schoolName, email, password, confirmPassword } =
      req.body as createSchool; // take details from the body

    const schoolExists = await prisma.school.findFirst({
      where: {
        email,
      },
    });
    if (schoolExists) res.json(`${schoolExists.schoolName} already exists`);

    // check if password matches
    if (!password.match(confirmPassword))
      return res.json({ message: 'Passwords do not match' });

    const createnewSchool = await prisma.school.create({
      data: {
        schoolName,
        email,
        password: await hashedPassword(password),
      },
    });
    res.json({ createnewSchool, success: true });
  } catch (error) {
    next(error);
  }
};

export const loginSchool = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body as createSchool;

    const schoolExists = await prisma.school.findFirst({
      where: {
        email,
      },
    });
    if (!schoolExists)
      return res.status(404).json({ message: 'School not Found' });

    const verifyPassword = await compare(password, schoolExists?.password);
    if (!verifyPassword) {
      const Errors = {
        message: 'Invalid Credentials',
        params: 'password',
        value: password,
      };
      return res.status(401).json(Array(Errors));
    }

    const accessToken = await createAccessToken(schoolExists.id);
    const refreshToken = await createRefreshToken(schoolExists.id);

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge,
    });

    const loggedInSchool = {
      id: schoolExists.id,
      name: schoolExists.schoolName,
      email: schoolExists.email,
      accessToken,
    };

    res.json({ loggedInSchool, success: true });
  } catch (error) {
    next(error);
  }
};

export const logoutSchool = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //no cookies or no jwt
    const refreshToken = cookies.jwt;

    let foundToken!: string;
    refreshTokens.forEach((item) => {
      if (Object.values(item)[1] === refreshToken) {
        foundToken = Object.values(item)[1] as string;
      }
    });
    if (!foundToken) {
      res.clearCookie('jwt', { httpOnly: true });
      return res.sendStatus(204);
    }
    removeRefreshToken(refreshToken);
    res
      .clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true })
      .status(204)
      .json({ message: 'User logged out successfully' });
  } catch (error) {
    next(error);
  }
};

export const getSchool = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    const findSchool = await prisma.school.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        schoolName: true,
        email: true,
        address: true,
        dateOfestablishment: true,
      },
    });

    res.status(200).json({ findSchool, success: true });
  } catch (error) {
    next(error);
  }
};

export const updateSchoolDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const id = req['payload'].id;

    const { schoolName, email, dateOfestablishment } = req.body as updateSchool;
    const {GPS, POBox, location, website} = req.body as schoolAddress

    // will uncomment this code later when we are ready for route protection
    // check for who can perform this operation
    // const permittedUser = await prisma.user.findFirst({
    //   where: {
    //     id,
    //   },
    // });

    // if (!['admin'].includes(permittedUser.role))
    //   return res
    //     .status(401)
    //     .json({ message: 'Not allowed for this operation' });

    // update school

    const updateSchool = await prisma.school.update({
      where: {
        id: req.params.id,
      },
      data: {
        schoolName,
        email,
        address: {
          create: {
           GPS,
           POBox,
           location,
           website
          },
        },
        dateOfestablishment,
      },
    });

    res.json({ updateSchool, success: true });
  } catch (error) {
    next(error);
  }
};

export const deleteSchool = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // check if school exists in db
    const schoolExists = await prisma.school.findFirst({
      where: {
        id: req.body.id,
      },
    });
    if (!schoolExists)
      res.status(404).json({ message: 'school not found', sucess: false });

      // will allow it when we are ready to protect the routes

    // const permittedRole = await prisma.user.findFirst({
    //   where: {
    //     id: req['payload'].id,
    //   },
    // });

    // if (!['Admin'].includes(permittedRole.role))
    //   res
    //     .status(401)
    //     .json({ message: 'unauthorized for this operation', success: false });

    await prisma.school.delete({
      where: {
        id: req.body.schoolId,
      },
    });

    res.status(200).json({
      message: `${schoolExists.schoolName} is deleted successfully`,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const findAllSchools = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const permittedRole = await prisma.user.findFirst({
      where: {
        id: req['payload'].id,
      },
    });

    if (!['admin'].includes(permittedRole.role))
      res
        .status(401)
        .json({ message: 'unauthorized for this operation', success: false });

    const allSchools = await prisma.school.findMany({
      select: {
        id: true,
        schoolName: true,
        email: true,
        address: true,
      },
    });

    res.status(200).json({ allSchools, success: true });
  } catch (error) {
    next(error);
  }
};



// School forgot password

export const schoolforgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body as createSchool;
    // const userId = req["payload"].id
    // console.log(userId)
    const currentSchool = await prisma.school.findUnique({
      where: {
        email,
      },
    });
    console.log(currentSchool.id);

    const token = await createAccessToken(currentSchool.id);

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
      subject: 'Password reset link',
      html: `<a href="/forgotPassword/" + ${currentSchool.id} + '/' + ${token}>click this link to confirm password reset</a>`,
    };

    transporter.sendMail(mailDetails, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('email sent successfully');
      }
    });

    await prisma.school.update({
      where: {
        id: currentSchool.id,
      },
      data: {
        password: req.body.password as string,
      },
    });
    res.json({ success: true });
  } catch (error) {
    next(error.message);
  }
};