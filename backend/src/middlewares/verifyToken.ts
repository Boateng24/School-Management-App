import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import { NextFunction, Request, Response } from 'express';
import {config} from 'dotenv';
import {env} from 'process'
import { prisma } from '../config/prismaInit';


config()

export const verifyAccessToken = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
    if (!req.headers["authorization"])
      return next(new createHttpError.Unauthorized());
    const authHeader = req.headers["authorization"];
    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1] || req.headers["authorization"];
    jwt.verify(token, String(env.JWT_SECRET), async (err, payload) => {
      if (err) {
        const message =
          err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
          // res.redirect('/login')
          return next(new createHttpError.Forbidden(message));
      }
    });
  }catch(err: any){
    next(err.message)
  }
  };


 