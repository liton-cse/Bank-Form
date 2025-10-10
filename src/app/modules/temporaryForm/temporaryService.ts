import { TemporaryFormModel } from './temporary.model';
import { ITemporaryFormData } from './temporary.interface'; // optional if you have your interfaces
import { flattenObject, IFolderName } from '../../../shared/getFilePath';

const createForm = async (data: ITemporaryFormData) => {
  const temporary = await TemporaryFormModel.create(data);
  return temporary;
};

// Get all forms
const getAllForms = async () => {
  return await TemporaryFormModel.find().sort({ createdAt: -1 });
};

// Get form by ID
const getFormById = async (id: string) => {
  const form = await TemporaryFormModel.findById(id);
  if (!form) throw new Error('Form not found');
  return form;
};

// Update form by ID
const updateFormService = async (
  id: string,
  bodyData: Partial<ITemporaryFormData>,
  uploadedFiles: Record<IFolderName, string>,
  image?: string | undefined
) => {
  const toPlainObject = (obj: any): any => {
    if (obj === null || typeof obj !== 'object') return obj;
    const plain: Record<string, any> = Array.isArray(obj) ? [] : {};
    for (const key of Object.keys(obj)) {
      plain[key] = toPlainObject(obj[key]);
    }
    return plain;
  };
  bodyData = toPlainObject(bodyData);

  // ✅ If no forms exist, initialize them to empty objects
  bodyData.citizenShipForm = bodyData.citizenShipForm || ({} as any);
  bodyData.bankForm = bodyData.bankForm || ({} as any);
  bodyData.i9Form = bodyData.i9Form || ({} as any);
  bodyData.w4Form = bodyData.w4Form || ({} as any);
  bodyData.generalInfo = bodyData.generalInfo || ({} as any);
  bodyData.employeeInfo = bodyData.employeeInfo || ({} as any);
  bodyData.applicantCarification =
    bodyData.applicantCarification || ({} as any);
  bodyData.drivingLicenceInfo = bodyData.drivingLicenceInfo || ({} as any);
  bodyData.accidentProcedure = bodyData.accidentProcedure || ({} as any);
  if (!bodyData.submittalPolicy) {
    bodyData.submittalPolicy = {
      submittalPolicyDirectUnderstand: {},
      submittalPolicyExplainUnderstand: {},
    } as any;
  }

  const mapFilesToTarget = (
    target: Record<string, any>,
    mapping: Record<string, { image?: IFolderName; pdf?: IFolderName }>
  ) => {
    for (const key in mapping) {
      const { image, pdf } = mapping[key];
      const imagePath = image ? uploadedFiles[image] : undefined;
      const pdfPath = pdf ? uploadedFiles[pdf] : undefined;
      if (imagePath) target[key] = imagePath;
      else if (pdfPath) target[key] = pdfPath;
    }
  };

  // ✅ Always run file mapping (even if the form wasn’t sent)
  if (bodyData.citizenShipForm) {
    mapFilesToTarget(bodyData.citizenShipForm, {
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
    });
  }

  // Bank form
  if (bodyData.bankForm) {
    mapFilesToTarget(bodyData.bankForm, {
      accountFile: { image: 'directDepositImage', pdf: 'directDepositPdf' },
      signature: { image: 'employeeSignature7' },
    });
  }

  // I9 form
  if (bodyData.i9Form) {
    mapFilesToTarget(bodyData.i9Form, {
      signature: { image: 'employeeSignature8' },
    });
  }

  // W4 form
  if (bodyData.w4Form) {
    mapFilesToTarget(bodyData.w4Form, {
      signature: { image: 'employeeSignature9' },
    });
  }

  // General Info
  if (bodyData.generalInfo) {
    mapFilesToTarget(bodyData.generalInfo, {
      signature: { image: 'employeeSignature1' },
    });
  }
  //application Clarification
  if (bodyData.applicantCarification) {
    mapFilesToTarget(bodyData.applicantCarification, {
      signature: { image: 'employeeSignature2' },
    });
  }
  //subsity policy

  bodyData.substanceAbusepolicy = image;

  //accidentProcedure..
  if (bodyData.accidentProcedure) {
    mapFilesToTarget(bodyData.accidentProcedure, {
      signature: { image: 'employeeSignature4' },
    });
  }

  // submital policy..
  if (bodyData.submittalPolicy?.submittalPolicyDirectUnderstand) {
    mapFilesToTarget(bodyData.submittalPolicy.submittalPolicyDirectUnderstand, {
      signature: { image: 'employeeSignature5' },
    });
  }

  // ✅ Safely map signatures for submittalPolicyExplainUnderstand
  if (bodyData.submittalPolicy?.submittalPolicyExplainUnderstand) {
    mapFilesToTarget(
      bodyData.submittalPolicy.submittalPolicyExplainUnderstand,
      {
        signature: { image: 'employeeSignature6' },
      }
    );
  }

  // ✅ Flatten and update
  const flattened = flattenObject(bodyData);
  const updatedTemporary = await TemporaryFormModel.findByIdAndUpdate(
    id,
    { $set: flattened },
    { new: true, runValidators: true }
  );

  return updatedTemporary;
};

// Delete form by ID
const deleteForm = async (id: string) => {
  const deleted = await TemporaryFormModel.findByIdAndDelete(id);
  if (!deleted) throw new Error('Form not found or already deleted');
  return deleted;
};

export const temporaryFormService = {
  createForm,
  getAllForms,
  getFormById,
  updateFormService,
  deleteForm,
};
