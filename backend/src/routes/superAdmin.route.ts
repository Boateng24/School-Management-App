import express from 'express';
import {superAdminLogin} from '../controllers/superAdmin.controller'

const superAdminRouter = express.Router();

superAdminRouter.post('/superAdminLogin', superAdminLogin)

export default superAdminRouter;