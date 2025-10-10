import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { temporaryFormService } from './temporaryService';
import {
  getAllUploadedFiles,
  getSingleFilePath,
  IFolderName,
  parseNestedFormData,
} from '../../../shared/getFilePath';
import { ITemporaryFormData } from './temporary.interface';
import ApiError from '../../../errors/ApiError';

// ─── Create ───
const createForm = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // Parse nested fields correctly
    const image = getSingleFilePath(req.files, 'employeeSignature3');
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
          signature: { image: 'employeeSignature7' },
        },
        uploadedFiles
      );
    }

    // I9 form
    if (bodyData.i9Form) {
      mapFilesToTarget(
        bodyData.i9Form,
        {
          signature: { image: 'employeeSignature8' },
        },
        uploadedFiles
      );
    }

    // W4 form
    if (bodyData.w4Form) {
      mapFilesToTarget(
        bodyData.w4Form,
        {
          signature: { image: 'employeeSignature9' },
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
    //application Clarification
    if (bodyData.applicantCarification) {
      mapFilesToTarget(
        bodyData.applicantCarification,
        {
          signature: { image: 'employeeSignature2' },
        },
        uploadedFiles
      );
    }
    //subsity policy

    bodyData.substanceAbusepolicy = image;

    //accidentProcedure..
    if (bodyData.accidentProcedure) {
      mapFilesToTarget(
        bodyData.accidentProcedure,
        {
          signature: { image: 'employeeSignature4' },
        },
        uploadedFiles
      );
    }

    // submital policy..
    if (bodyData.submittalPolicy.submittalPolicyDirectUnderstand) {
      mapFilesToTarget(
        bodyData.submittalPolicy.submittalPolicyDirectUnderstand,
        {
          signature: { image: 'employeeSignature5' },
        },
        uploadedFiles
      );
    }
    if (bodyData.submittalPolicy.submittalPolicyExplainUnderstand) {
      mapFilesToTarget(
        bodyData.submittalPolicy.submittalPolicyExplainUnderstand,
        {
          signature: { image: 'employeeSignature6' },
        },
        uploadedFiles
      );
    }

    // Save intern
    if (
      !bodyData.generalInfo ||
      !bodyData.employeeInfo ||
      !bodyData.drivingLicenceInfo ||
      !bodyData.applicantCarification ||
      !bodyData.substanceAbusepolicy ||
      !bodyData.accidentProcedure ||
      !bodyData.submittalPolicy ||
      !bodyData.bankForm ||
      !bodyData.i9Form ||
      !bodyData.w4Form ||
      !bodyData.citizenShipForm
    ) {
      console.error('Invalid intern data:', bodyData);
      throw new Error('Invalid form submission');
    }
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

// ─── Get All ───
const getAllForms = catchAsync(async (req: Request, res: Response) => {
  const forms = await temporaryFormService.getAllForms();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'All forms retrieved successfully',
    data: forms,
  });
});

// ─── Get by ID ───
const getFormById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const form = await temporaryFormService.getFormById(id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Form retrieved successfully',
    data: form,
  });
});

// ─── Update ───
const updateForm = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  // Parse nested form fields
  const bodyData = parseNestedFormData(req.body);

  const uploadedFilesRaw = getAllUploadedFiles(req.files);
  const image = getSingleFilePath(req.files, 'employeeSignature3');
  const uploadedFiles = Object.fromEntries(
    Object.entries(uploadedFilesRaw).filter(([_, v]) => v !== undefined)
  ) as Record<IFolderName, string>;
  // Update intern in DB
  const updatedTemporary = await temporaryFormService.updateFormService(
    id,
    bodyData as Partial<ITemporaryFormData>,
    uploadedFiles,
    image
  );
  if (!updatedTemporary) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "Temporary Form Data doesn't update successfully!"
    );
  }

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Form updated successfully',
    data: updatedTemporary,
  });
});

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
  getFormById,
  updateForm,
  deleteForm,
};
