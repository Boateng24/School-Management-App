import express from 'express';
import { allStudents, allPrefects, allJuniorHighStudents, allPrimaryStudents } from '../controllers/student.controller';
const studentRouter = express.Router()


studentRouter.get('/allstudents', allStudents)
studentRouter.get('/allprefects', allPrefects)
studentRouter.get('/allJhs', allJuniorHighStudents)
studentRouter.get('/allPrimary', allPrimaryStudents)


export default studentRouter