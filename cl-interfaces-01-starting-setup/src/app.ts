// type AddFn = (a: number, b: number) => number;
interface AddFn {
  (a: number, b: number): number;
}

let add: AddFn;

add = (n1: number, n2: number) => {
  return n1 + n2;
};

interface INamed {
  // readonly name: string;
  readonly name?: string;
  outputName?: string;
}

// interface IPerson {
// type Person = {
interface IGreetable extends INamed {
// interface IGreetable {
  // readonly name: string;
  // age: number;

  greet(phrase: string): void;
}

// class Person implements IGreetable, INamed {
class Person implements IGreetable {
  // name: string = '';
  // name?: string;
  age = 30;

  // constructor(public name: string = 'Superman') {}
  // constructor(name: string) {
  constructor(public name?: string) {
    /* if (name) {
      this.name = name;
    } */
    this.name ??= name;
  }

  greet(phrase: string) {
    if (this.name) {
      console.log(`${phrase} ${this.name}`);
    } else {
      console.log('Hi!');
    }
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
// user1 = new Person();
// user1.name = 'Manu';

user1.greet('Hi there - I am');
console.log(user1);
