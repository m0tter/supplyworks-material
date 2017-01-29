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

  export interface APIResult {
    success: boolean;
    data: any;
  }
}