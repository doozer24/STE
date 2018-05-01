export class User {
  id: string;
  firstName: string;
  lastName: string;
  employeeId: string;
  title: string;
  active: boolean;
  supervisorId: string;
  startDate: Date;
  endDate: Date;
  loginId: string;
  password: string;
  email: string;
  phoneNumber: number;

  constructor(loginId: string, firstName: string, lastName: string, active: boolean = false) {
    this.loginId = loginId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.active = active;
  }
}
