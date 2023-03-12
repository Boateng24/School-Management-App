import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/prismaInit';
import { compare } from '../helpers/bcryptConfig';
import { createAccessToken } from '../helpers/accessToken';
import { createRefreshToken } from '../helpers/refreshToken';


const maxAge = 7 * 24 * 60 * 60 * 1000;
export const superAdminLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const findUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!findUser) {
      return res.status(404).json({ message: 'User does not exist' });
    }
    
    const matchPassword = await compare(password, findUser?.password);
    if (!matchPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // create both acess and refresh token for current user
const accessToken = await createAccessToken(findUser?.id);
const refreshToken = await createRefreshToken(findUser?.id);

res.cookie('jwt-access', refreshToken, {
  httpOnly: true,
  sameSite: 'none',
  secure: true,
  maxAge,
});

const loggedInUser = {
  id: findUser.id,
  firstname: findUser.fullname,
  email: findUser.email,
  role: findUser.role,
  accessToken,
};

res.status(200).json({ loggedInUser, success: true });
  } catch (error) {
    next(error);
  }
};
