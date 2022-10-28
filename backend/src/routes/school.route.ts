import express from 'express';
import {newSchool, getSchool, updateSchoolDetails, deleteSchool, findAllSchools} from  '../controllers/school.controller'
import { passwordValidator, validatorSchema } from '../middlewares/validators';
import { verifyAccessToken, verifyAdmin } from '../middlewares/verifyToken';

const schoolRouter = express.Router()

schoolRouter.post('/createSchool', validatorSchema, passwordValidator, newSchool)
schoolRouter.get('/school', getSchool)
schoolRouter.patch('/school/update', verifyAccessToken, updateSchoolDetails)
schoolRouter.delete('school/delete', verifyAccessToken, deleteSchool)
schoolRouter.get('/allSchools', verifyAccessToken, findAllSchools)


export default schoolRouter
