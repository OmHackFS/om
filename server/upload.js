import util from "util";
import multer from "multer";
const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

// Configure the disk storage engine
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, file.originalname);
  },
});
let uploadFile = multer({
  storage: storage,
  limits: { fileSize: MAX_SIZE },
}).single("file");

// Makes the exported object usable by async-await
let uploadFileMiddleware = util.promisify(uploadFile);

export default uploadFileMiddleware;