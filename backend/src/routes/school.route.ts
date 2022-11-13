import express from 'express';
import {newSchool, getSchool, updateSchoolDetails, deleteSchool, findAllSchools, loginSchool, logoutSchool} from  '../controllers/school.controller'
import { passwordValidator, validatorSchema } from '../middlewares/validators';
import { verifyAccessToken, verifyAdmin } from '../middlewares/verifyToken';

const schoolRouter = express.Router()

schoolRouter.post('/createSchool', validatorSchema, passwordValidator, newSchool)
schoolRouter.post('/schoolLogin', loginSchool)
schoolRouter.get('/schoolLogout', logoutSchool)
schoolRouter.get('/school', getSchool)
schoolRouter.patch('/school/update', verifyAccessToken, updateSchoolDetails)
schoolRouter.delete('school/delete', verifyAccessToken, deleteSchool)
schoolRouter.get('/allSchools', verifyAdmin, findAllSchools)


export default schoolRouter
