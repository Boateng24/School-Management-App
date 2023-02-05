import {Role, User, classCategory} from '@prisma/client'

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

interface userupdate{
  fullname?: string;
  email?: string;
  age?: number;
  gender?: string
  guardian: userGuardian
  stage: userStage
  address: userAddress
}


interface userGuardian{
 father?: string;
 mother?: string;
 other?: string;
}

interface userAddress {
  phoneNumber: string;
  GPS: string;
  location: string;
}

interface userStage {
  classType: classCategory;
  mainStage?: string
}

interface loginUser{
    email: string;
    password: string;
}

interface studentscores{
  testscore?: number;
  examscore?: number;
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
