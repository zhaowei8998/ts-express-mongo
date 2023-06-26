import { Router } from 'express';
import contact from "./crmRoutes";
import adminRoutes from './AdminRoutes';

const router: Router = Router();

router.use('/v1/contact',contact)
router.use('/v1/admin',adminRoutes)

export default router
