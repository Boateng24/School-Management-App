import express from 'express';
import {newSchool, getSchool, updateSchoolDetails, deleteSchool, findAllSchools, loginSchool, logoutSchool} from  '../controllers/school.controller'
import { passwordValidator, validatorSchema } from '../middlewares/validators';
import { verifyAccessToken, verifyAdmin } from '../middlewares/verifyToken';

const schoolRouter = express.Router()

schoolRouter.get('/school', getSchool)
schoolRouter.get('/allSchools', verifyAdmin, findAllSchools)
schoolRouter.post('/createSchool', validatorSchema, passwordValidator, newSchool)
schoolRouter.post('/schoolLogin', loginSchool)
schoolRouter.delete('/schoolLogout', logoutSchool)
schoolRouter.patch('/school/update', verifyAccessToken, updateSchoolDetails)
schoolRouter.delete('school/delete', verifyAccessToken, deleteSchool)


export default schoolRouter
