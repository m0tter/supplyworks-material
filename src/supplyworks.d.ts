declare module 'supplyworks' {
  export interface Person {
    firstName: string;
    lastName: string;
    email: string;
  }

  export interface Teacher extends Person {
    tchrId: string
    schoolId: string
  }
}