import mongoose, { Schema, Document } from 'mongoose';

// ─── Enums ───
const EmploymentType = ['Intern', 'Temporary'];
const OvertimePreference = ['Yes', 'No'];
const GraduationStatus = ['Graduated', 'Not Graduate'];
const typeStatus = ['Yes', 'No'];
const ICitizenship = ['citizen', 'resident', 'workauth'];
const IW4Status = ['single', 'married', 'marriedHigher'];
const I9Status = ['citizen', 'noncitizen', 'permanent', 'noncitizen_other'];

// ─── Sub-schemas ───
const ContactInfoSchema = new Schema(
  {
    name: String,
    relationship: String,
    phone: String,
  },
  { _id: false }
);

const EducationInfoSchema = new Schema(
  {
    schoolName: String,
    major: String,
    graduationStatus: { type: String, enum: GraduationStatus },
    yearsCompleted: Number,
    honorsReceived: Boolean,
  },
  { _id: false }
);

const BankAccountSchema = new Schema(
  {
    bankName: String,
    state: String,
    transitNo: String,
    accountNo: String,
    depositAmount: Number,
    depositPercentage: { type: Number, required: true },
    accountType: {
      type: String,
      enum: ['Checking', 'Savings'],
      required: true,
    },
  },
  { _id: false }
);

const GeneralInfoSchema = new Schema(
  {
    firstName: String,
    middleName: String,
    lastName: String,
    ssn: String,
    dateOfBirth: String,
    applicationDate: String,
    email: String,
    telephoneNumber: String,
    address: String,
    emergencyContact: ContactInfoSchema,
    desiredEmploymentType: { type: String, enum: EmploymentType },
    desiredSalary: Number,
    hourlyRate: Number,
    appliedPosition: String,
    department: String,
    overtime: { type: String, enum: OvertimePreference },
    startDate: String,
    previouslyApplied: Boolean,
    previousApplicationDate: String,
    previouslyEmployed: Boolean,
    previousSeparationReason: String,
    education: EducationInfoSchema,
    specialSkills: String,
    signature: String,
  },
  { _id: false }
);

const DirectDepositInfoSchema = new Schema(
  {
    name: String,
    ssn: String,
    checkingAccount: BankAccountSchema,
    savingsAccount: BankAccountSchema,
    accountFile: String,
    signature: String,
    signatureDate: String,
  },
  { _id: false }
);

// ─── I9 Forms ───
const BaseI9InfoSchema = new Schema(
  {
    lastName: String,
    firstName: String,
    middleName: String,
    otherNames: String,
    address: String,
    dateOfBirth: String,
    ssn: String,
    email: String,
    phone: String,
    signature: String,
    signatureDate: String,
  },
  { _id: false }
);

const I9InfoSchema = new Schema(
  {
    ...BaseI9InfoSchema.obj,
    status: { type: String, enum: I9Status },
    uscisNumber: String,
    admissionNumber: String,
    foreignPassportNumber: String,
  },
  { _id: false }
);

// ─── W4 Schema ───
const W4InfoSchema = new Schema(
  {
    firstName: String,
    middleName: String,
    lastName: String,
    ssn: String,
    address: String,
    fmaritalStatus: { type: String, enum: IW4Status },
    acceptedTerms: Boolean,
    childrenNo: Number,
    amount: Number,
    childrenDepencyNo: Number,
    eachDepencyAmount: Number,
    TotalDependencyAmount: Number,
    withHoldAmount: Number,
    deductedAmount: String,
    extraWithHoldingAmount: Number,
    signature: String,
    signatureDate: String,
  },
  { _id: false }
);

// ─── Citizenship Documents ───
const CitizenShipSchema = new Schema(
  {
    citizenshipStatus: { type: String, enum: ICitizenship },
    photoID: String,
    socialSecurityCard: String,
    residentCard: String,
    workAuthorizationDocument: String,
  },
  { _id: false }
);

// ─── Employee Info ───
const TerminationInfoSchema = new Schema(
  {
    terminationStatus: { type: String, enum: typeStatus },
    terminationCount: Number,
  },
  { _id: false }
);

const ManualAgreementTerminationSchema = new Schema(
  {
    terminatedByManualAgreement: { type: String, enum: typeStatus },
    terminationCount: Number,
  },
  { _id: false }
);

const ResignationInsteadOfTerminationSchema = new Schema(
  {
    resignedInsteadOfTerminated: { type: String, enum: typeStatus },
    resignationCount: Number,
  },
  { _id: false }
);

const TerminationDetailsOfEmployeeSchema = new Schema(
  {
    name: String,
    position: String,
    company: String,
    telephone: String,
    occupation: String,
    bestTimeToCall: String,
    workRelation: String,
    NoOfYearKnown: String,
  },
  { _id: false }
);

const EmployeeSchema = new Schema(
  {
    name: String,
    address: String,
    telephone: String,
    dateEmployeeFrom: Date,
    dateEmployeeTo: Date,
    jobTitle: String,
    duties: String,
    supervisorName: String,
    MayWeContact: Boolean,
    wagesStart: String,
    final: String,
    reasonForLeaving: String,
    terminationReason: String,
    disciplinaryAction: String,
    noticePeriod: String,
  },
  { _id: false }
);

const EmployeeInfoSchema = new Schema(
  {
    employee1: EmployeeSchema,
    employee2: EmployeeSchema,
    terminationInfo: TerminationInfoSchema,
    manualAgreementTermination: ManualAgreementTerminationSchema,
    resignationInsteadOfTermination: ResignationInsteadOfTerminationSchema,
    explanation: String,
    terminationDetailsOfEmployee: [TerminationDetailsOfEmployeeSchema],
  },
  { _id: false }
);

// ─── Driving License Info ───
const ValidDriverLicenseSchema = new Schema(
  {
    hasDriverLicense: { type: String, enum: ['Yes', 'No'] },
    licenseNo: Number,
    state: String,
    expirationDate: Date,
    reason: String,
  },
  { _id: false }
);

const LicenseSuspensionInfoSchema = new Schema(
  {
    licenseSuspendedOrRevoked: { type: String, enum: ['Yes', 'No'] },
    reason: String,
  },
  { _id: false }
);

const PersonalAutoInsuranceSchema = new Schema(
  {
    hasPersonalAutoInsurance: { type: String, enum: ['Yes', 'No'] },
    reason: String,
  },
  { _id: false }
);

const PersonalAutoInsuranceHistorySchema = new Schema(
  {
    insuranceDeniedOrTerminated: { type: String, enum: ['Yes', 'No'] },
    reason: String,
  },
  { _id: false }
);

const MovingTrafficViolationSchema = new Schema(
  {
    offense: String,
    date: Date,
    laction: String,
    comment: String,
  },
  { _id: false }
);

const DrivingLicenceInfoSchema = new Schema(
  {
    validDriverLicense: ValidDriverLicenseSchema,
    licenseSuspensionInfo: LicenseSuspensionInfoSchema,
    personalAutoInsurance: PersonalAutoInsuranceSchema,
    personalAutoInsuranceHistory: PersonalAutoInsuranceHistorySchema,
    movingTrafficViolation: [MovingTrafficViolationSchema],
  },
  { _id: false }
);

// ─── Applicant Clarification ───
const ApplicantCarificationSchema = new Schema(
  {
    check: Boolean,
    signature: String,
    signatureDate: Date,
  },
  { _id: false }
);

const AccidentProcedureSchema = new Schema(
  {
    signature: String,
    signatureDate: Date,
  },
  { _id: false }
);

const SubmittalPolicyInfoSchema = new Schema(
  {
    check: Boolean,
    signature: String,
    signatureDate: Date,
  },
  { _id: false }
);

const SubmittalPolicySchema = new Schema(
  {
    submittalPolicyDirectUnderstand: SubmittalPolicyInfoSchema,
    submittalPolicyExplainUnderstand: SubmittalPolicyInfoSchema,
  },
  { _id: false }
);

// ─── Main Form Schema ───
const TemporaryFormSchema = new Schema(
  {
    generalInfo: GeneralInfoSchema,
    employeeInfo: EmployeeInfoSchema,
    drivingLicenceInfo: DrivingLicenceInfoSchema,
    applicantCarification: ApplicantCarificationSchema,
    substanceAbusepolicy: String,
    accidentProcedure: AccidentProcedureSchema,
    submittalPolicy: SubmittalPolicySchema,
    bankForm: DirectDepositInfoSchema,
    i9Form: I9InfoSchema,
    w4Form: W4InfoSchema,
    citizenShipForm: CitizenShipSchema,
  },
  { timestamps: true }
);

// ─── Model ───
export const TemporaryFormModel = mongoose.model<Document>(
  'TemporaryForm',
  TemporaryFormSchema
);
