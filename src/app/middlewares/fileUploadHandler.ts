import { Request } from 'express';
import fs from 'fs';
import path from 'path';
import multer, { FileFilterCallback, StorageEngine } from 'multer';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../../errors/ApiError';

const fileUploadHandler = () => {
  // Create base uploads directory
  const baseUploadDir = path.join(process.cwd(), 'uploads');
  if (!fs.existsSync(baseUploadDir)) {
    fs.mkdirSync(baseUploadDir);
  }

  // Utility to create nested folder if missing
  const createDir = (dirPath: string) => {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  };

  // Multer storage configuration
  const storage: StorageEngine = multer.diskStorage({
    destination: (
      req: Request,
      file: Express.Multer.File,
      cb: (error: Error | null, destination: string) => void
    ) => {
      let uploadDir: string;

      switch (file.fieldname) {
        case 'employeeSignature1':
        case 'employeeSignature2':
        case 'employeeSignature3':
        case 'employeeSignature4':
        case 'employeeSignature5':
        case 'employeeSignature6':
        case 'employeeSignature7':
        case 'employeeSignature8':
        case 'employeeSignature9':
        case 'employeeSignature10':
        case 'supervisorSignature':
        case 'directDepositImage':
        case 'timeSheetPdfOrImage':
        case 'photoIdImage':
        case 'socialSecurityImage':
        case 'residentCardImage':
        case 'workAuthorizationImage':
        case 'image':
          uploadDir = path.join(baseUploadDir, 'image');
          break;

        case 'media':
          uploadDir = path.join(baseUploadDir, 'media');
          break;

        case 'directDepositPdf':
        case 'photoIdPdf':
        case 'socialSecurityPdf':
        case 'residentCardPdf':
        case 'workAuthorizationPdf':
        case 'doc':
          uploadDir = path.join(baseUploadDir, 'doc');
          break;

        default:
          throw new ApiError(StatusCodes.BAD_REQUEST, 'File is not supported');
      }

      createDir(uploadDir);
      cb(null, uploadDir);
    },

    filename: (
      req: Request,
      file: Express.Multer.File,
      cb: (error: Error | null, filename: string) => void
    ) => {
      const fileExt = path.extname(file.originalname);
      const fileName =
        file.originalname
          .replace(fileExt, '')
          .toLowerCase()
          .split(' ')
          .join('-') +
        '-' +
        Date.now();
      cb(null, fileName + fileExt);
    },
  });

  // Multer file filter validation
  const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) => {
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const allowedMediaTypes = ['video/mp4', 'audio/mpeg'];
    const allowedDocTypes = ['application/pdf'];

    if (allowedImageTypes.includes(file.mimetype)) {
      cb(null, true);
    } else if (allowedMediaTypes.includes(file.mimetype)) {
      cb(null, true);
    } else if (allowedDocTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new ApiError(
          StatusCodes.BAD_REQUEST,
          'Only .jpeg, .png, .jpg, .mp4, .mp3, or .pdf files are supported'
        )
      );
    }
  };

  // Final upload middleware
  const upload = multer({
    storage,
    fileFilter,
  }).fields([
    { name: 'image', maxCount: 3 },
    { name: 'media', maxCount: 3 },
    { name: 'doc', maxCount: 3 },
    { name: 'employeeSignature1', maxCount: 3 },
    { name: 'employeeSignature2', maxCount: 3 },
    { name: 'employeeSignature3', maxCount: 3 },
    { name: 'employeeSignature4', maxCount: 3 },
    { name: 'employeeSignature5', maxCount: 3 },
    { name: 'employeeSignature6', maxCount: 3 },
    { name: 'employeeSignature7', maxCount: 3 },
    { name: 'employeeSignature8', maxCount: 3 },
    { name: 'employeeSignature9', maxCount: 3 },
    { name: 'supervisorSignature', maxCount: 3 },
    { name: 'timeSheetPdfOrImage', maxCount: 3 },
    { name: 'directDepositImage', maxCount: 3 },
    { name: 'photoIdImage', maxCount: 3 },
    { name: 'socialSecurityImage', maxCount: 3 },
    { name: 'residentCardImage', maxCount: 3 },
    { name: 'workAuthorizationImage', maxCount: 3 },
    { name: 'directDepositPdf', maxCount: 3 },
    { name: 'photoIdPdf', maxCount: 3 },
    { name: 'socialSecurityPdf', maxCount: 3 },
    { name: 'residentCardPdf', maxCount: 3 },
    { name: 'workAuthorizationPdf', maxCount: 3 },
  ]);

  return upload;
};

export default fileUploadHandler;
