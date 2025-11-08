import { Request, Response, NextFunction } from 'express';
import { InternService } from './internService';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { getSingleFile } from '../../../shared/getFilePath';
import { IInternFormData } from './interface';
import { convertToNestedObject } from '../../../helpers/convertToNestedObject';

// Create Intern

const createIntern = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;
  const nestedBody = convertToNestedObject(req.body);
  const signature = getSingleFile(req.files, 'signature');
  const accountFile = getSingleFile(req.files, 'accountFile');
  const residentCard = getSingleFile(req.files, 'residentCard');
  const socialSecurityCard = getSingleFile(req.files, 'socialSecurityCard');
  const photoId = getSingleFile(req.files, 'photoId');
  const workAuthorizationDocument = getSingleFile(
    req.files,
    'workAuthorizationDocument'
  );

  const bodyData: any = { ...nestedBody };

  if (signature) bodyData.signature = signature;
  if (accountFile) bodyData.accountFile = accountFile;
  if (residentCard) bodyData.residentCard = residentCard;
  if (photoId) bodyData.photoId = photoId;
  if (socialSecurityCard) bodyData.socialSecurityCard = socialSecurityCard;
  if (workAuthorizationDocument)
    bodyData.workAuthorizationDocument = workAuthorizationDocument;

  // Save intern
  if (
    !bodyData.generalInfo ||
    !bodyData.bankForm ||
    !bodyData.i9Form ||
    !bodyData.w4Form ||
    !bodyData.citizenShipForm
  ) {
    console.error('Invalid intern data:', bodyData);
    throw new Error('Invalid form submission');
  }
  bodyData.userId = userId;
  const intern = await InternService.createIntern(bodyData as IInternFormData);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Intern created successfully',
    data: intern,
  });
});

const getAllInterns = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;

  const interns = await InternService.getAllIntern(userId);
  console.log(interns);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Interns fetched successfully',
    data: interns,
  });
});

// Get Intern by ID
const getIntern = catchAsync(async (req: Request, res: Response) => {
  const intern = await InternService.getInternById(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Intern fetched successfully',
    data: intern,
  });
});

// Update Intern
// const updateIntern = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   // Parse nested form fields
//   const bodyData = parseNestedFormData(req.body);
//   const uploadedFilesRaw = getAllUploadedFiles(req.files);
//   const uploadedFiles = Object.fromEntries(
//     Object.entries(uploadedFilesRaw).filter(([_, v]) => v !== undefined)
//   ) as Record<IFolderName, string>;

//   // Update intern in DB
//   const updatedIntern = await InternService.updateIntern(
//     id,
//     bodyData as Partial<IInternFormData>,
//     uploadedFiles
//   );
//   if (!updatedIntern) {
//     throw new ApiError(
//       StatusCodes.BAD_REQUEST,
//       "Intern Form Data doesn't update successfully!"
//     );
//   }
//   sendResponse(res, {
//     success: true,
//     statusCode: StatusCodes.OK,
//     message: 'Intern updated successfully',
//     data: updatedIntern,
//   });
// });

// Delete Intern
const deleteIntern = catchAsync(async (req: Request, res: Response) => {
  const intern = await InternService.deleteIntern(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Intern deleted successfully',
    data: intern,
  });
});

const sendMailToAdmin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    // Check if file exists
    if (!req.file) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'No PDF file uploaded',
      });
    }

    const pdfBuffer = req.file.buffer;

    try {
      const result = await InternService.SendPdfByMail(email, pdfBuffer);
      sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        data: 'PDF sent to admin successfully',
      });
    } catch (err) {
      next(err); // pass the error to global error handler
    }
  }
);

export const InternController = {
  createIntern,
  getAllInterns,
  getIntern,
  // updateIntern,
  deleteIntern,
  sendMailToAdmin,
};
