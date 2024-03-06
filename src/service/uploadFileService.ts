// import Service from '../common/baseService';
// //import mainDb from '../databases/main/entryService';

// export default class UploadFileService extends Service {
//     /**
//      * 新增文件对应关系
//      */
//     public static async addUploadFile(newData: any) {
//         const result = await mainDb.db.upload_file.create(newData);
//         return result;
//     }

//     /**
//      * 查找文件对应关系(One)
//      */
//     public static async findUploadFileByCondition(condition: any) {
//         const result = await mainDb.db.upload_file.findOne({ where: condition });
//         return result;
//     }

//     /**
//      * 查找文件对应关系(List)
//      */
//     public static async findUploadFileListByCondition(condition: any) {
//         const result = await mainDb.db.upload_file.findAll({ where: condition });
//         return result;
//     }
// }
