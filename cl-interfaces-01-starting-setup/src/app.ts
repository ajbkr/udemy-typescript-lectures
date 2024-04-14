// interface IPerson {
// type Person = {
interface IGreetable {
  readonly name: string;
  // age: number;

  greet(phrase: string): void;
}

class Person implements IGreetable {
  // name: string = '';
  age = 30;

  constructor(public name: string = '') {}

  greet(phrase: string) {
    console.log(`${phrase} ${this.name}`);
  }
}

// let user1: IPerson;
let user1: IGreetable;
// let user1: Person;

/* user1 = {
  name: 'Max',
  // age: 30,

  greet(phrase: string) {
    console.log(`${phrase} ${this.name}`);
  }
}; */

user1 = new Person('Max');
// user1.name = 'Manu';

user1.greet('Hi there - I am');
console.log(user1);
