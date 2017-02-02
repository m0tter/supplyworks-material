declare module 'supplyworks' {
  export interface Person {
    firstName: string;
    lastName: string;
    email: string;
  }

  export interface User extends Person {
    tchrId: string
    schoolId: string
  }

  export interface PersistedUser extends User {
    _id: string;
  }

  export interface AgreementBase {
    name: string;
    description: string;
    startDate: Date;
    rollingStart: boolean;
    maxLessons: number;
  }

  export interface Agreement extends AgreementBase {
    _id: string;
  }
}