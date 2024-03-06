import { Router } from 'express';
import uploadsController from '../controllers/uploadsController';
const router: Router = Router();

router.post('/uploadImg', uploadsController.uploadImg); // 图片上传
router.post('/uploadFile', uploadsController.uploadFile); // 文件上传
router.post('/multiplesUploadFile', uploadsController.multiplesUploadFile); // 文件批量上传
export default router;
