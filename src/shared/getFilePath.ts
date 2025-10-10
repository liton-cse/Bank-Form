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

//single file
export const getSingleFilePath = (files: any, folderName: IFolderName) => {
  const fileField = files && files[folderName];
  if (fileField && Array.isArray(fileField) && fileField.length > 0) {
    return `/${folderName}/${fileField[0].filename}`;
  }

  return undefined;
};

//multiple files
export const getMultipleFilesPath = (files: any, folderName: IFolderName) => {
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
    'directDepositImage',
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

// Helper: Rebuild nested form-data keys like generalInfo[firstName] → bodyData.generalInfo.firstName
export const parseNestedFormData = (body: Record<string, any>) => {
  const result: Record<string, any> = {};
  for (const key in body) {
    const value = body[key];
    const keys = key.split(/\[|\]/).filter(Boolean); // Split on brackets, remove empty
    let current = result;
    keys.forEach((k, i) => {
      if (i === keys.length - 1) {
        current[k] = value;
      } else {
        current[k] = current[k] || {};
        current = current[k];
      }
    });
  }
  return result;
};

// utils/flattenObject.ts for Intern Service.
export const flattenObject = (obj: any, parentKey = '', res: any = {}) => {
  for (let key in obj) {
    const propName = parentKey ? `${parentKey}.${key}` : key;
    if (
      typeof obj[key] === 'object' &&
      obj[key] !== null &&
      !Array.isArray(obj[key])
    ) {
      flattenObject(obj[key], propName, res);
    } else {
      res[propName] = obj[key];
    }
  }
  return res;
};

// Update Intern by ID
// ✅ Update
export const toPlainObject = (obj: any): any => {
  if (obj === null || typeof obj !== 'object') return obj;

  // ✅ Explicitly give an index signature
  const plain: Record<string, any> = Array.isArray(obj) ? [] : {};

  for (const key of Object.keys(obj)) {
    plain[key] = toPlainObject(obj[key]);
  }

  return plain;
};
