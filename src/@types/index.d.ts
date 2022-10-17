import {Role, User} from '@prisma/client'

declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}


interface createUser{
    firstname: string;
    email: string;
    password: string;
    confirmPassword:string
    age?: number;
    role?: Role
}

interface loginUser{
    email: string;
    password: string;
}