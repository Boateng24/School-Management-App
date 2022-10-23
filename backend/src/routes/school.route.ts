import express from 'express';
import {newSchool, getSchool, updateSchoolDetails} from  '../controllers/school.controller'
import { passwordValidator, validatorSchema } from '../middlewares/validators';

const schoolRouter = express.Router()

schoolRouter.post('/createSchool',passwordValidator, validatorSchema, newSchool)
schoolRouter.get('/school', getSchool)
schoolRouter.patch('/school/update', updateSchoolDetails)


export default schoolRouter
