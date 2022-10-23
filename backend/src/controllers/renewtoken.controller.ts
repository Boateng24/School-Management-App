import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import {env} from 'process';
import { tokenRenewType } from '../@types';
import { maxAge } from '../helpers/accessToken';

export type RefreshTokenUser = {
    id: string,
    firstname: string;
    role: string;
}

export type RefreshTokenType = {
    user: RefreshTokenUser;
    refreshToken: string;
}

export let refreshTokens: RefreshTokenType[] = []

export const removeRefreshToken = (givenToken:string) => {
        refreshTokens = refreshTokens.filter((item) => {
            return item.refreshToken !== givenToken
        })
}


export const renewAccessToken =(req:Request, res:Response, next:NextFunction)=> {
    try {
        const cookies = req.cookies
        if(!cookies.jwt) return res.sendStatus(401); //no cookies or no jwt-cookies
        const refreshToken = cookies.jwt as string;
        let User:RefreshTokenUser;
        refreshTokens.forEach((token) => {
            if(Object.values(token)[1] === refreshToken){
                User = Object.values(token)[0] as RefreshTokenUser
            }
        })
        if(!User){
            return res.status(403).json({message: "Not authenticated"})
        }
        jwt.verify(
            refreshToken,
            String(env.REFRESH_TOKEN_SECRET),
            (err:any, tokenRefresh: tokenRenewType) => {
                const actualId = tokenRefresh.id;
                if(!err){
                    const accessToken = jwt.sign(
                        {id: actualId},
                        String(env.ACCESS_TOKEN_SECRET),
                        {
                            expiresIn: maxAge,
                            issuer:'RanchoRob.org'
                        }
                    );
                    res.status(201).json({role: User.role, userId: User.id, firstname: User.firstname, accessToken})
                }
                else{
                    res.status(403).json({message: 'Not authenticated'})
                }
            }
        )
    } catch (error) {
        next(error)
    }
}