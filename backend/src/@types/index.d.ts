import {Role, User} from '@prisma/client'

declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}


interface createUser{
    fullname: string;
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

interface tokenRenewType{
    id: string;
    iat: number;
    exp: number;
    aud: string;
    iss: string
}

interface createSchool {
  schoolName:string;
  email:string;
  password: string;
  confirmPassword: string
}


interface updateSchool{
  schoolName?: string, 
  email?: string, 
  dateOfestablishment?:string, 
  address?:schoolAddress[], 
  NumOfNonTeachingStaff?:number, 
  NumOfStudents?:number, 
  NumOfTeachers?:number
}

interface schoolAddress{
  location: string[]
  POBox: string
  website?: string
  GPS: string
}

interface refreshTokenType {
  user: string;
  refreshToken: string
}