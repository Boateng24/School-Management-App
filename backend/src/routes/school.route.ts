import express from 'express';
import {newSchool} from  '../controllers/school.controller'
import { passwordValidator, validatorSchema } from '../middlewares/validators';

const schoolRouter = express.Router()

schoolRouter.post('/createSchool',passwordValidator, validatorSchema, newSchool)


export default schoolRouter
