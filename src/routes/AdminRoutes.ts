import { AdminController } from '../controllers/AdminController';
import { Router } from 'express';
//import { AdminController } from "../controllers/AdminController";

const routes: Router = Router();

const adminController: AdminController = new AdminController();

routes.post('/add', adminController.add)
// routes.post('/list', adminController.list)

export default routes
