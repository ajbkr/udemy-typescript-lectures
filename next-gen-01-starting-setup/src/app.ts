/* const userName = 'Max';
// userName = 'Maximilian';  // error
let age = 30;

age = 29; */

/* function add (a: number, b: number) {
  let result;

  result = a + b;
  return result;
} */

/* if (age > 20) {
  let isOld = true;
}

console.log(isOld); */

/* const add = (a: number, b: number = 1) => a + b;

// const printOutput = (a: number | string) => console.log(a);
const printOutput: (a: number | string) => void = output => console.log(output);

const button = document.querySelector('button');

if (button) {
  button.addEventListener('click', event => console.log(event));
}

// console.log(add(2, 5));
// printOutput(add(5, 2));
printOutput(add(5)); */

const hobbies = ['Sport', 'Cooking'];
// const activeHobbies = ['Hiking', ...hobbies];
const activeHobbies = ['Hiking'];

// activeHobbies.push(hobbies[0], hobbies[1]);
activeHobbies.push(...hobbies);
// console.log(activeHobbies);

const person = {
  firstName: 'Max',
  age: 30
}

// const copiedPerson = person;
const copiedPerson = { ...person };

copiedPerson.firstName = 'Andrew';
console.log(person.firstName);

// const add = (...numbers: [number, number, number, number]) =>
const add = (...numbers: number[]) =>
  numbers.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0
  );

const addedNumbers = add(5, 10, 2, 3.7);
console.log(addedNumbers);

// const hobby1 = hobbies[0];
// const hobby2 = hobbies[1];

/*const [hobby1, hobby2] = hobbies;
console.log(hobby1);
console.log(hobby2);*/

const [hobby1, hobby2, ...remainingHobbies] = activeHobbies;
console.log(hobby1);
console.log(hobby2);
console.log(remainingHobbies);

console.log(activeHobbies, hobby1, hobby2);

const { firstName: userName, age } = person;
// console.log(firstName);  // error
console.log(userName, age, person);