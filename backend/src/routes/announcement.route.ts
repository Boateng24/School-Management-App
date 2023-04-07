import express from 'express';
import {createAnnouncement, deleteAnnouncement, editAnnouncement, findAnnouncement, findAnnouncementById} from '../controllers/announcement.controller';

const announceRouter = express.Router();


announceRouter.post('/createAnnouncement', createAnnouncement)
announceRouter.get('/findAnnouncement', findAnnouncement)
announceRouter.delete('/deleteAnnouncement/:id', deleteAnnouncement)
announceRouter.put('/edit/:id', editAnnouncement)
announceRouter.get('/find/:id', findAnnouncementById)

export default announceRouter;