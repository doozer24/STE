export class User {
  id: string;
  firstName: string;
  lastName: string;
  employeeId: string;
  title: string;
  isActive: boolean;
  supervisorId: string;
  startDate: Date;
  endDate: Date;
  loginId: string;
  password: string;
  email: string;
  phoneNumber: number;

  constructor(loginId: string, firstName: string, lastName: string, isActive: boolean = false) {
    this.loginId = loginId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.isActive = isActive;
  }
}
