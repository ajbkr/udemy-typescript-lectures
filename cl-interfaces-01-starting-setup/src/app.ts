class Department {
  static fiscalYear = 2020;

  /* private readonly id: string;
  private name: string; */
  protected employees: string[] = [];

  constructor(private readonly id: string, public name: string) {
    // this.id = id;
    // this.name = n;
    // console.log(Department.fiscalYear);
  }

  static createEmployee(name: string) {
    return { name: name };
  }

  addEmployee(employee: string) {
    // validation, etc.
    // this.id = 'd2';
    this.employees.push(employee);
  }

  describe(this: Department) {
    console.log(`Department (${this.id}): ${this.name}`);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

class ITDepartment extends Department {
  admins: string[];

  constructor(id: string, admins: string[]) {
    super(id, 'IT');
    this.admins = admins;
  }
}

class AccountingDepartment extends Department {
  private lastReport: string;

  constructor(id: string, private reports: string[]) {
    super(id, 'Accounting');
    this.lastReport = reports[0];
  }

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error('No report found');
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error('Please pass in a valid value!');
    }
    this.addReport(value);
  }

  addEmployee(name: string) {
    if (name === 'Max') {
      return;
    }
    this.employees.push(name);
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  printReports() {
    console.log(this.reports);
  }
}

const employee1 = Department.createEmployee('Max');
console.log(employee1, Department.fiscalYear);

const accounting = new AccountingDepartment('d1', []);
const it = new ITDepartment('d2', ['Max']);

accounting.mostRecentReport = 'Year End Report';

accounting.addReport('Something went wrong...');

console.log(accounting.mostRecentReport);

accounting.printReports();

accounting.addEmployee('Max');
accounting.addEmployee('Manu');

// accounting.employees[2] = 'Anna';

it.addEmployee('Andrew');
it.addEmployee('Becky');

accounting.describe();
// accounting.name = 'NEW NAME';
accounting.printEmployeeInformation();

/* const accountingCopy = { name: 'DUMMY', describe: accounting.describe };

accountingCopy.describe(); */

it.describe();
it.printEmployeeInformation();

console.log(it);
