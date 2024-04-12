const userName = 'Max';
// userName = 'Maximilian';  // error
let age = 30;

age = 29;

/* function add (a: number, b: number) {
  let result;

  result = a + b;
  return result;
} */

/* if (age > 20) {
  let isOld = true;
}

console.log(isOld); */

const add = (a: number, b: number = 1) => a + b;

// const printOutput = (a: number | string) => console.log(a);
const printOutput: (a: number | string) => void = output => console.log(output);

const button = document.querySelector('button');

if (button) {
  button.addEventListener('click', event => console.log(event));
}

// console.log(add(2, 5));
// printOutput(add(5, 2));
printOutput(add(5));

const hobbies = ['Sport', 'Cooking'];
// const activeHobbies = ['Hiking', ...hobbies];
const activeHobbies = ['Hiking'];

// activeHobbies.push(hobbies[0], hobbies[1]);
activeHobbies.push(...hobbies);
// console.log(activeHobbies);

const person = {
  name: 'Max',
  age: 30
}

// const copiedPerson = person;
const copiedPerson = { ...person };

copiedPerson.name = 'Andrew';
console.log(person.name);