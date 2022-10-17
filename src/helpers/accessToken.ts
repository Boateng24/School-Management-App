import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import createError from 'http-errors';


config()
//24 * 60 * 60 * 7;
export const maxAge = process.env.ACCESS_TOKEN_MAX_AGE

export const createAccessToken = (id: string) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { id },
      String(process.env.ACCESS_TOKEN_SECRET),
      {
        expiresIn: maxAge,
        issuer: "amalitech.org",
        audience: id,
      },
      (err, token) => {
        if (err) reject(new createError.InternalServerError());
        resolve(token);
      }
    );
  });
};