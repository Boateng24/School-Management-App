import jwt from 'jsonwebtoken';
import {config} from 'dotenv';
import createError from 'http-errors';


// (24 * 60 * 60 * 7) * 2;
config()
export const maxAge = process.env.REFRESH_TOKEN_MAX_AGE;

export const createRefreshToken = (id: string) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { id },
      String(process.env.REFRESH_TOKEN_SECRET),
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