import express from 'express';
import { countallStudents, allPrefects, allJuniorHighStudents, allPrimaryStudents, findallStudents } from '../controllers/student.controller';
const studentRouter = express.Router()

studentRouter.get('/findallstudents', findallStudents)
studentRouter.get('/countallstudents', countallStudents)
studentRouter.get('/allprefects', allPrefects)
studentRouter.get('/allJhs', allJuniorHighStudents)
studentRouter.get('/allPrimary', allPrimaryStudents)


export default studentRouter