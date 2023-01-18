import express from 'express';
import {newSchool, getSchool, updateSchoolDetails, deleteSchool, findAllSchools, loginSchool, logoutSchool, schoolforgotPassword} from  '../controllers/school.controller'
import { passwordValidator, validatorSchema } from '../middlewares/validators';
import { verifyAdmin } from '../middlewares/permission';

const schoolRouter = express.Router()

schoolRouter.get('/school', getSchool)
schoolRouter.get('/allSchools', verifyAdmin, findAllSchools)
schoolRouter.post('/createSchool', validatorSchema, passwordValidator, newSchool)
schoolRouter.post('/schoolLogin', loginSchool)
schoolRouter.delete('/schoolLogout', logoutSchool)
schoolRouter.patch('/school/update', updateSchoolDetails)
schoolRouter.delete('school/delete', deleteSchool)
schoolRouter.post('/schoolforgotPassword', schoolforgotPassword)


export default schoolRouter
