import express from 'express';
import {createAnnouncement, deleteAnnouncement, findAnnouncement} from '../controllers/announcement.controller';

const announceRouter = express.Router();


announceRouter.post('/createAnnouncement', createAnnouncement)
announceRouter.get('/findAnnouncement', findAnnouncement)
announceRouter.delete('/deleteAnnouncement/:id', deleteAnnouncement)

export default announceRouter;