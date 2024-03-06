import { Router } from 'express';
import adminRoutes from './AdminRoutes';
import uploadRoutes from './UploadRoutes';
import helloRoutes from './HelloRoutes';
const router: Router = Router();

router.use('/v1/admin', adminRoutes)
router.use('/v1/upload', uploadRoutes)
router.use('/v1/hello', helloRoutes)
export default router
