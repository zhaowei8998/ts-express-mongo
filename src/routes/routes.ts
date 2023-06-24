import { Router } from 'express';
import contact from "./crmRoutes";

const router: Router = Router();
router.use('/v1/contact',contact)
export default router