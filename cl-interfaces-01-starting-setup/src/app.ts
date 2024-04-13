class Department {
  /* private readonly id: string;
  private name: string; */
  protected employees: string[] = [];

  constructor(private readonly id: string, public name: string) {
    // this.id = id;
    // this.name = n;
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
  constructor(id: string, private reports: string[]) {
    super(id, 'Accounting');
  }

  addEmployee(name: string) {
    if (name === 'Max') {
      return;
    }
    this.employees.push(name);
  }

  addReport(text: string) {
    this.reports.push(text);
  }

  printReports() {
    console.log(this.reports);
  }
}

const accounting = new AccountingDepartment('d1', []);
const it = new ITDepartment('d2', ['Max']);

accounting.addReport('Something went wrong...');

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
