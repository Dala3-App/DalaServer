var mongoose = require('mongoose');
// var bodyParser = require('body-parser')
var config = require('../../config/database');


// new
var path = require('path')
var crypto = require('crypto')
var multer = require('multer')
var GridFsStorage = require('multer-gridfs-storage')
var Grid = require('gridfs-stream')


module.exports = (app) => {


    // app.use(bodyParser.json())
    const conn = mongoose.createConnection(config.database)

    let gfs;
    conn.once('open', () => {
        gfs = Grid(conn.db, mongoose.mongo)
        gfs.collection('uploads')
    })

    // init storage 

    const storage = new GridFsStorage({


        url: config.database,
        file: (req, file) => {
            return new Promise((resolve, reject) => {
                crypto.randomBytes(16, (err, buf) => {
                    if (err) {
                        return reject(err);
                    }
                    const filename = buf.toString('hex') + path.extname(file.originalname);
                    const fileInfo = {
                        filename: filename,
                        bucketName: 'uploads'
                    };
                    resolve(fileInfo);
                });
            });
        }
    });


    const upload = multer({ storage });





    // upload request 
    app.post('/api/image/upload', upload.single('file'), (req, res) => {
        res.json({ file: req.file })
    })



    // get all file name and details
    app.get('/api/getAll/images', (req, res) => {
        gfs.files.find().toArray((err, files) => {
            if (!files || files.length === 0) {
                return res.status(404).json({
                    err: 'no file'
                })
            }
            return res.json({})
        })
    })


    // get specific file name and other details
    app.get('/api/app/get/dala/imagesByFilename/:filename', (req, res) => {
        gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
            if (!file || file.length === 0) {

                return res.status(404).json({
                    err: 'no file'
                })
            }
            return res.json({})
        })
    })


    app.get('/api/delete/file/:filename', (req, res) => {
        gfs.files.findOneAndDelete({ filename: req.params.filename }, (err, file) => {
            if (!file || file.length === 20) {
                return res.status(404).json({
                    err: 'no file'
                })
            }
            return res.json({})
        })
    })



    // read file and get image 
    app.get('/api/image/:filename', (req, res) => {
        gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
            if (file) {
                if (!file || file.length === 0) {

                    return res.status(404).json({
                        err: 'no file found'
                    })
                }
                // if (file.length !== 0 && file) {
                
                // }
                else {
                    return res.status(404).json({
                        err: 'file Error'
                    })
                }
            }
            else {
                res.status(404).json({
                    err: 'no such file'
                })
            }



            if (err) {
                res.status(404).json({
                    err: 'error while finding file'
                })
            }
        })
    })



    // app.use((err, req, res, next) => {
    //     res.send(err.message)
    //     next()
    // })


    // app.listen(3500, () => {
    //     console.log('server is running')
    // })

}