import { prisma } from '../config/prismaInit';
import { NextFunction, Request, Response } from 'express';
import { createSchool, updateSchool } from '../@types';
import { compare, hashedPassword } from '../helpers/bcryptConfig';
import { createAccessToken } from '../helpers/accessToken';
import { createRefreshToken } from '../helpers/refreshToken';
import { refreshTokens, removeRefreshToken } from './renewtoken.controller';

// export type RefreshTokenUser = {
//   id: string;
//   firstname: string;
//   role: string;
// };

// export type RefreshTokensType = {
//   user: RefreshTokenUser;
//   refreshToken: string;
// };

// export let refreshTokens: RefreshTokensType[] = [];

// const removeRefreshToken = (tokenGiven: string) => {
//   refreshTokens = refreshTokens.filter((token) => {
//     return token.refreshToken !== tokenGiven;
//   });
// };

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
    // const cookies = req.cookies;
    // if(!cookies?.jwt) return res.status(204)
    // const refreshToken = cookies.jwt;

    // let foundToken!: string;
    // refreshTokens.forEach((item) => {
    //   if(Object.values(item)[1] === refreshToken){
    //     foundToken = Object.values(item)[1] as string
    //   }
    // })

    // if (!foundToken) {
    //   res.clearCookie('jwt', {httpOnly: true})
    //   return res.status(204)
    // }

    // removeRefreshToken(refreshToken)
    res
      .clearCookie('jwt', {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      })
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
    const id = req['payload'].id;

    const { schoolName, email, dateOfestablishment } = req.body as updateSchool;
    // check for who can perform this operation
    const permittedUser = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!['admin'].includes(permittedUser.role))
      return res
        .status(401)
        .json({ message: 'Not allowed for this operation' });

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
            GPS: req.body.GPS,
            POBox: req.body.POBox,
            location: req.body.location,
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

    const permittedRole = await prisma.user.findFirst({
      where: {
        id: req['payload'].id,
      },
    });

    if (!['Admin'].includes(permittedRole.role))
      res
        .status(401)
        .json({ message: 'unauthorized for this operation', success: false });

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
