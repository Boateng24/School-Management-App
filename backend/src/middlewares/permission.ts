import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/prismaInit';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import { env } from 'process';

//  will work on the verify user middleware later
//  ----------------------------------------------
// Has been worked on now will add when frontend guy is ready for it
export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Find the user with the specified ID in the database
    const user = await prisma.user.findFirst({
      where: {
        id: req.params.id,
      },
    });

    // If the user is not found, return a 404 error
    if (!user) {
      return res.status(404).json({ message: 'User not found please sign up' });
    }

    // If the user is found, attach it to the request object and call the next middleware
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

interface JwtPayload {
  id: string;
  // other properties ...
}
export const verifyAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Verify that the authorization header is present
    if (!req.headers['authorization']) {
      return next(new createHttpError.Unauthorized());
    }

    // Extract the token from the authorization header
    const authHeader = req.headers['authorization'];
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];

    // If the token is not present, return an error
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    // Verify the token
    jwt.verify(
      token,
      String(env.ACCESS_TOKEN_SECRET),
      async (err, decoded: JwtPayload) => {
        if (err) {
          const message =
            err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
          return next(new createHttpError.Forbidden(message));
        }

        if (!('id' in decoded)) {
          return res
            .status(400)
            .json({ error: 'id not present in decoded JWT' });
        }
        // Find the user with the specified ID in the database
        const permittedUser = await prisma.user.findFirst({
          where: {
            id: decoded.id,
          },
        });

        // If the user is not found, return a 404 error
        if (!permittedUser) {
          return res.status(404).json({ message: 'User not found' });
        }

        // If the user is not an admin, return a 403 error
        if (!['admin', 'superAdmin'].includes(permittedUser.role)) {
          return res.status(403).json({ message: 'Forbidden' });
        }

        // If the user is an admin, attach it to the request object and call the next middleware
        req.user = permittedUser;
        next();
      }
    );
  } catch (error) {
    // If an error occurs, pass it to the next middleware
    next(error);
  }
};
