import multer from 'multer';
import path from 'path';
import {CloudinaryStorage} from 'multer-storage-cloudinary'
import cloudinary from './cloudinaryConfig';

// const fileStorage = multer.diskStorage({
//   destination: function (_req, _file, cb) {
//     cb(null, 'src/uploads');
//   },
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     cb(null, `files-${Date.now()}${ext}`);
//   },
// });

interface MulterRequest extends Request {
  file: any;
}


const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req: MulterRequest, file: any) => {
    return {
      folder: 'schoolmgtImages',
      public_id: Date.now() + '-' + file.originalname,
      format: (req, file) => {
        const mimetypes = {
          'image/jpeg': 'jpg',
          'image/png': 'png',
          'image/gif': 'gif',
          // add any other mimetypes and corresponding formats you need
        };
        return mimetypes[file.mimetype];
      },
    };
  },
});



const upload = multer({
  storage: cloudinaryStorage,
  fileFilter: (req, file, cb) => {
    const acceptedExtensions = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
    ];

    if (!acceptedExtensions.includes(file.mimetype)) {
      return cb(new Error(`File format not supported: ${file.mimetype}`));
    }

    cb(null, true);
  },
});

export default upload;
