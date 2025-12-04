interface EmployeeData {
  createdAt?: string;
  logoUrl?: string;
  signatureUrl?: string;
  newPayrollDeposit?: boolean;
  changeDepositInfo?: boolean;
  revokeAuthorization?: boolean;
  generalInfo?: {
    firstName?: string;
    lastName?: string;
    middleName?: string;
    ssn?: string;
    dateOfBirth?: string;
    telephoneNumber?: string;
    email?: string;
    address?: string;
    emergencyContact?: {
      name?: string;
      relationship?: string;
      phone?: string;
    };
    appliedPosition?: string;
    department?: string;
    desiredSalary?: string | number;
    hourlyRate?: string | number;
    overtime?: string;
    startDate?: string;
    previouslyApplied?: boolean;
    previousApplicationDate?: string;
    previouslyEmployed?: boolean;
    previousSeparationReason?: string;
    education?: {
      major?: string;
      graduationStatus?: string;
      yearsCompleted?: string | number;
      honorsReceived?: boolean | string;
    };
  };
  bankForm?: {
    name?: string;
    ssn?: string;
    checkingAccount?: {
      bankName?: string;
      state?: string;
      depositPercentage?: number;
      transitNo?: string;
      accountNo?: string;
    };
    savingsAccount?: {
      bankName?: string;
      state?: string;
      depositPercentage?: number;
      transitNo?: string;
      accountNo?: string;
    };
  };
  i9Form?: {
    firstName?: string;
    lastName?: string;
    middleName?: string;
    otherNames?: string;
    address?: string;
    dateOfBirth?: string;
    ssn?: string;
    email?: string;
    phone?: string;
    status?: string;
    uscisNumber?: string;
    admissionNumber?: string;
    foreignPassportNumber?: string;
  };
  w4Form?: {
    firstName?: string;
    lastName?: string;
    middleName?: string;
    ssn?: string;
    address?: string;
    filingStatus?: string;
    childrenNo?: number;
    childrenDepencyNo?: number;
    TotalDependencyAmount?: number;
    withHoldAmount?: number;
    deductedAmount?: string | number;
    extraWithHoldingAmount?: number;
  };
  signature?: string;
  accountFile?: string;
}

const formatDate = (isoDate: any): string => {
  if (!isoDate) return new Date().toLocaleDateString('en-GB');
  try {
    const date = new Date(isoDate);
    return isNaN(date.getTime())
      ? new Date().toLocaleDateString('en-GB')
      : date.toLocaleDateString('en-GB');
  } catch {
    return new Date().toLocaleDateString('en-GB');
  }
};

const sanitize = (value: any): string => {
  if (value === null || value === undefined) return '';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};


export const generateHTMLTemplate = (employeeData: EmployeeData): string => {
  if (!employeeData) {
    throw new Error('Employee data is required');
  }

  const formattedDate = formatDate(employeeData.createdAt);

  const get = (path: string, defaultVal: any = ''): string => {
    try {
      const value = path
        .split('.')
        .reduce((obj: any, key) => obj?.[key], employeeData);
      return value !== undefined && value !== null
        ? sanitize(String(value))
        : String(defaultVal);
    } catch {
      return String(defaultVal);
    }
  };

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Application Form</title>
    <style>
      /* Base Styles */
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: Arial, sans-serif;
        font-size: 12px;
        line-height: 1.3;
        margin: 0;
        padding: 0;
        color: #000;
      }

      /* Page Management */
      .page {
        page-break-after: always;
        padding: 1rem;
        min-height: 29.7cm;
        position: relative;
      }

      .page:last-child {
        page-break-after: auto;
      }

      /* Layout */
      .flex {
        display: flex;
      }

      .justify-between {
        justify-content: space-between;
      }

      .items-center {
        align-items: center;
      }

      .gap-1 {
        gap: 0.25rem;
      }

      .gap-2 {
        gap: 0.5rem;
      }

      .gap-3 {
        gap: 0.75rem;
      }

      /* Typography */
      .font-bold {
        font-weight: bold;
      }

      .font-medium {
        font-weight: 500;
      }

      .font-semibold {
        font-weight: 600;
      }

      .italic {
        font-style: italic;
      }

      .text-xs {
        font-size: 10px;
      }

      .text-sm {
        font-size: 11px;
      }

      .text-base {
        font-size: 12px;
      }

      .text-lg {
        font-size: 13px;
      }

      .text-xl {
        font-size: 14px;
      }

      .text-2xl {
        font-size: 16px;
      }

      .text-center {
        text-align: center;
      }

      /* Spacing */
      .mb-1 {
        margin-bottom: 0.25rem;
      }

      .mb-2 {
        margin-bottom: 0.5rem;
      }

      .mb-3 {
        margin-bottom: 0.75rem;
      }

      .mb-4 {
        margin-bottom: 1rem;
      }

      .mb-5 {
        margin-bottom: 1.25rem;
      }

      .mb-6 {
        margin-bottom: 1.5rem;
      }

      .mt-1 {
        margin-top: 0.25rem;
      }

      .mt-2 {
        margin-top: 0.5rem;
      }

      .mt-3 {
        margin-top: 0.75rem;
      }

      .mt-4 {
        margin-top: 1rem;
      }

      .p-1 {
        padding: 0.25rem;
      }

      .p-2 {
        padding: 0.5rem;
      }

      .p-3 {
        padding: 0.75rem;
      }

      /* Borders */
      .border {
        border: 1px solid black;
      }

      .border-b {
        border-bottom: 1px solid black;
      }

      .border-r {
        border-right: 1px solid black;
      }

      /* Sizing */
      .min-w-120 {
        min-width: 120px;
      }

      .min-w-150 {
        min-width: 150px;
      }

      .min-w-180 {
        min-width: 180px;
      }

      .object-contain {
        object-fit: contain;
      }

      /* Colors */
      .bg-black {
        background-color: black;
      }

      .text-white {
        color: white;
      }

      /* Grid */
      .grid {
        display: grid;
      }

      .grid-cols-2 {
        grid-template-columns: repeat(2, 1fr);
      }

      .grid-cols-3 {
        grid-template-columns: repeat(3, 1fr);
      }

      .gap-2 {
        gap: 0.5rem;
      }

      .gap-3 {
        gap: 0.75rem;
      }

      /* Spacing Utilities */
      .space-y-1 > * + * {
        margin-top: 0.25rem;
      }

      .space-y-2 > * + * {
        margin-top: 0.5rem;
      }

      .space-y-3 > * + * {
        margin-top: 0.75rem;
      }

      /* Tables */
      table {
        border-collapse: collapse;
        width: 100%;
        page-break-inside: avoid;
        font-size: 10px;
      }

      th,
      td {
        border: 1px solid black;
        padding: 0.2rem;
        text-align: left;
        font-weight: 500;
      }

      th {
        background-color: #f0f0f0;
        font-size: 10px;
      }

      /* Page Break Control */
      .keep-together {
        page-break-inside: avoid;
      }

      /* Bank Form Styles */
      .bank-page {
        page-break-after: always;
      }

      .bank-flex {
        display: flex;
      }

      .bank-items-center {
        align-items: center;
      }

      .bank-justify-between {
        justify-content: space-between;
      }

      .bank-justify-end {
        justify-content: flex-end;
      }

      .bank-gap-1 {
        gap: 0.25rem;
      }

      .bank-gap-2 {
        gap: 0.5rem;
      }

      .bank-gap-3 {
        gap: 0.75rem;
      }

      .bank-flex-1 {
        flex: 1;
      }

      .bank-text-right {
        text-align: right;
      }

      .bank-text-center {
        text-align: center;
      }

      .bank-text-sm {
        font-size: 11px;
      }

      .bank-text-base {
        font-size: 12px;
      }

      .bank-text-lg {
        font-size: 13px;
      }

      .bank-text-xl {
        font-size: 14px;
      }

      .bank-font-medium {
        font-weight: 500;
      }

      .bank-font-bold {
        font-weight: 700;
      }

      .bank-leading-relaxed {
        line-height: 1.4;
      }

      .bank-mb-2 {
        margin-bottom: 0.5rem;
      }

      .bank-mb-3 {
        margin-bottom: 0.75rem;
      }

      .bank-mb-4 {
        margin-bottom: 1rem;
      }

      .bank-mb-5 {
        margin-bottom: 1.25rem;
      }

      .bank-mb-6 {
        margin-bottom: 1.5rem;
      }

      .bank-p-2 {
        padding: 0.5rem;
      }

      .bank-p-3 {
        padding: 0.75rem;
      }

      .bank-w-16 {
        width: 4rem;
      }

      .bank-w-20 {
        width: 5rem;
      }

      .bank-w-24 {
        width: 6rem;
      }

      .bank-w-32 {
        width: 8rem;
      }

      .bank-w-40 {
        width: 10rem;
      }

      .bank-min-w-120 {
        min-width: 120px;
      }

      .bank-min-w-160 {
        min-width: 160px;
      }

      .bank-h-4 {
        height: 1rem;
      }

      .bank-h-6 {
        height: 1.5rem;
      }

      .bank-h-8 {
        height: 2rem;
      }

      .bank-border-b {
        border-bottom: 1px solid black;
      }

      .bank-border-b-2 {
        border-bottom: 2px solid black;
      }

      .bank-border {
        border: 1px solid #ccc;
      }

      .bank-bg-gray-50 {
        background-color: #f9fafb;
      }

      .bank-inline-block {
        display: inline-block;
      }

      .bank-whitespace-nowrap {
        white-space: nowrap;
      }

      .bank-mx-auto {
        margin-left: auto;
        margin-right: auto;
      }

      /* I9 Form Styles */
      .i9Form-page {
        page-break-after: always;
      }

      .i9Form-flex {
        display: flex;
      }

      .i9Form-justify-between {
        justify-content: space-between;
      }

      .i9Form-items-start {
        align-items: flex-start;
      }

      .i9Form-mb-3 {
        margin-bottom: 0.75rem;
      }

      .i9Form-mb-4 {
        margin-bottom: 1rem;
      }

      .i9Form-border-b-2 {
        border-bottom-width: 2px;
        border-bottom-style: solid;
      }

      .i9Form-border-black {
        border-color: black;
      }

      .i9Form-pb-1 {
        padding-bottom: 0.25rem;
      }

      .i9Form-w-16 {
        width: 4rem;
      }

      .i9Form-h-16 {
        height: 4rem;
      }

      .i9Form-items-center {
        align-items: center;
      }

      .i9Form-justify-center {
        justify-content: center;
      }

      .i9Form-text-center {
        text-align: center;
      }

      .i9Form-text-xs {
        font-size: 9px;
      }

      .i9Form-text-sm {
        font-size: 10px;
      }

      .i9Form-text-base {
        font-size: 11px;
      }

      .i9Form-font-bold {
        font-weight: bold;
      }

      .i9Form-flex-1 {
        flex: 1 1 0%;
      }

      .i9Form-text-lg {
        font-size: 12px;
      }

      .i9Form-text-right {
        text-align: right;
      }

      .i9Form-bg-gray-100 {
        background-color: #f3f4f6;
      }

      .i9Form-border {
        border-width: 1px;
        border-style: solid;
      }

      .i9Form-p-1 {
        padding: 0.25rem;
      }

      .i9Form-p-2 {
        padding: 0.5rem;
      }

      .i9Form-mb-2 {
        margin-bottom: 0.5rem;
      }

      .i9Form-mb-3 {
        margin-bottom: 0.75rem;
      }

      .i9Form-underline {
        text-decoration: underline;
      }

      .i9Form-bg-gray-300 {
        background-color: #d1d5db;
      }

      .i9Form-mb-4 {
        margin-bottom: 1rem;
      }

      .i9Form-grid {
        display: grid;
      }

      .i9Form-grid-cols-3 {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }

      .i9Form-gap-2 {
        gap: 0.5rem;
      }

      .i9Form-flex-col {
        flex-direction: column;
      }

      .i9Form-px-1 {
        padding-left: 0.25rem;
        padding-right: 0.25rem;
      }

      .i9Form-py-1 {
        padding-top: 0.25rem;
        padding-bottom: 0.25rem;
      }

      .i9Form-h-6 {
        height: 1.5rem;
      }

      .i9Form-w-full {
        width: 100%;
      }

      .i9Form-grid-cols-12 {
        grid-template-columns: repeat(12, minmax(0, 1fr));
      }

      .i9Form-gap-1 {
        gap: 0.25rem;
      }

      .i9Form-col-span-6 {
        grid-column: span 6 / span 6;
      }

      .i9Form-col-span-2 {
        grid-column: span 2 / span 2;
      }

      .i9Form-col-span-1 {
        grid-column: span 1 / span 1;
      }

      .i9Form-p-2 {
        padding: 0.5rem;
      }

      .i9Form-col-span-3 {
        grid-column: span 3 / span 3;
      }

      .i9Form-border-r {
        border-right-width: 1px;
        border-right-style: solid;
      }

      .i9Form-col-span-9 {
        grid-column: span 9 / span 9;
      }

      .i9Form-space-y-1 > * + * {
        margin-top: 0.25rem;
      }

      .i9Form-w-2 {
        width: 0.5rem;
      }

      .i9Form-h-2 {
        height: 0.5rem;
      }

      .i9Form-mt-0-5 {
        margin-top: 0.125rem;
      }

      .i9Form-mt-1 {
        margin-top: 0.25rem;
      }

      .i9Form-font-semibold {
        font-weight: 600;
      }

      .i9Form-grid-cols-2 {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .i9Form-h-4 {
        height: 1rem;
      }

      .i9Form-pt-2 {
        padding-top: 0.5rem;
      }

      .i9Form-border-t {
        border-top-width: 1px;
        border-top-style: solid;
      }

      .i9Form-border-b-2 {
        border-bottom-width: 2px;
        border-bottom-style: solid;
      }

      .i9Form-bg-transparent {
        background-color: transparent;
      }

      .i9Form-font-medium {
        font-weight: 500;
      }

      .i9Form-gap-0 {
        gap: 0;
      }

      .i9Form-border-r {
        border-right-width: 1px;
        border-right-style: solid;
      }

      .i9Form-bg-gray-200 {
        background-color: #e5e7eb;
      }

      .i9Form-border-b {
        border-bottom-width: 1px;
        border-bottom-style: solid;
      }

      .i9Form-border-gray-400 {
        border-color: #9ca3af;
      }

      .i9Form-pt-1 {
        padding-top: 0.25rem;
      }

      .i9Form-h-12 {
        height: 3rem;
      }

      .i9Form-h-5 {
        height: 1.25rem;
      }

      .i9Form-mb-1 {
        margin-bottom: 0.25rem;
      }

      .i9Form-text-transparent {
        color: transparent;
      }

      .i9Form-w-20 {
        width: 5rem;
      }

      .i9Form-object-contain {
        object-fit: contain;
      }

      .i9Form-svg {
        display: inline-block;
      }

      .i9Form-block {
        display: block;
      }

      .i9Form-border-gray-400 {
        border-color: #9ca3af;
      }

      .i9Form-flex {
        display: flex;
      }

      .i9Form-items-start {
        align-items: flex-start;
      }

      .i9Form-border-t {
        border-top-width: 1px;
        border-top-style: solid;
      }

      .i9Form-border-gray-400 {
        border-color: #9ca3af;
      }

      .i9Form-logo-container {
        width: 4rem;
        height: 4rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .i9Form-logo {
        width: 3rem;
        height: 3rem;
        border: 3px solid black;
        border-radius: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 0.2rem;
      }

      .i9Form-logo-text {
        font-weight: bold;
        font-size: 11px;
        line-height: 1;
      }

      .i9Form-logo-subtext {
        font-size: 5px;
        line-height: 1;
        text-align: center;
      }

      /* Print-specific styles */
      @media print {
        .page {
          padding: 0.8rem;
          min-height: 27.7cm;
        }
        
        body {
          font-size: 10px;
        }
        
        .keep-together {
          page-break-inside: avoid;
        }
        
        table {
          font-size: 9px;
        }
        
        th {
          font-size: 9px;
        }
      }

      /* Emergency Contact Styling */
      .emergency-contact {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 2px;
      }

      .emergency-contact-labels {
        font-size: 9px;
        font-style: italic;
        margin-left: 150px;
        display: flex;
        justify-content: space-between;
        padding: 0 10px;
      }

      .emergency-contact-field {
        border-bottom: 1px solid black;
        flex: 1;
      }

      .emergency-contact-values {
        display: flex;
        justify-content: space-between;
        width: 100%;
        padding: 0 8px;
      }
    </style>
  </head>
  <body>
    <!-- Page 1: Application Form -->
    <div class="page keep-together">
      <div class="flex justify-between mb-4">
        <div class="pb-2">
          <h1 class="text-xl font-bold">CBYRAC, INC</h1>
          <p class="text-sm mt-1">633 NE 167TH STREET, SUITE 709</p>
          <p class="text-sm font-medium">NORTH MIAMI BEACH, FL. 33162</p>
          <p class="text-sm font-medium">PH:786-403-5043</p>
          <p class="text-sm font-medium">E-MAIL: cbyracinc@gmail.com</p>
        </div>
        <div>
          <img
            class="object-contain"
            src="http://10.10.7.102:8000/cbyrac-logo.png"
            alt="CBYRAC Logo"
            style="width: 10rem; height: 4.5rem"
          />
        </div>
      </div>

      <h2 class="bg-black text-white text-center text-lg font-bold mb-3 p-1">
        APPLICATION FOR EMPLOYMENT
      </h2>
      <p class="font-bold text-center mb-3 text-sm">
        Please Answer All Questions. Resumes Are Not A Substitute For A Completed Application.
      </p>

      <div class="flex mb-3 justify-end font-medium">
        <span>Date: </span>
        <span class="border-b border-black min-w-120 text-right ml-2">
          ${formattedDate}
        </span>
      </div>

      <p class="text-sm mb-2 leading-relaxed font-medium">
        We are an equal opportunity employer. Applicants are considered for positions without regard to veteran status, uniformed servicemember status, race color, religion, sex, national origin, age, physical or mental disability, genetic information or any other category protected by applicable federal, state, or local laws.
      </p>

      <p class="text-sm mb-3 leading-relaxed font-semibold">
        THIS COMPANY IS AN AT-WILL EMPLOYER AS ALLOWED BY APPLICABLE STATE LAW. THIS MEANS THAT REGARDLESS OF ANY PROVISION IN THIS APPLICATION, IF HIRED, THE COMPANY OR I MAY TERMINATE THE EMPLOYMENT RELATIONSHIP AT ANY TIME, FOR ANY REASON, WITH OR WITHOUT CAUSE OR NOTICE.
      </p>

      <!-- Personal Information -->
      <div class="space-y-2 mb-3">
        <div class="grid grid-cols-3 gap-3 mt-3">
          <div class="flex items-center gap-1">
            <span class="text-sm font-medium">Last Name:</span>
            <span class="border-b border-black flex-1 min-w-150">&nbsp;${get(
              `generalInfo.lastName`
            )}&nbsp;</span>
          </div>
          <div class="flex items-center gap-1">
            <span class="text-sm font-medium">First Name:</span>
            <span class="border-b border-black flex-1 min-w-150">&nbsp;${get(
              `generalInfo.firstName`
            )}&nbsp;</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-sm font-medium">Middle Name:</span>
            <span class="border-b border-black flex-1 min-w-120">&nbsp;${get(
              `generalInfo.middleName`
            )}&nbsp;</span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div class="flex items-center gap-1">
            <span class="text-sm font-medium whitespace-nowrap">Social Security Number:</span>
            <span class="border-b border-black flex-1">&nbsp;${get(
              `generalInfo.ssn`
            )}&nbsp;</span>
          </div>
          <div class="flex items-center gap-1">
            <span class="text-sm font-medium whitespace-nowrap">DOB:</span>
            <span class="border-b border-black flex-1">&nbsp;${get(
              `generalInfo.dateOfBirth`
            )}&nbsp;</span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div class="flex items-center gap-1">
            <span class="text-sm font-medium whitespace-nowrap">Telephone Number:</span>
            <span class="border-b border-black flex-1">&nbsp;${get(
              `generalInfo.telephoneNumber`
            )}&nbsp;</span>
          </div>
          <div class="flex items-center gap-1">
            <span class="text-sm font-medium whitespace-nowrap">Email Address:</span>
            <span class="border-b border-black flex-1">&nbsp;${get(
              `generalInfo.email`
            )}&nbsp;</span>
          </div>
        </div>

        <div class="emergency-contact">
          <span class="font-medium whitespace-nowrap">Emergency Contact Person:</span>
          <div class="emergency-contact-field">
            <div class="emergency-contact-values">
              <span>&nbsp;${get(
                `generalInfo.emergencyContact.name`
              )}&nbsp;</span>
              <span>&nbsp;${get(
                `generalInfo.emergencyContact.relationship`
              )}&nbsp;</span>
              <span>&nbsp;${get(
                `generalInfo.emergencyContact.phone`
              )}&nbsp;</span>
            </div>
          </div>
        </div>
        <div class="emergency-contact-labels">
          <span>Name</span>
          <span>Relation</span>
          <span>Telephone</span>
        </div>
      </div>

      <!-- Employment Type -->
      <div class="space-y-2 mb-4">
        <div class="flex items-center gap-1">
          <span class="font-medium whitespace-nowrap text-sm">Type of employment desired? ${
            get('generalInfo.appliedPosition') === 'Intern'
              ? 'Intern [✅]'
              : 'Temporary [✅]'
          }. Desired Salary/Hourly Rate</span>
          <span class="border-b border-black flex-1 text-sm">Desire Salary: &nbsp;${get(
            `generalInfo.desiredSalary`
          )}&nbsp;/Hourly Rate: &nbsp;${get(
    `generalInfo.hourlyRate`
  )}&nbsp;</span>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div class="flex items-center gap-1">
            <span class="font-medium whitespace-nowrap text-sm">Position Applied For:</span>
            <span class="border-b border-black flex-1">&nbsp;${get(
              `generalInfo.appliedPosition`
            )}</span>
          </div>
          <div class="flex items-center gap-1">
            <span class="font-medium whitespace-nowrap text-sm">Dept.:</span>
            <span class="border-b border-black flex-1">&nbsp;${get(
              `generalInfo.department`
            )}</span>
          </div>
        </div>
        <div class="flex items-center gap-1">
          <span class="font-medium whitespace-nowrap text-sm">Are you willing to work overtime? ${
            get('generalInfo.overtime') === 'No' ? `No [❌]` : 'Yes [✅]'
          } Date on which you can start work if hired</span>
          <span class="border-b border-black flex-1">&nbsp;${get(
            `generalInfo.startDate`
          )}</span>
        </div>
      </div>

      <!-- Previous Employment Questions -->
      <div class="space-y-1 mb-4">
        <div>
          <span class="font-medium text-sm">Have you previously applied for employment with this company? ${
            get('generalInfo.previouslyApplied') ? 'Yes [✅]' : `No [❌]`
          }</span>
        </div>
        <div class="flex items-center gap-1">
          <span class="font-medium whitespace-nowrap text-sm">If yes, when and where did you apply?</span>
          <span class="border-b border-black flex-1">${get(
            `generalInfo.previousApplicationDate`
          )}</span>
        </div>
        <div>
          <span class="font-medium text-sm">Have you ever been employed by this Company?${
            get('generalInfo.previouslyEmployed') ? 'Yes [✅]' : `No [❌]`
          }</span>
        </div>
        <div class="flex items-center gap-1">
          <span class="font-medium whitespace-nowrap text-sm">If yes, provide dates of employment, location and reason for separation from employment.</span>
          <span class="border-b border-black flex-1">&nbsp;${get(
            `generalInfo.previousSeparationReason`
          )}</span>
        </div>
      </div>

      <!-- Education Section -->
      <h3 class="text-sm font-bold mb-1">Education</h3>
      <table class="border keep-together">
        <thead>
          <tr>
            <th>School Name<br />(Address, City, State)</th>
            <th>Course of Study or Major</th>
            <th>Graduate? Y or N</th>
            <th># of Years Completed</th>
            <th>Honors Received</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>High School</td>
            <td>&nbsp;${get(`generalInfo.education.major`)}</td>
            <td>&nbsp;${get(`generalInfo.education.graduationStatus`)}</td>
            <td>&nbsp;${get(`generalInfo.education.yearsCompleted`)}</td>
            <td>&nbsp;${get(`generalInfo.education.honorsReceived`)}</td>
          </tr>
        </tbody>
      </table>

      <!-- Work Experience -->
      <h3 class="font-bold mb-1 mt-3">WORK EXPERIENCE</h3>
      <p class="text-sm leading-relaxed">
        Please list the names of your present and/or previous employers in chronological order with present or most recent employer listed first. Provide information for at least the most recent ten (10) year period. Attach additional sheets if needed. If self-employed, supply firm name and business references. You may include any verifiable work performed on a volunteer basis, internships, or military service. Your failure to completely respond to each inquiry may disqualify you for consideration from employment.
      </p>
    </div>

    <!-- Page 2: Bank Form -->
    <div class="page bank-page">
      <h2 class="bank-text-xl bank-font-medium bank-text-center">
        EMPLOYEE DIRECT DEPOSIT AUTHORIZATION AGREEMENT
      </h2>
      <div class="bank-border-b-2 bank-w-20 bank-flex bank-mx-auto bank-mb-1"></div>

      <h3 class="bank-text-lg bank-text-center bank-mb-4">(ACH CREDIT & DEBITS)</h3>

      <div class="bank-flex bank-items-center bank-gap-6 bank-mb-4">
        <span class="bank-text-sm bank-font-medium bank-whitespace-nowrap">New Payroll Deposit:</span>
        <input type="checkbox" class="bank-h-4 bank-w-8" ${
          employeeData.newPayrollDeposit ? 'checked' : ''
        } disabled>
        <span class="bank-text-sm bank-font-medium bank-whitespace-nowrap">Change Deposit Information:</span>
        <input type="checkbox" class="bank-h-4 bank-w-8" ${
          employeeData.changeDepositInfo ? 'checked' : ''
        } disabled>
        <span class="bank-text-sm bank-font-medium bank-whitespace-nowrap">Revoke Authorization:</span>
        <input type="checkbox" class="bank-h-4 bank-w-8" ${
          employeeData.revokeAuthorization ? 'checked' : ''
        } disabled>
      </div>

      <div class="bank-mb-5">
        <div class="bank-flex bank-items-center bank-gap-1 bank-justify-end">
          <span class="bank-text-sm bank-font-medium bank-whitespace-nowrap">Date:</span>
          <span class="bank-text-sm bank-font-medium bank-border-b bank-inline-block bank-w-32 bank-ml-1">${formattedDate}</span>
        </div>
      </div>

      <div class="bank-mb-3">
        <div class="bank-flex bank-items-center bank-gap-1">
          <span class="bank-text-base bank-whitespace-nowrap">Name:</span>
          <span class="bank-font-medium bank-border-b bank-inline-block bank-w-32 bank-ml-1">${get(
            'bankForm.name'
          )}</span>
          <span class="bank-text-base bank-whitespace-nowrap bank-ml-2">SSN:</span>
          <span class="bank-font-medium bank-border-b bank-inline-block bank-w-32 bank-ml-1">${get(
            'bankForm.ssn'
          )}</span>
        </div>
      </div>

      <p class="bank-text-sm bank-mb-4 bank-font-medium bank-leading-relaxed">
        I authorize my employer or a payroll processor on my employer's behalf to deposit any amounts owned to me by initiating credit entries to my account at the financial institution (BANK) indicated below. Further, I authorize Bank to accept and credit entries indicated by Cbyrac, Inc. to my ☐ Checking ☐ Saving account (select one). I acknowledge the deposit of any amount is an advance of funds on behalf of my employer and the responsibility of my employer. I also authorize my employer, if any, to debit my account in the event of a credit which should not have been made for an amount not to exceed the original amount of the erroneous credit.
      </p>

      <p class="bank-text-base bank-font-bold bank-text-center">
        Complete Sections 1 or 2 as applicable
      </p>
      <div class="bank-border-b-2 bank-w-16 bank-flex bank-mx-auto bank-mb-4"></div>

      <h3 class="bank-text-lg bank-text-center">
        <span class="bank-font-medium">SECTION 1 CHECKING ACCOUNT;</span> Attach a Voided Check
      </h3>
      <div class="bank-border-b-2 bank-w-16 bank-flex bank-mx-auto bank-mb-5"></div>

      <!-- Section 1 -->
      <div class="bank-p-2 bank-mb-3">
        <div class="bank-mb-3">
          <div class="bank-flex bank-items-center bank-gap-1">
            <span class="bank-text-base bank-whitespace-nowrap">Bank Name:</span>
            <span class="bank-text-sm bank-font-medium bank-border-b bank-inline-block bank-w-40 bank-ml-1">${get(
              'bankForm.checkingAccount.bankName'
            )}</span>
            <span class="bank-text-base bank-whitespace-nowrap bank-ml-2">State:</span>
            <span class="bank-text-sm bank-font-medium bank-border-b bank-inline-block bank-w-16 bank-ml-1">${get(
              'bankForm.checkingAccount.state'
            )}</span>
          </div>
        </div>
        <div class="bank-mb-3">
          <div class="bank-flex bank-items-center bank-gap-1 bank-justify-center">
            <span class="bank-whitespace-nowrap">I wish to deposit:</span>
            <span class="bank-text-sm bank-font-medium bank-border-b bank-inline-block bank-w-20 bank-ml-1">${get(
              'bankForm.checkingAccount.depositPercentage'
            )}%</span>
            <span class="bank-whitespace-nowrap bank-ml-2">or:</span>
            <span class="bank-text-sm bank-font-medium bank-border-b bank-inline-block bank-w-20 bank-ml-1">${get(
              'bankForm.checkingAccount.depositPercentage'
            )}% Net Pay</span>
          </div>
        </div>
        <div class="bank-mb-4">
          <div class="bank-flex bank-items-center bank-gap-1">
            <span class="bank-text-base bank-whitespace-nowrap">Transit/ABA No.:</span>
            <span class="bank-text-base bank-border-b bank-inline-block bank-w-24 bank-ml-1">${get(
              'bankForm.checkingAccount.transitNo'
            )}</span>
            <span class="bank-text-base bank-whitespace-nowrap bank-ml-2">Account No.:</span>
            <span class="bank-text-sm bank-font-medium bank-border-b bank-inline-block bank-w-32 bank-ml-1">${get(
              'bankForm.checkingAccount.accountNo'
            )}</span>
          </div>
        </div>

        <div class="bank-border bank-p-4 bank-text-center bank-bg-gray-50">
          <p class="bank-font-bold bank-mb-1">ATTACH VOIDED CHECK HERE</p>
          <p class="bank-text-xs">The numbers on the bottom of your voided check are used</p>
          <p class="bank-text-xs">To make the electronic funds transfer directly to your account.</p>
          ${
            employeeData.accountFile
              ? `<a href="${employeeData.accountFile}" class="bank-btn bank-mt-2" style="padding: 0.25rem 0.5rem; font-size: 10px;">Open PDF in New Tab</a>`
              : ''
          }
        </div>
      </div>

      <p class="bank-text-center bank-text-lg bank-font-medium bank-mb-3">
        *****************************************************************************************
      </p>

      <!-- Section 2 -->
      <div class="bank-p-2 bank-mb-4">
        <h3 class="bank-text-lg bank-text-center">
          <span class="bank-font-medium">SECTION 2 SAVINGS ACCOUNT;</span> Call Your Bank To Obtain the Following Information:
        </h3>
        <div class="bank-border-b-2 bank-flex bank-mx-auto bank-mb-4"></div>

        <div class="bank-mb-3">
          <span class="bank-text-base bank-whitespace-nowrap">Bank Name:</span>
          <span class="bank-text-sm bank-font-medium bank-border-b bank-inline-block bank-w-40 bank-ml-1">${get(
            'bankForm.savingsAccount.bankName'
          )}</span>
          <span class="bank-text-base bank-whitespace-nowrap bank-ml-2">State:</span>
          <span class="bank-text-sm bank-font-medium bank-border-b bank-inline-block bank-w-16 bank-ml-1">${get(
            'bankForm.savingsAccount.state'
          )}</span>
        </div>

        <div class="bank-mb-3 bank-text-center">
          <span class="bank-whitespace-nowrap">I wish to deposit:</span>
          <span class="bank-text-sm bank-font-medium bank-border-b bank-inline-block bank-w-20 bank-ml-1">${get(
            'bankForm.savingsAccount.depositPercentage'
          )}%</span>
          <span class="bank-whitespace-nowrap bank-ml-2">or:</span>
          <span class="bank-text-sm bank-font-medium bank-border-b bank-inline-block bank-w-20 bank-ml-1">${get(
            'bankForm.savingsAccount.depositPercentage'
          )}% Net Pay</span>
        </div>

        <div class="bank-flex bank-items-center bank-gap-1 bank-font-medium bank-mb-3">
          <span class="bank-text-sm">SAVINGS BANK/ROUTING OR TRANSIT NUMBER:</span>
          <span class="bank-border-b bank-flex-1 bank-min-w-120">${get(
            'bankForm.savingsAccount.transitNo'
          )}</span>
          <span class="bank-text-xs bank-ml-1">(This Must Be 9 Digits)</span>
        </div>

        <div class="bank-flex bank-items-center bank-gap-1">
          <span class="bank-text-sm">EMPLOYEE SAVINGS ACCOUNT NUMBER:</span>
          <span class="bank-border-b bank-flex-1 bank-min-w-120">${get(
            'bankForm.savingsAccount.accountNo'
          )}</span>
        </div>
      </div>

      <!-- Signature Section -->
      <div class="bank-flex bank-items-center bank-justify-between bank-gap-4">
        <div class="bank-flex bank-items-center bank-gap-1 bank-flex-1">
          <span class="bank-text-sm bank-whitespace-nowrap">EMPLOYEE SIGNATURE:</span>
          <span class="bank-border-b bank-flex-1 bank-min-w-120 bank-h-6 bank-flex bank-items-center bank-justify-center">
            ${
              employeeData.signature
                ? `<img src="${employeeData.signature}" alt="Employee Signature" class="bank-h-4 bank-w-20" />`
                : ''
            }
          </span>
        </div>

        <div class="bank-flex bank-items-center bank-gap-1 bank-whitespace-nowrap">
          <span class="bank-text-sm">DATE:</span>
          <span class="bank-border-b bank-w-32 bank-inline-block">${formattedDate}</span>
        </div>
      </div>
    </div>

    <!-- Page 3-5: I9 Form -->
    <div class="page i9Form-page">
      <div class="i9Form-p-2">
        <!-- Improved Header -->
        <div class="i9Form-flex i9Form-justify-between i9Form-items-start i9Form-mb-3 i9Form-border-b-2 i9Form-border-black i9Form-pb-1">
          <div class="i9Form-logo-container">
            <div class="i9Form-logo">
              <div class="i9Form-text-center">
                <div class="i9Form-logo-text">DHS</div>
                <div class="i9Form-logo-subtext">DEPT OF<br />HOMELAND<br />SECURITY</div>
              </div>
            </div>
          </div>
          <div class="i9Form-flex-1 i9Form-text-center">
            <h1 class="i9Form-text-lg i9Form-font-bold">Employment Eligibility Verification</h1>
            <p class="i9Form-text-xs i9Form-font-semibold">Department of Homeland Security</p>
            <p class="i9Form-text-xs">U.S. Citizenship and Immigration Services</p>
          </div>
          <div class="i9Form-text-right i9Form-text-xs">
            <p class="i9Form-font-bold">USCIS</p>
            <p class="i9Form-font-bold">Form I-9</p>
            <p>OMB No.1615-0047</p>
            <p>Expires 10/31/2027</p>
          </div>
        </div>

        <!-- START HERE Notice -->
        <div class="i9Form-bg-gray-100 i9Form-border i9Form-border-black i9Form-p-1 i9Form-mb-2 i9Form-text-xs">
          <p><span class="i9Form-font-bold">START HERE:</span> Employers must ensure the form instructions are available to employees when completing this form. Employers are liable for failing to comply with the requirements for completing this form. See below and the <span class="i9Form-font-bold i9Form-underline">Instructions</span>.</p>
        </div>

        <!-- Anti-Discrimination Notice -->
        <div class="i9Form-bg-gray-100 i9Form-border i9Form-border-black i9Form-p-1 i9Form-mb-2 i9Form-text-xs">
          <p><span class="i9Form-font-bold">ANTI-DISCRIMINATION NOTICE:</span> All employers and others who complete or use this form must present Form I-9. Employers cannot ask employees for documentation to verify information in Section 1, or specify which acceptable documentation employees must present for Section 2 or Supplement B, Reverification and Rehire. Treating employees differently based on their citizenship, immigration status, or national origin may be illegal.</p>
        </div>

        <!-- Section 1 Header -->
        <div class="i9Form-bg-gray-300 i9Form-text-black i9Form-p-1 i9Form-mb-3 i9Form-text-xs i9Form-font-bold">
          Section 1. Employee Information and Attestation: Employees must complete and sign Section 1 of Form I-9 no later than the first day of employment, but not before accepting a job offer.
        </div>

        <!-- Personal Info -->
        <div class="i9Form-grid i9Form-grid-cols-3 i9Form-gap-2 i9Form-mb-2">
          <div class="i9Form-flex i9Form-flex-col">
            <label class="i9Form-text-xs i9Form-mb-1">Last name</label>
            <div class="i9Form-border i9Form-border-black i9Form-px-1 i9Form-py-1 i9Form-text-xs i9Form-h-6"><p>${get(
              'i9Form.lastName'
            )}</p></div>
          </div>
          <div class="i9Form-flex i9Form-flex-col">
            <label class="i9Form-text-xs i9Form-mb-1">First name</label>
            <div class="i9Form-border i9Form-border-black i9Form-px-1 i9Form-py-1 i9Form-text-xs i9Form-h-6"><p>${get(
              'i9Form.firstName'
            )}</p></div>
          </div>
          <div class="i9Form-flex i9Form-flex-col">
            <label class="i9Form-text-xs i9Form-mb-1">Middle Initial (if any)</label>
            <div class="i9Form-border i9Form-border-black i9Form-px-1 i9Form-py-1 i9Form-text-xs i9Form-h-6"><p>${get(
              'i9Form.middleName'
            )}</p></div>
          </div>
        </div>

        <div class="i9Form-mb-2">
          <label class="i9Form-text-xs i9Form-mb-1 i9Form-block">Other Last Names Used (if any)</label>
          <div class="i9Form-border i9Form-border-black i9Form-px-1 i9Form-py-1 i9Form-text-xs i9Form-h-6 i9Form-w-full">${get(
            'i9Form.otherNames'
          )}</div>
        </div>

        <!-- Address -->
        <div class="i9Form-grid i9Form-grid-cols-12 i9Form-gap-1 i9Form-mb-2">
          <div class="i9Form-col-span-6 i9Form-flex i9Form-flex-col">
            <label class="i9Form-text-xs i9Form-mb-1">Address (Street Number and Name)</label>
            <div class="i9Form-border i9Form-border-black i9Form-px-1 i9Form-py-1 i9Form-text-xs i9Form-h-6">${get(
              'i9Form.address'
            )}</div>
          </div>
          <div class="i9Form-col-span-2 i9Form-flex i9Form-flex-col">
            <label class="i9Form-text-xs i9Form-mb-1">Apt. Number (if any)</label>
            <div class="i9Form-border i9Form-border-black i9Form-px-1 i9Form-py-1 i9Form-text-xs i9Form-h-6"></div>
          </div>
          <div class="i9Form-col-span-2 i9Form-flex i9Form-flex-col">
            <label class="i9Form-text-xs i9Form-mb-1">City or Town</label>
            <div class="i9Form-border i9Form-border-black i9Form-px-1 i9Form-py-1 i9Form-text-xs i9Form-h-6"></div>
          </div>
          <div class="i9Form-col-span-1 i9Form-flex i9Form-flex-col">
            <label class="i9Form-text-xs i9Form-mb-1">State</label>
            <div class="i9Form-border i9Form-border-black i9Form-px-1 i9Form-py-1 i9Form-text-xs i9Form-h-6"></div>
          </div>
          <div class="i9Form-col-span-1 i9Form-flex i9Form-flex-col">
            <label class="i9Form-text-xs i9Form-mb-1">ZIP Code</label>
            <div class="i9Form-border i9Form-border-black i9Form-px-1 i9Form-py-1 i9Form-text-xs i9Form-h-6"></div>
          </div>
        </div>

        <!-- Date of Birth, SSN, Email -->
        <div class="i9Form-grid i9Form-grid-cols-3 i9Form-gap-2 i9Form-mb-2">
          <div class="i9Form-flex i9Form-flex-col">
            <label class="i9Form-text-xs i9Form-mb-1">Date of Birth (mm/dd/yyyy)</label>
            <div class="i9Form-border i9Form-border-black i9Form-px-1 i9Form-py-1 i9Form-text-xs i9Form-h-6">${get(
              'i9Form.dateOfBirth'
            )}</div>
          </div>
          <div class="i9Form-flex i9Form-flex-col">
            <label class="i9Form-text-xs i9Form-mb-1">U.S. Social Security Number</label>
            <div class="i9Form-border i9Form-border-black i9Form-px-1 i9Form-py-1 i9Form-text-xs i9Form-h-6">${get(
              'i9Form.ssn'
            )}</div>
          </div>
          <div class="i9Form-flex i9Form-flex-col">
            <label class="i9Form-text-xs i9Form-mb-1">Employee's Email Address</label>
            <div class="i9Form-border i9Form-border-black i9Form-px-1 i9Form-py-1 i9Form-text-xs i9Form-h-6">${get(
              'i9Form.email'
            )}</div>
          </div>
        </div>

        <div class="i9Form-mb-2">
          <label class="i9Form-text-xs i9Form-mb-1 i9Form-block">Employee's Telephone Number</label>
          <div class="i9Form-border i9Form-border-black i9Form-px-1 i9Form-py-1 i9Form-text-xs i9Form-h-6 i9Form-w-full">${get(
            'i9Form.phone'
          )}</div>
        </div>

        <!-- Citizenship Attestation -->
        <div class="i9Form-border i9Form-border-black i9Form-p-2 i9Form-mb-2 keep-together">
          <div class="i9Form-grid i9Form-grid-cols-12 i9Form-gap-1">
            <div class="i9Form-col-span-3 i9Form-border-r i9Form-border-black i9Form-p-1 i9Form-text-xs">
              <p class="i9Form-font-medium">I am aware that federal law provides for imprisonment and/or fines for false statements, or the use of false documents, in connection with the completion of this form. I attest, under penalty of perjury, that this information, including my selection of the box attesting to my citizenship or immigration status, is true and correct.</p>
            </div>
            <div class="i9Form-col-span-9">
              <p class="i9Form-text-xs i9Form-mb-1">Check one of the following boxes to attest to your citizenship or immigration status (See page 2 and 3 of the instructions):</p>
              <div class="i9Form-space-y-1 i9Form-text-xs">
                <!-- 1. US Citizen -->
                <label class="i9Form-flex i9Form-items-start i9Form-gap-1">
                  <div class="i9Form-w-2 i9Form-h-2 i9Form-border i9Form-border-black i9Form-mt-0-5 i9Form-flex i9Form-items-center i9Form-justify-center">
                    ${
                      get('i9Form.status') === 'citizen'
                        ? '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="black" class="i9Form-svg i9Form-w-2 i9Form-h-2"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 0 1 0 1.414l-7.25 7.25a1 1 0 0 1-1.414 0l-3.25-3.25a1 1 0 1 1 1.414-1.414L8.5 11.086l6.543-6.543a1 1 0 0 1 1.664.75z" clipRule="evenodd" /></svg>'
                        : ''
                    }
                  </div>
                  <span>1. A citizen of the United States</span>
                </label>

                <!-- 2. Noncitizen National -->
                <label class="i9Form-flex i9Form-items-start i9Form-gap-1">
                  <div class="i9Form-w-2 i9Form-h-2 i9Form-border i9Form-border-black i9Form-mt-0-5 i9Form-flex i9Form-items-center i9Form-justify-center">
                    ${
                      get('i9Form.status') === 'noncitizen_national'
                        ? '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="black" class="i9Form-svg i9Form-w-2 i9Form-h-2"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 0 1 0 1.414l-7.25 7.25a1 1 0 0 1-1.414 0l-3.25-3.25a1 1 0 1 1 1.414-1.414L8.5 11.086l6.543-6.543a1 1 0 0 1 1.664.75z" clipRule="evenodd" /></svg>'
                        : ''
                    }
                  </div>
                  <span>2. A noncitizen national of the United States (See instructions.)</span>
                </label>

                <!-- 3. Lawful Permanent Resident -->
                <label class="i9Form-flex i9Form-items-start i9Form-gap-1">
                  <div class="i9Form-w-2 i9Form-h-2 i9Form-border i9Form-border-black i9Form-mt-0-5 i9Form-flex i9Form-items-center i9Form-justify-center">
                    ${
                      get('i9Form.status') === 'permanent_resident'
                        ? '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="black" class="i9Form-svg i9Form-w-2 i9Form-h-2"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 0 1 0 1.414l-7.25 7.25a1 1 0 0 1-1.414 0l-3.25-3.25a1 1 0 1 1 1.414-1.414L8.5 11.086l6.543-6.543a1 1 0 0 1 1.664.75z" clipRule="evenodd" /></svg>'
                        : ''
                    }
                  </div>
                  <span>3. A lawful permanent resident (Enter USCIS or A-Number.)</span>
                </label>

                <!-- 4. Other Noncitizen -->
                <label class="i9Form-flex i9Form-items-start i9Form-gap-1">
                  <div class="i9Form-w-2 i9Form-h-2 i9Form-border i9Form-border-black i9Form-mt-0-5 i9Form-flex i9Form-items-center i9Form-justify-center">
                    ${
                      get('i9Form.status') === 'other_noncitizen'
                        ? '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="black" class="i9Form-svg i9Form-w-2 i9Form-h-2"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 0 1 0 1.414l-7.25 7.25a1 1 0 0 1-1.414 0l-3.25-3.25a1 1 0 1 1 1.414-1.414L8.5 11.086l6.543-6.543a1 1 0 0 1 1.664.75z" clipRule="evenodd" /></svg>'
                        : ''
                    }
                  </div>
                  <span>4. A noncitizen (Other than item Numbers 2 and 3, above) authorized to work until (exp. date, if any)</span>
                </label>
              </div>

              <p class="i9Form-text-xs i9Form-mt-1 i9Form-font-semibold">If you check Item Number 4, enter one of these:</p>
              <div class="i9Form-grid i9Form-grid-cols-2 i9Form-gap-1 i9Form-mt-1">
                <div class="i9Form-flex i9Form-flex-col">
                  <label class="i9Form-text-xs i9Form-mb-1">USCIS A-Number</label>
                  <div class="i9Form-border i9Form-border-black i9Form-px-1 i9Form-py-1 i9Form-text-xs i9Form-h-4">${get(
                    'i9Form.uscisNumber'
                  )}</div>
                </div>
                <div class="i9Form-flex i9Form-flex-col">
                  <label class="i9Form-text-xs i9Form-mb-1">Form I-94 Admission Number</label>
                  <div class="i9Form-border i9Form-border-black i9Form-px-1 i9Form-py-1 i9Form-text-xs i9Form-h-4">${get(
                    'i9Form.admissionNumber'
                  )}</div>
                </div>
              </div>
              <div class="i9Form-grid i9Form-grid-cols-2 i9Form-gap-1 i9Form-mt-1">
                <div class="i9Form-flex i9Form-flex-col">
                  <label class="i9Form-text-xs i9Form-mb-1">Foreign Passport Number and Country of Issuance</label>
                  <div class="i9Form-border i9Form-border-black i9Form-px-1 i9Form-py-1 i9Form-text-xs i9Form-h-4">${get(
                    'i9Form.foreignPassportNumber'
                  )}</div>
                </div>
                <div class="i9Form-flex i9Form-flex-col">
                  <label class="i9Form-text-xs i9Form-mb-1">Country of Issuance</label>
                  <div class="i9Form-border i9Form-border-black i9Form-px-1 i9Form-py-1 i9Form-text-xs i9Form-h-4"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="i9Form-grid i9Form-grid-cols-2 i9Form-gap-2 i9Form-mt-2 i9Form-pt-2 i9Form-border-t i9Form-border-black">
            <div class="i9Form-flex i9Form-flex-col">
              <label class="i9Form-text-xs i9Form-mb-1">Signature of Employee</label>
              <div class="i9Form-border-b-2 i9Form-border-black i9Form-px-1 i9Form-py-1 i9Form-text-xs i9Form-h-6 i9Form-bg-transparent">
                ${
                  employeeData.signature
                    ? `<img src="${employeeData.signature}" alt="Signature" style="height: 16px;" />`
                    : '<span class="i9Form-text-transparent">_</span>'
                }
              </div>
            </div>
            <div class="i9Form-flex i9Form-flex-col">
              <label class="i9Form-text-xs i9Form-mb-1">Today's Date (mm/dd/yyyy)</label>
              <div class="i9Form-border-b-2 i9Form-border-black i9Form-px-1 i9Form-py-1 i9Form-text-xs i9Form-h-6 i9Form-bg-transparent">${formattedDate}</div>
            </div>
          </div>
        </div>

        <!-- Preparer/Translator Notice -->
        <div class="i9Form-bg-gray-100 i9Form-border i9Form-border-black i9Form-p-1 i9Form-mb-2 i9Form-text-xs">
          <p class="i9Form-font-medium">If a preparer and/or translator assisted you in completing Section 1, that person MUST complete the Preparer and/or Translator Certification on Page 3.</p>
        </div>

        <!-- Section 2 Header -->
        <div class="i9Form-bg-gray-300 i9Form-text-black i9Form-p-1 i9Form-mb-3 i9Form-text-xs i9Form-font-bold">
          Section 2. Employer Review and Verification: Employers or their authorized representative must complete and sign Section 2 within three business days after the employee's first day of employment, and must physically examine, or examine consistent with an alternative procedure authorized by the Secretary of DHS, documentation from List A OR a combination of documentation from List B and List C. Enter any additional documentation in the Additional Information box; see instructions.
        </div>

        <!-- List A, B, C Table -->
        <div class="i9Form-grid i9Form-grid-cols-3 i9Form-gap-0 i9Form-mb-2 i9Form-border i9Form-border-black keep-together">
          <div class="i9Form-border-r i9Form-border-black">
            <div class="i9Form-bg-gray-200 i9Form-p-1 i9Form-text-center i9Form-font-bold i9Form-text-xs i9Form-border-b i9Form-border-black">List A</div>
            <div class="i9Form-p-1 i9Form-space-y-1">
              ${Array.from({ length: 12 })
                .map(
                  () => `
              <div>
                <label class="i9Form-text-xs i9Form-block i9Form-mb-1">Document Title:</label>
                <div class="i9Form-border i9Form-border-gray-400 i9Form-px-1 i9Form-py-1 i9Form-text-xs i9Form-w-full i9Form-h-4"></div>
              </div>
              `
                )
                .join('')}
            </div>
          </div>
          <div class="i9Form-border-r i9Form-border-black">
            <div class="i9Form-bg-gray-200 i9Form-p-1 i9Form-text-center i9Form-font-bold i9Form-text-xs i9Form-border-b i9Form-border-black">List B<br /><span class="i9Form-font-normal i9Form-text-xs">AND</span></div>
            <div class="i9Form-p-1">
              <div class="i9Form-mb-1">
                <label class="i9Form-text-xs i9Form-block i9Form-mb-1">Document Title:</label>
                <div class="i9Form-border i9Form-border-gray-400 i9Form-px-1 i9Form-py-1 i9Form-text-xs i9Form-w-full i9Form-h-4"></div>
              </div>
            </div>
          </div>
          <div>
            <div class="i9Form-bg-gray-200 i9Form-p-1 i9Form-text-center i9Form-font-bold i9Form-text-xs i9Form-border-b i9Form-border-black">List C</div>
            <div class="i9Form-p-1">
              <div class="i9Form-mb-1">
                <label class="i9Form-text-xs i9Form-block i9Form-mb-1">Document Title:</label>
                <div class="i9Form-border i9Form-border-gray-400 i9Form-px-1 i9Form-py-1 i9Form-text-xs i9Form-w-full i9Form-h-4"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Additional Information -->
        <div class="i9Form-border i9Form-border-black i9Form-p-1 i9Form-mb-2">
          <label class="i9Form-text-xs i9Form-font-semibold i9Form-block i9Form-mb-1">Additional Information</label>
          <div class="i9Form-border i9Form-border-gray-400 i9Form-px-1 i9Form-py-1 i9Form-text-xs i9Form-w-full i9Form-h-12"></div>
          <div class="i9Form-flex i9Form-items-start i9Form-gap-1 i9Form-mt-1">
            <div class="i9Form-w-2 i9Form-h-2 i9Form-border i9Form-border-black i9Form-mt-0-5"></div>
            <span class="i9Form-text-xs">Check here if you used an alternative procedure authorized by DHS to examine documents.</span>
          </div>
        </div>

        <!-- Certification Text -->
        <div class="i9Form-border i9Form-border-black i9Form-p-1 i9Form-mb-2">
          <p class="i9Form-text-xs i9Form-mb-1 i9Form-font-medium">Certification: I attest, under penalty of perjury, that (1) I have examined the documentation presented by the above-named employee, (2) the above-listed documentation appears to be genuine and to relate to the employee named, and (3) to the best of my knowledge, the employee is authorized to work in the United States.</p>
        </div>

        <!-- Certification -->
        <div class="i9Form-border i9Form-border-black i9Form-p-1 i9Form-mb-2">
          <div class="i9Form-grid i9Form-grid-cols-2 i9Form-gap-1 i9Form-mb-1">
            <div class="i9Form-flex i9Form-flex-col">
              <label class="i9Form-text-xs i9Form-mb-1">First Day of Employment (mm/dd/yyyy):</label>
              <div class="i9Form-border i9Form-border-black i9Form-px-1 i9Form-py-1 i9Form-text-xs i9Form-h-5"></div>
            </div>
          </div>
          <div class="i9Form-grid i9Form-grid-cols-3 i9Form-gap-1 i9Form-mb-3">
            <div class="i9Form-flex i9Form-flex-col">
              <label class="i9Form-text-xs i9Form-mb-1">Last Name, First Name and Title of Employer or Authorized Representative</label>
              <div class="i9Form-border i9Form-border-black i9Form-px-1 i9Form-py-1 i9Form-text-xs i9Form-h-5"></div>
            </div>
            <div class="i9Form-flex i9Form-flex-col">
              <label class="i9Form-text-xs i9Form-mb-1">Signature of Employer or Authorized Representative</label>
              <div class="i9Form-border-b-2 i9Form-border-black i9Form-px-1 i9Form-py-1 i9Form-text-xs i9Form-h-5 i9Form-bg-transparent"></div>
            </div>
            <div class="i9Form-flex i9Form-flex-col">
              <label class="i9Form-text-xs i9Form-mb-1">Today's Date (mm/dd/yyyy)</label>
              <div class="i9Form-border i9Form-border-black i9Form-px-1 i9Form-py-1 i9Form-text-xs i9Form-h-5"></div>
            </div>
          </div>
          <div class="i9Form-border-t i9Form-border-black i9Form-pt-1">
            <div class="i9Form-grid i9Form-grid-cols-2 i9Form-gap-1">
              <div class="i9Form-flex i9Form-flex-col">
                <label class="i9Form-text-xs i9Form-mb-4">Employer's Business or Organization Name</label>
                <div class="i9Form-border i9Form-border-black i9Form-px-1 i9Form-py-1 i9Form-text-xs i9Form-h-5"></div>
              </div>
              <div class="i9Form-flex i9Form-flex-col">
                <label class="i9Form-text-xs i9Form-mb-1">Employer's Business or Organization Address, City or Town, State, ZIP Code</label>
                <div class="i9Form-border i9Form-border-black i9Form-px-1 i9Form-py-1 i9Form-text-xs i9Form-h-5"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
`;
};
