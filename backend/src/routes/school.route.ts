import express from 'express';
import {newSchool, getSchool, updateSchoolDetails, deleteSchool, findAllSchools, loginSchool, logoutSchool, schoolforgotPassword, resetPassword} from  '../controllers/school.controller'
import { passwordValidator, validatorSchema } from '../middlewares/validators';
import { verifyAdmin } from '../middlewares/permission';

const schoolRouter = express.Router()

schoolRouter.get('/school', getSchool)
schoolRouter.get('/allSchools', findAllSchools)
schoolRouter.post('/createSchool', validatorSchema, passwordValidator, newSchool)
schoolRouter.post('/schoolLogin', loginSchool)
schoolRouter.delete('/schoolLogout', logoutSchool)
schoolRouter.patch('/school/update/:id', updateSchoolDetails)
schoolRouter.delete('/school/delete/:id', deleteSchool)
schoolRouter.post('/schoolforgotPassword', schoolforgotPassword)
schoolRouter.post('/resetPassword', resetPassword)

export default schoolRouter
