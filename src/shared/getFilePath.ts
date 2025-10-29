// import { Types } from "mongoose";
// import { BankAccountType, CitizenDocuments, DepositType, EmploymentType, I9Status, ICitizenInfo, ICitizenship, INonCitizenOtherInfo, IPermanentInfo, ITemporaryFormData, IW4Status, OvertimePreference, ResidentDocuments, WorkAuthDocuments } from "../app/modules/temporaryForm/temporary.interface";

// export type IFolderName =
//   | 'image'
//   | 'employeeSignature1'
//   | 'employeeSignature2'
//   | 'employeeSignature3'
//   | 'employeeSignature4'
//   | 'employeeSignature5'
//   | 'employeeSignature6'
//   | 'employeeSignature7'
//   | 'employeeSignature8'
//   | 'employeeSignature9'
//   | 'supervisorSignature'
//   | 'employeeSignature10'
//   | 'timeSheetPdfOrImage'
//   | 'directDepositImage'
//   | 'photoIdImage'
//   | 'socialSecurityImage'
//   | 'residentCardImage'
//   | 'workAuthorizationImage'
//   | 'directDepositPdf'
//   | 'photoIdPdf'
//   | 'socialSecurityPdf'
//   | 'residentCardPdf'
//   | 'workAuthorizationPdf';

//single file
// export const getSingleFilePath = (files: any, folderName: IFolderName) => {
//   const fileField = files && files[folderName];
//   if (fileField && Array.isArray(fileField) && fileField.length > 0) {
//     return `/${folderName}/${fileField[0].filename}`;
//   }

//   return undefined;
// };

// //multiple files
export const getMultipleFilesPaths = (files: any, folderName: IFolderName) => {
  const folderFiles = files && files[folderName];
  if (folderFiles) {
    if (Array.isArray(folderFiles)) {
      return folderFiles.map((file: any) => `/${folderName}/${file.filename}`);
    }
  }

  return undefined;
};

export const getAllUploadedFiles = (
  files: any
): Record<IFolderName, string | undefined> => {
  // List of all folder names
  const folderNames: IFolderName[] = [
    'employeeSignature1',
    'employeeSignature2',
    'employeeSignature3',
    'employeeSignature4',
    'employeeSignature5',
    'employeeSignature6',
    'employeeSignature7',
    'employeeSignature8',
    'employeeSignature9',
    'employeeSignature10',
    'supervisorSignature',
    'directDepositImage',
    'timeSheetPdfOrImage',
    'photoIdImage',
    'socialSecurityImage',
    'residentCardImage',
    'workAuthorizationImage',
    'directDepositPdf',
    'photoIdPdf',
    'socialSecurityPdf',
    'residentCardPdf',
    'workAuthorizationPdf',
  ];

  // Initialize result with all keys undefined
  const result: Record<IFolderName, string | undefined> = {} as Record<
    IFolderName,
    string | undefined
  >;
  folderNames.forEach(name => (result[name] = undefined));

  if (!files) return result;

  // Fill in uploaded files
  Object.keys(files).forEach(fieldName => {
    const fileArray = files[fieldName];
    if (fileArray && Array.isArray(fileArray) && fileArray.length > 0) {
      result[
        fieldName as IFolderName
      ] = `/${fieldName}/${fileArray[0].filename}`;
    }
  });

  return result;
};

import { Types } from 'mongoose';
import {
  ITemporaryFormData,
  IGeneralInfo,
  IEmployeeInfo,
  IDrivingLicenceInfo,
  IApplicantCartification,
  IApplicantionCarification,
  IAccidentProcedure,
  ISubmittalpolicy,
  IDirectDepositInfo,
  I9Info,
  IW4Info,
  ICitizenShip,
  I9Status,
  ICitizenship,
  EmploymentType,
  OvertimePreference,
  GraduationStatus,
  BankAccountType,
  DepositType,
  IW4Status,
  // IFile, // If already defined elsewhere, adjust import
  // IFiles,
  IPermanentInfo,
  INonCitizenOtherInfo,
  ICitizenInfo,
  ResidentDocuments,
  WorkAuthDocuments,
  CitizenDocuments, // If already defined elsewhere, adjust import
} from '../app/modules/temporaryForm/temporary.interface'; // Adjust the import path as needed

export type IFolderName =
  | 'image'
  | 'employeeSignature1'
  | 'employeeSignature2'
  | 'employeeSignature3'
  | 'employeeSignature4'
  | 'employeeSignature5'
  | 'employeeSignature6'
  | 'employeeSignature7'
  | 'employeeSignature8'
  | 'employeeSignature9'
  | 'employeeSignature10'
  | 'supervisorSignature'
  | 'timeSheetPdfOrImage'
  | 'directDepositImage'
  | 'photoIdImage'
  | 'socialSecurityImage'
  | 'residentCardImage'
  | 'workAuthorizationImage'
  | 'directDepositPdf'
  | 'photoIdPdf'
  | 'socialSecurityPdf'
  | 'residentCardPdf'
  | 'workAuthorizationPdf';

// Define the structure of a file object
interface IFile {
  filename: string;
  [key: string]: any; // Allow additional properties (e.g., from multer)
}

// Define the type for the files object
interface IFiles {
  [key: string]: string | undefined;
}

// Single file path extraction
export const getSingleFilePath = (
  files: IFiles,
  folderName: IFolderName
): string | undefined => {
  const fileField = files && files[folderName];
  if (fileField && Array.isArray(fileField) && fileField.length > 0) {
    return `/${folderName}/${fileField[0].filename}`;
  }
  return undefined;
};

// Multiple file paths extraction
export const getMultipleFilesPath = (
  files: IFiles,
  folderName: IFolderName
): string[] | undefined => {
  const folderFiles = files && files[folderName];
  if (folderFiles && Array.isArray(folderFiles)) {
    return folderFiles.map((file: IFile) => `/${folderName}/${file.filename}`);
  }
  return undefined;
};

// Get all uploaded files
// export const getAllUploadedFiles = (
//   files: IFiles = {}
// ): Record<IFolderName, string | undefined> => {
//   const folderNames: IFolderName[] = [
//     'employeeSignature1',
//     'employeeSignature2',
//     'employeeSignature3',
//     'employeeSignature4',
//     'employeeSignature5',
//     'employeeSignature6',
//     'employeeSignature7',
//     'employeeSignature8',
//     'employeeSignature9',
//     'employeeSignature10',
//     'supervisorSignature',
//     'directDepositImage',
//     'timeSheetPdfOrImage',
//     'photoIdImage',
//     'socialSecurityImage',
//     'residentCardImage',
//     'workAuthorizationImage',
//     'directDepositPdf',
//     'photoIdPdf',
//     'socialSecurityPdf',
//     'residentCardPdf',
//     'workAuthorizationPdf',
//   ];

//   const result: Record<IFolderName, string | undefined> = {} as Record<
//     IFolderName,
//     string | undefined
//   >;
//   folderNames.forEach(name => (result[name] = undefined));

//   Object.keys(files).forEach(fieldName => {
//     const fileArray = files[fieldName];
//     if (fileArray && Array.isArray(fileArray) && fileArray.length > 0) {
//       result[
//         fieldName as IFolderName
//       ] = `/${fieldName}/${fileArray[0].filename}`;
//     }
//   });

//   return result;
// };

// Parse nested form data
export const parseNestedFormData = (
  flatData: Record<string, any>,
  files: IFiles
): ITemporaryFormData => {
  const result: Record<string, any> = {};

  // Helper function to set nested value
  const setNestedValue = (
    obj: Record<string, any>,
    keys: string[],
    value: any
  ) => {
    let current = obj;
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (key.includes('[')) {
        const [arrayKey, indexStr] = key.split(/\[(\d+)\]/).filter(Boolean);
        current[arrayKey] = current[arrayKey] || [];
        const index = parseInt(indexStr, 10);
        current[arrayKey][index] = current[arrayKey][index] || {};
        current = current[arrayKey][index];
      } else {
        current[key] = current[key] || {};
        current = current[key];
      }
    }
    const lastKey = keys[keys.length - 1];
    if (lastKey.includes('[')) {
      const [arrayKey, indexStr] = lastKey.split(/\[(\d+)\]/).filter(Boolean);
      current[arrayKey] = current[arrayKey] || [];
      const index = parseInt(indexStr, 10);
      current[arrayKey][index] = value;
    } else {
      current[lastKey] = value;
    }
  };

  // Parse flat data into nested structure
  for (const [key, value] of Object.entries(flatData)) {
    const keys = key.split('.');
    setNestedValue(result, keys, value);
  }

  // Initialize uploadedFiles with all IFolderName keys set to undefined
  // const uploadedFiles: Record<IFolderName, string | undefined> =
  //   getAllUploadedFiles(files);
  // console.log(uploadedFiles);
  const uploadedFiles = files;
  console.log(uploadedFiles);
  // Initialize the result with the structure of ITemporaryFormData
  const parsedData: ITemporaryFormData = {
    userId: new Types.ObjectId(flatData.userId || undefined),
    generalInfo: {
      firstName: result.generalInfo?.firstName || '',
      middleName: result.generalInfo?.middleName || '',
      lastName: result.generalInfo?.lastName || '',
      ssn: result.generalInfo?.ssn || '',
      dateOfBirth: result.generalInfo?.dateOfBirth || '',
      applicationDate: result.generalInfo?.applicationDate || '',
      email: result.generalInfo?.email || '',
      telephoneNumber: result.generalInfo?.telephoneNumber || '',
      address: result.generalInfo?.address || '',
      emergencyContact: {
        name: result.generalInfo?.emergencyContact?.name || '',
        relationship: result.generalInfo?.emergencyContact?.relationship || '',
        phone: result.generalInfo?.emergencyContact?.phone || '',
      },
      desiredEmploymentType:
        (result.generalInfo?.desiredEmploymentType as EmploymentType) ||
        undefined,
      desiredSalary: result.generalInfo?.desiredSalary || undefined,
      hourlyRate: result.generalInfo?.hourlyRate || undefined,
      appliedPosition: result.generalInfo?.appliedPosition || undefined,
      department: result.generalInfo?.department || undefined,
      overtime:
        (result.generalInfo?.overtime as OvertimePreference) || undefined,
      startDate: result.generalInfo?.startDate || undefined,
      previouslyApplied:
        result.generalInfo?.previouslyApplied === 'true' ||
        result.generalInfo?.previouslyApplied === true,
      previousApplicationDate:
        result.generalInfo?.previousApplicationDate || undefined,
      previouslyEmployed:
        result.generalInfo?.previouslyEmployed === 'true' ||
        result.generalInfo?.previouslyEmployed === true,
      previousSeparationReason:
        result.generalInfo?.previousSeparationReason || undefined,
      education: result.generalInfo?.education || [
        {
          level: 'High School',
          name: '',
          major: '',
          graduationStatus: undefined,
          yearsCompleted: undefined,
          honorsReceived: '',
        },
        {
          level: 'College',
          name: '',
          major: '',
          graduationStatus: undefined,
          yearsCompleted: undefined,
          honorsReceived: '',
        },
        {
          level: 'Graduate / Professional',
          name: '',
          major: '',
          graduationStatus: undefined,
          yearsCompleted: undefined,
          honorsReceived: '',
        },
        {
          level: 'Trade / Correspondence',
          name: '',
          major: '',
          graduationStatus: undefined,
          yearsCompleted: undefined,
          honorsReceived: '',
        },
      ],
      specialSkills: result.generalInfo?.specialSkills || '',
      signature: uploadedFiles.employeeSignature1 || '',
    },
    employeeInfo: {
      employee1: {
        name: result.employeeInfo?.employee1?.name || '',
        address: result.employeeInfo?.employee1?.address || '',
        telephone: result.employeeInfo?.employee1?.telephone || '',
        dateEmployeeFrom: result.employeeInfo?.employee1?.dateEmployeeFrom
          ? new Date(result.employeeInfo.employee1.dateEmployeeFrom)
          : new Date(),
        dateEmployeeTo: result.employeeInfo?.employee1?.dateEmployeeTo
          ? new Date(result.employeeInfo.employee1.dateEmployeeTo)
          : new Date(),
        jobTitle: result.employeeInfo?.employee1?.jobTitle || '',
        duties: result.employeeInfo?.employee1?.duties || '',
        supervisorName: result.employeeInfo?.employee1?.supervisorName || '',
        MayWeContact:
          result.employeeInfo?.employee1?.MayWeContact === 'true' ||
          result.employeeInfo?.employee1?.MayWeContact === true,
        wagesStart: result.employeeInfo?.employee1?.wagesStart || '',
        final: result.employeeInfo?.employee1?.final || '',
        reasonForLeaving:
          result.employeeInfo?.employee1?.reasonForLeaving || '',
        terminationReason:
          result.employeeInfo?.employee1?.terminationReason || '',
        disciplinaryAction:
          result.employeeInfo?.employee1?.disciplinaryAction || '',
        noticePeriod: result.employeeInfo?.employee1?.noticePeriod || '',
      },
      employee2: {
        name: result.employeeInfo?.employee2?.name || '',
        address: result.employeeInfo?.employee2?.address || '',
        telephone: result.employeeInfo?.employee2?.telephone || '',
        dateEmployeeFrom: result.employeeInfo?.employee2?.dateEmployeeFrom
          ? new Date(result.employeeInfo.employee2.dateEmployeeFrom)
          : new Date(),
        dateEmployeeTo: result.employeeInfo?.employee2?.dateEmployeeTo
          ? new Date(result.employeeInfo.employee2.dateEmployeeTo)
          : new Date(),
        jobTitle: result.employeeInfo?.employee2?.jobTitle || '',
        duties: result.employeeInfo?.employee2?.duties || '',
        supervisorName: result.employeeInfo?.employee2?.supervisorName || '',
        MayWeContact:
          result.employeeInfo?.employee2?.MayWeContact === 'true' ||
          result.employeeInfo?.employee2?.MayWeContact === true,
        wagesStart: result.employeeInfo?.employee2?.wagesStart || '',
        final: result.employeeInfo?.employee2?.final || '',
        reasonForLeaving:
          result.employeeInfo?.employee2?.reasonForLeaving || '',
        terminationReason:
          result.employeeInfo?.employee2?.terminationReason || '',
        disciplinaryAction:
          result.employeeInfo?.employee2?.disciplinaryAction || '',
        noticePeriod: result.employeeInfo?.employee2?.noticePeriod || '',
      },
      terminationInfo: {
        terminationStatus:
          result.employeeInfo?.terminationInfo?.terminationStatus || 'No',
        terminationCount: result.employeeInfo?.terminationInfo?.terminationCount
          ? parseInt(result.employeeInfo.terminationInfo.terminationCount, 10)
          : undefined,
      },
      manualAgreementTermination: {
        terminatedByManualAgreement:
          result.employeeInfo?.manualAgreementTermination
            ?.terminatedByManualAgreement || 'No',
        terminationCount: result.employeeInfo?.manualAgreementTermination
          ?.terminationCount
          ? parseInt(
              result.employeeInfo.manualAgreementTermination.terminationCount,
              10
            )
          : undefined,
      },
      resignationInsteadOfTermination: {
        resignedInsteadOfTerminated:
          result.employeeInfo?.resignationInsteadOfTermination
            ?.resignedInsteadOfTerminated || 'No',
        resignationCount: result.employeeInfo?.resignationInsteadOfTermination
          ?.resignationCount
          ? parseInt(
              result.employeeInfo.resignationInsteadOfTermination
                .resignationCount,
              10
            )
          : undefined,
      },
      terminationDetailsOfEmployee: result.employeeInfo
        ?.terminationDetailsOfEmployee || [
        {
          name: '',
          position: '',
          company: '',
          telephone: '',
          occupation: '',
          bestTimeToCall: '',
          workRelation: '',
          NoOfYearKnown: '',
        },
      ],
    },
    drivingLicenceInfo: {
      validDriverLicense: {
        hasDriverLicense:
          result.drivingLicenceInfo?.validDriverLicense?.hasDriverLicense ||
          'No',
        licenseNo: result.drivingLicenceInfo?.validDriverLicense?.licenseNo
          ? parseInt(result.drivingLicenceInfo.validDriverLicense.licenseNo, 10)
          : 0,
        state: result.drivingLicenceInfo?.validDriverLicense?.state || '',
        expirationDate: result.drivingLicenceInfo?.validDriverLicense
          ?.expirationDate
          ? new Date(
              result.drivingLicenceInfo.validDriverLicense.expirationDate
            )
          : new Date(),
        reason:
          result.drivingLicenceInfo?.validDriverLicense?.reason || undefined,
      },
      licenseSuspensionInfo: {
        licenseSuspendedOrRevoked:
          result.drivingLicenceInfo?.licenseSuspensionInfo
            ?.licenseSuspendedOrRevoked || 'No',
        reason:
          result.drivingLicenceInfo?.licenseSuspensionInfo?.reason || undefined,
      },
      personalAutoInsurance: {
        hasPersonalAutoInsurance:
          result.drivingLicenceInfo?.personalAutoInsurance
            ?.hasPersonalAutoInsurance || 'No',
        reason:
          result.drivingLicenceInfo?.personalAutoInsurance?.reason || undefined,
      },
      personalAutoInsuranceHistory: {
        insuranceDeniedOrTerminated:
          result.drivingLicenceInfo?.personalAutoInsuranceHistory
            ?.insuranceDeniedOrTerminated || 'No',
        reason:
          result.drivingLicenceInfo?.personalAutoInsuranceHistory?.reason ||
          undefined,
      },
      movingTrafficViolation: result.drivingLicenceInfo
        ?.movingTrafficViolation || [
        {
          offense: '',
          date: new Date(),
          location: '',
          comment: '',
        },
      ],
    },
    applicantCartification: {
      check:
        result.applicantCartification?.check === 'true' ||
        result.applicantCartification?.check === true,
      signature: uploadedFiles.employeeSignature2 || '',
      signatureDate: result.applicantCartification?.signatureDate
        ? new Date(result.applicantCartification.signatureDate)
        : new Date(),
    },
    applicationCarification: {
      check:
        result.applicationCarification?.check === 'true' ||
        result.applicationCarification?.check === true,
      signature: uploadedFiles.employeeSignature3 || '',
      signatureDate: result.applicationCarification?.signatureDate
        ? new Date(result.applicationCarification.signatureDate)
        : undefined,
    },
    accidentProcedure: {
      check:
        result.accidentProcedure?.check === 'true' ||
        result.accidentProcedure?.check === true,
      signature: uploadedFiles.employeeSignature4 || '',
      signatureDate: result.accidentProcedure?.signatureDate
        ? new Date(result.accidentProcedure.signatureDate)
        : new Date(),
    },
    submittalPolicy: {
      submittalPolicyDirectUnderstand: {
        check:
          result.submittalPolicy?.submittalPolicyDirectUnderstand?.check ===
            'true' ||
          result.submittalPolicy?.submittalPolicyDirectUnderstand?.check ===
            true,
        name:
          result.submittalPolicy?.submittalPolicyDirectUnderstand?.name || '',
      },
      submittalPolicyExplainUnderstand: {
        check:
          result.submittalPolicy?.submittalPolicyExplainUnderstand?.check ===
            'true' ||
          result.submittalPolicy?.submittalPolicyExplainUnderstand?.check ===
            true,
        name:
          result.submittalPolicy?.submittalPolicyExplainUnderstand?.name || '',
      },
      check:
        result.submittalPolicy?.check === 'true' ||
        result.submittalPolicy?.check === true,
      signature: uploadedFiles.employeeSignature5 || '',
    },
    bankForm: {
      name: result.bankForm?.name || '',
      ssn: result.bankForm?.ssn || '',
      checkingAccount: {
        bankName: result.bankForm?.checkingAccount?.bankName || '',
        state: result.bankForm?.checkingAccount?.state || undefined,
        transitNo: result.bankForm?.checkingAccount?.transitNo
          ? parseInt(result.bankForm.checkingAccount.transitNo, 10)
          : 0,
        accountNo: result.bankForm?.checkingAccount?.accountNo
          ? parseInt(result.bankForm.checkingAccount.accountNo, 10)
          : 0,
        depositType:
          (result.bankForm?.checkingAccount?.depositType as DepositType) ||
          undefined,
        depositPercentage: result.bankForm?.checkingAccount?.depositPercentage
          ? parseInt(result.bankForm.checkingAccount.depositPercentage, 10)
          : 0,
        accountType: 'Checking' as BankAccountType,
      },
      savingsAccount: result.bankForm?.savingsAccount
        ? {
            bankName: result.bankForm.savingsAccount.bankName || '',
            state: result.bankForm.savingsAccount.state || undefined,
            transitNo: result.bankForm.savingsAccount.transitNo
              ? parseInt(result.bankForm.savingsAccount.transitNo, 10)
              : 0,
            accountNo: result.bankForm.savingsAccount.accountNo
              ? parseInt(result.bankForm.savingsAccount.accountNo, 10)
              : 0,
            depositType:
              (result.bankForm.savingsAccount.depositType as DepositType) ||
              undefined,
            depositPercentage: result.bankForm.savingsAccount.depositPercentage
              ? parseInt(result.bankForm.savingsAccount.depositPercentage, 10)
              : 0,
            accountType: 'Savings' as BankAccountType,
          }
        : undefined,
      accountFile:
        uploadedFiles.directDepositImage ||
        uploadedFiles.directDepositPdf ||
        undefined,
      signature: uploadedFiles.employeeSignature6 || undefined,
      signatureDate: result.bankForm?.signatureDate || undefined,
    },
    i9Form: (() => {
      const baseI9 = {
        lastName: result.i9Form?.lastName || '',
        firstName: result.i9Form?.firstName || '',
        middleName: result.i9Form?.middleName || '',
        otherNames: result.i9Form?.otherNames || 'None',
        address: result.i9Form?.address || '',
        dateOfBirth: result.i9Form?.dateOfBirth || '',
        ssn: result.i9Form?.ssn || '',
        email: result.i9Form?.email || '',
        phone: result.i9Form?.phone || '',
        signature: uploadedFiles.employeeSignature7 || undefined,
        signatureDate: result.i9Form?.signatureDate || undefined,
      };

      const status = result.i9Form?.status as I9Status;
      if (status === I9Status.Permanent) {
        return {
          ...baseI9,
          status,
          uscisNumber: result.i9Form?.uscisNumber || '',
        } as IPermanentInfo;
      } else if (status === I9Status.NonCitizen_Other) {
        return {
          ...baseI9,
          status,
          uscisNumber: result.i9Form?.uscisNumber || '',
          admissionNumber: result.i9Form?.admissionNumber || '',
          foreignPassportNumber: result.i9Form?.foreignPassportNumber || '',
        } as INonCitizenOtherInfo;
      } else {
        return {
          ...baseI9,
          status: status || I9Status.Citizen,
        } as ICitizenInfo;
      }
    })(),
    w4Form: {
      firstName: result.w4Form?.firstName || '',
      middleName: result.w4Form?.middleName || '',
      lastName: result.w4Form?.lastName || '',
      ssn: result.w4Form?.ssn || '',
      address: result.w4Form?.address || '',
      maritalStatus: (result.w4Form?.maritalStatus as IW4Status) || 'single',
      acceptedTerms:
        result.w4Form?.acceptedTerms === 'true' ||
        result.w4Form?.acceptedTerms === true,
      qualifyingChildrenNo: result.w4Form?.qualifyingChildrenNo
        ? parseInt(result.w4Form.qualifyingChildrenNo, 10)
        : 0,
      amount: result.w4Form?.amount ? parseInt(result.w4Form.amount, 10) : 0,
      childrenDepencyNo: result.w4Form?.childrenDepencyNo
        ? parseInt(result.w4Form.childrenDepencyNo, 10)
        : 0,
      TotalDependencyAmount: result.w4Form?.TotalDependencyAmount
        ? parseInt(result.w4Form.TotalDependencyAmount, 10)
        : 0,
      extraWithHoldingAmount: result.w4Form?.extraWithHoldingAmount
        ? parseInt(result.w4Form.extraWithHoldingAmount, 10)
        : 0,
      signature: uploadedFiles.employeeSignature8 || undefined,
      signatureDate: result.w4Form?.signatureDate || undefined,
    },
    citizenShipForm: (() => {
      const citizenshipStatus = result.citizenShipForm
        ?.citizenshipStatus as ICitizenship;
      if (citizenshipStatus === ICitizenship.Resident) {
        return {
          citizenshipStatus,
          photoID: uploadedFiles.photoIdImage || uploadedFiles.photoIdPdf || '',
          socialSecurityCard:
            uploadedFiles.socialSecurityImage ||
            uploadedFiles.socialSecurityPdf ||
            '',
          residentCard:
            uploadedFiles.residentCardImage ||
            uploadedFiles.residentCardPdf ||
            '',
        } as ResidentDocuments;
      } else if (citizenshipStatus === ICitizenship.WorkAuthorization) {
        return {
          citizenshipStatus,
          photoID: uploadedFiles.photoIdImage || uploadedFiles.photoIdPdf || '',
          socialSecurityCard:
            uploadedFiles.socialSecurityImage ||
            uploadedFiles.socialSecurityPdf ||
            '',
          workAuthorizationDocument:
            uploadedFiles.workAuthorizationImage ||
            uploadedFiles.workAuthorizationPdf ||
            '',
        } as WorkAuthDocuments;
      } else {
        return {
          citizenshipStatus: ICitizenship.Citizen,
          photoID: uploadedFiles.photoIdImage || uploadedFiles.photoIdPdf || '',
          socialSecurityCard:
            uploadedFiles.socialSecurityImage ||
            uploadedFiles.socialSecurityPdf ||
            '',
        } as CitizenDocuments;
      }
    })(),
  };

  return parsedData;
};
