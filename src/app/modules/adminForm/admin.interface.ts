// enums/admin.enum.ts
export enum CHECK_ONE {
  NEW_HIRED = 'new_hired',
  REHIRED = 'rehired',
}

export enum JOB_STATUS {
  FULL_TIME = 'full_time',
  PART_TIME = 'part_time',
}

export enum PAY_RATE {
  HOURLY = 'hourly',
  OT_EXEMPT = 'o.t_exempt',
  OT_NON_EXEMPT = 'o.t_non_exempt',
}

export interface IAdminForm {
  checkOne: CHECK_ONE;
  jobStatus: JOB_STATUS;
  jobDescription: string;
  wcCode: string;
  hireDate: Date;
  terminateDate?: Date;
  payRate: PAY_RATE;
  salaryAmount: number;
  regularRateSalary?: number;
  otRate?: number;
  workHoursPerPeriod?: number;
  receivedBy: string; // file image or pdf.
  receivedDate: Date;
}
