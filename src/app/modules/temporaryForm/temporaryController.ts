import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { temporaryFormService } from './temporaryService';
import { getSingleFile } from '../../../shared/getFilePath';
import { ITemporaryFormData } from './temporary.interface';
import {
  convertToNestedObject,
  convertToNestedObjectOfTemp,
} from '../../../helpers/convertToNestedObject';
import qs from 'qs';

// ─── Create ───
const createForm = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.id;
    const nestedBody = convertToNestedObjectOfTemp(req.body);
    console.log(nestedBody);
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
    if (
      !bodyData.generalInfo ||
      !bodyData.employeeInfo ||
      !bodyData.drivingLicenceInfo ||
      !bodyData.applicantCartification ||
      !bodyData.applicationCarification ||
      !bodyData.accidentProcedure ||
      !bodyData.submittalPolicy ||
      !bodyData.bankForm ||
      !bodyData.i9Form ||
      !bodyData.w4Form ||
      !bodyData.citizenShipForm
    ) {
      console.error('Invalid Temporary data:', bodyData);
      throw new Error('Invalid form submission');
    }

    bodyData.userId = userId;
    const temporary = await temporaryFormService.createForm(
      bodyData as ITemporaryFormData
    );
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: 'Form created successfully',
      data: temporary,
    });
  }
);

// const createForm = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const userId = req.user.id;
//     const uploadedFilesRaw = getAllUploadedFiles(req.files);

//     const uploadedFiles = Object.fromEntries(
//       Object.entries(uploadedFilesRaw).filter(([_, v]) => v !== undefined)
//     ) as Record<IFolderName, string>;
//     console.log(uploadedFiles);
//     const bodyData = parseNestedFormData(req.body, uploadedFiles);
//     console.log(bodyData);
//     if (
//       !bodyData.generalInfo ||
//       !bodyData.employeeInfo ||
//       !bodyData.drivingLicenceInfo ||
//       !bodyData.applicantCartification ||
//       !bodyData.applicationCarification ||
//       !bodyData.accidentProcedure ||
//       !bodyData.submittalPolicy ||
//       !bodyData.bankForm ||
//       !bodyData.i9Form ||
//       !bodyData.w4Form ||
//       !bodyData.citizenShipForm
//     ) {
//       console.error('Invalid Temporary data:', bodyData);
//       throw new Error('Invalid form submission');
//     }

//     bodyData.userId = userId;
//     const temporary = await temporaryFormService.createForm(
//       bodyData as ITemporaryFormData
//     );
//     sendResponse(res, {
//       success: true,
//       statusCode: StatusCodes.CREATED,
//       message: 'Form created successfully',
//       data: temporary,
//     });
//   }
// );

// ─── Get All ───
const getAllForms = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;
  const forms = await temporaryFormService.getAllForms(userId);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'All forms retrieved successfully',
    data: forms,
  });
});

// ─── Get by ID ───
// const getFormById = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const userId = req.user.id;
//   const form = await temporaryFormService.getFormById(id, userId);
//   sendResponse(res, {
//     success: true,
//     statusCode: StatusCodes.OK,
//     message: 'Form retrieved successfully',
//     data: form,
//   });
// });

// ─── Update ───
// const updateForm = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   // Parse nested form fields
//   const bodyData = parseNestedFormData(req.body);

//   const uploadedFilesRaw = getAllUploadedFiles(req.files);
//   const image = getSingleFilePath(req.files, 'employeeSignature3');
//   const uploadedFiles = Object.fromEntries(
//     Object.entries(uploadedFilesRaw).filter(([_, v]) => v !== undefined)
//   ) as Record<IFolderName, string>;
//   // Update intern in DB
//   const updatedTemporary = await temporaryFormService.updateFormService(
//     id,
//     bodyData as Partial<ITemporaryFormData>,
//     uploadedFiles,
//     image
//   );
//   if (!updatedTemporary) {
//     throw new ApiError(
//       StatusCodes.BAD_REQUEST,
//       "Temporary Form Data doesn't update successfully!"
//     );
//   }

//   sendResponse(res, {
//     success: true,
//     statusCode: StatusCodes.OK,
//     message: 'Form updated successfully',
//     data: updatedTemporary,
//   });
// });

// ─── Delete ───
const deleteForm = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = await temporaryFormService.deleteForm(id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Form deleted successfully',
    data: deleted,
  });
});

export const temporaryFormController = {
  createForm,
  getAllForms,
  // getFormById,
  // updateForm,
  deleteForm,
};
