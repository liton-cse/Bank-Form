import { Request, Response, NextFunction } from 'express';
import { InternService } from './internService';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import {
  getAllUploadedFiles,
  parseNestedFormData,
} from '../../../shared/getFilePath';
import { IFolderName } from '../../../shared/getFilePath';
import { IInternFormData } from './interface';
import ApiError from '../../../errors/ApiError';

// Create Intern
const createIntern = catchAsync(async (req: Request, res: Response) => {
  // Parse nested fields correctly
  const bodyData = parseNestedFormData(req.body);

  const uploadedFilesRaw = getAllUploadedFiles(req.files);
  const uploadedFiles = Object.fromEntries(
    Object.entries(uploadedFilesRaw).filter(([_, v]) => v !== undefined)
  ) as Record<IFolderName, string>;
  // // Helper to map uploaded files (image preferred, then pdf)
  const mapFilesToTarget = (
    target: Record<string, any>,
    mapping: Record<string, { image?: IFolderName; pdf?: IFolderName }>,
    uploadedFiles: Record<string, string>
  ) => {
    if (!target) return;

    for (const key in mapping) {
      const { image, pdf } = mapping[key];
      const filePath = uploadedFiles[image!] || uploadedFiles[pdf!];
      if (filePath) {
        target[key] = filePath;
      }
    }
  };

  // CitizenShip form
  if (bodyData.citizenShipForm) {
    mapFilesToTarget(
      bodyData.citizenShipForm,
      {
        photoID: { image: 'photoIdImage', pdf: 'photoIdPdf' },
        socialSecurityCard: {
          image: 'socialSecurityImage',
          pdf: 'socialSecurityPdf',
        },
        residentCard: { image: 'residentCardImage', pdf: 'residentCardPdf' },
        workAuthorizationDocument: {
          image: 'workAuthorizationImage',
          pdf: 'workAuthorizationPdf',
        },
      },
      uploadedFiles
    );
  }

  // Bank form
  if (bodyData.bankForm) {
    mapFilesToTarget(
      bodyData.bankForm,
      {
        accountFile: { image: 'directDepositImage', pdf: 'directDepositPdf' },
        signature: { image: 'employeeSignature2' },
      },
      uploadedFiles
    );
  }

  // I9 form
  if (bodyData.i9Form) {
    mapFilesToTarget(
      bodyData.i9Form,
      {
        signature: { image: 'employeeSignature3' },
      },
      uploadedFiles
    );
  }

  // W4 form
  if (bodyData.w4Form) {
    mapFilesToTarget(
      bodyData.w4Form,
      {
        signature: { image: 'employeeSignature4' },
      },
      uploadedFiles
    );
  }

  // General Info
  if (bodyData.generalInfo) {
    mapFilesToTarget(
      bodyData.generalInfo,
      {
        signature: { image: 'employeeSignature1' },
      },
      uploadedFiles
    );
  }

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
  const intern = await InternService.createIntern(bodyData as IInternFormData);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Intern created successfully',
    data: intern,
  });
});

// Get all Interns
const getAllInterns = catchAsync(async (req: Request, res: Response) => {
  const interns = await InternService.getAllIntern();

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
const updateIntern = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  // Parse nested form fields
  const bodyData = parseNestedFormData(req.body);
  const uploadedFilesRaw = getAllUploadedFiles(req.files);
  const uploadedFiles = Object.fromEntries(
    Object.entries(uploadedFilesRaw).filter(([_, v]) => v !== undefined)
  ) as Record<IFolderName, string>;

  // Update intern in DB
  const updatedIntern = await InternService.updateIntern(
    id,
    bodyData as Partial<IInternFormData>,
    uploadedFiles
  );
  if (!updatedIntern) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "Intern Form Data doesn't update successfully!"
    );
  }
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Intern updated successfully',
    data: updatedIntern,
  });
});

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

export const InternController = {
  createIntern,
  getAllInterns,
  getIntern,
  updateIntern,
  deleteIntern,
};
