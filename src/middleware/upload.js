
const path = require('path')
const multer = require('multer')
const crypto = require('crypto');
const fs = require('fs')
const md5 = function (src) {
    return crypto.createHash('md5').update(src).digest('hex');
}
const uri_start = __dirname.replace('/build', '').length
//创建文件目录
function mkdirs(dirpath, mode) {
    if (!fs.existsSync(dirpath)) {
        mkdirs(path.dirname(dirpath), mode)
        fs.mkdirSync(dirpath, mode);
    }
}

//通过文件信息获取文件目录
function get_path(file, depth) {
    depth = depth || 3
    let path_name = ''
    let file_info = ''
    for (let o in file) {
        file_info += file[o]
    }
    file_info += Math.random()
    let hash = md5(file_info)
    for (let i = 0; i < depth; i++) {
        path_name = path.join(path_name, hash[i])
    }
    path_name = path.join(path_name, hash)

    if (file.mimetype && path.dirname(file.mimetype) == 'image') {
        path_name = path.join('img', path_name)
    } else {
        path_name = path.join('file', path_name)
    }
    return path_name
}
var exports = module.exports = async function (req, res, next) {
    let pathFunc, nameFunc;
    switch (req.originalUrl) {
        case '/uploadImg':
        case '/uploadIdaFile':
            pathFunc = function (req, file, cb) {
                let path_name = path.join(__dirname, '../../public/upload', get_path(file))
                mkdirs(path_name)
                cb(null, path_name)
            };
            nameFunc = function (req, file, cb) {
                let file_extname = path.extname(file.originalname)
                let file_basename = path.basename(file.originalname, file_extname);
                let filename = Buffer.from(file_basename).toString('base64').replace(/\//g, '$') + file_extname
                cb(null, filename)
            }
            break;
        case '/uploadExcel':
            pathFunc = function (req, file, cb) {
                let path_name = path.join(__dirname, '../../public/upload/excel')
                mkdirs(path_name)
                cb(null, path_name)
            };
            nameFunc = function (req, file, cb) {
                cb(null, file.originalname)
            }
            break;
    }
    let storage = multer.diskStorage({
        destination: pathFunc,
        filename: nameFunc
    })
    let upload = multer({
        storage: storage,
        limits: {
            files: 10,
            fileSize: 1024 * 1024 * 70
        }
    }).any();
    let start_time = Date.now()
    try {
        upload(req, res, uploadCallback);
    } catch (e) { console.log('upload error', e); }
    function uploadCallback(err) {
        if (err) {
            console.log('upload error-------', err)
            res.status(500)
            let errorMessage = '未知错误'
            if (err.code == 'LIMIT_FILE_SIZE') {
                errorMessage = '文件太大'
            } else if (err.code == 'LIMIT_FILE_COUNT') {
                errorMessage = '文件太多'
            }
            return res.json({
                error: err.code,
                errorMessage: err.message,
                msec: Date.now() - start_time
            })
        }
        if (!req.files || !req.files.length) {
            return res.json({
                error: 500,
                errorMessage: '上传文件为空',
                msec: Date.now() - start_time
            })
        }

        req.files.forEach(item => {
            item.path = item.path.substr(item.path.indexOf(path.normalize('public/upload')))
            delete item.destination
        });
        console.log('end_upload', req.files)
        res.json({ data: req.files })
    }
}