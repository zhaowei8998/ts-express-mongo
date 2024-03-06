import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import Service from '../common/baseService';
import ResultJson from '../common/ResultJson';

import { logger } from '../common/log4js';
import { IncomingForm } from 'formidable';

class UploadController extends Service {
    /**
     * 上传图片
     */
    public async uploadImg(req: Request, res: Response) {
        let result = {};
        try {
            const form: any = new IncomingForm();
            // 文件保存路径
            form.uploadDir = path.resolve(__dirname, '../public/images');
            // 保留文件后缀名
            form.keepExtensions = true;
            // 编码格式
            form.encoding = 'utf-8';
            form.parse(req, (err: any, fields: any, files: any) => {
                if (err) {
                    logger.error('upload file process error ！');
                    result = ResultJson.errorMsg('upload file process error ！');
                } else {
                    const lawfulFiles = ['.PNG', '.JPEG', '.JPG', '.ICO', '.SVG'];
                    const extName = path.extname(files.file.path);
                    if (lawfulFiles.indexOf(extName.toUpperCase()) > -1) {
                        const imgName = files.file.name;
                        const imgUrl = '/images/' + path.basename(files.file.path);
                        const uploadFile: any = {
                            onlinePath: imgUrl,
                            oriName: imgName
                        };
                        // 使用异步保存
                        //uploadFileService.addUploadFile(uploadFile);
                        result = ResultJson.successData(imgUrl);
                        // Object.assign(result, { data: imgUrl });
                    } else {
                        fs.unlinkSync(files.file.path);
                        logger.error('upload image illegal file ！');
                        Object.assign(result, { code: 1, message: 'illegal file ！' });
                        result = ResultJson.errorMsg('illegal file ！');
                    }
                }
                res.send(result);
            });
        } catch (error) {
            logger.error(`upload image service error ！== ${error.message}`);
            res.send(ResultJson.errorMsg(error.message));
        }
    }

    /**
     * 上传文件
     */
    public async uploadFile(req: Request, res: Response) {
        let result = {}
        try {
            const form: any = new IncomingForm();
            // 文件保存路径
            form.uploadDir = path.resolve(__dirname, '../public/files');
            // 保留文件后缀名
            form.keepExtensions = true;
            // 编码格式
            form.encoding = 'utf-8';
            form.parse(req, (err: any, fields: any, files: any) => {
                if (err) {
                    logger.error('upload file process error ！');
                    result = ResultJson.errorMsg('upload file process error ！');

                } else {
                    console.log(JSON.stringify(files));
                    const fileName = files.file.name;
                    const fileUrl = '/files/' + path.basename(files.file.path);
                    const uploadFile: any = {
                        onlinePath: fileUrl,
                        oriName: fileName
                    };
                    // 使用异步保存
                    //uploadFileService.addUploadFile(uploadFile);
                    fs.unlinkSync(files.file.path);
                    result = ResultJson.successData(fileUrl);

                }
                res.send(result);
            });
        } catch (error) {
            logger.error(`upload file service error ！== ${error.message}`);
            res.send(ResultJson.errorMsg(error.message));

        }
    }

    // 批量上传
    public async multiplesUploadFile(req: Request, res: Response) {
        let result = {};
        try {
            const form: any = new IncomingForm();
            // 文件保存路径
            form.uploadDir = path.resolve(__dirname, '../public/files');
            // 保留文件后缀名
            form.keepExtensions = true;
            // 编码格式
            form.encoding = 'utf-8';
            // 批量上传开关
            form.multiples = true;
            form.parse(req, (err: any, fields: any, files: any) => {
                console.log(files);
                if (err) {
                    logger.error('upload file process error ！');
                    Object.assign(result, { code: 1, message: err });
                    result = ResultJson.errorMsg(err);
                } else {
                    const fileName = files.file.name;
                    const fileUrl = '/files/' + path.basename(files.file.path);
                    const uploadFile: any = {
                        onlinePath: fileUrl,
                        oriName: fileName
                    };
                    // 使用异步保存
                    //uploadFileService.addUploadFile(uploadFile);
                    fs.unlinkSync(files.file.path);
                    result = ResultJson.successData(fileUrl);
                }
                res.send(result);
            });
        } catch (error) {
            logger.error(`upload file service error ！== ${error.message}`);
            res.send(ResultJson.errorMsg(error.message));
        }
    }
}

export default new UploadController();
