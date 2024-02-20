/*const person: {
  name: string;
  age: number;
} = {*/
const person = {
  name: 'Andrew',
  age: 43,
  hobbies: ['Reading', 'Cooking']
};

let favouriteActivities: string[];
favouriteActivities = ['Reading'];

console.log(person.name);

for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase());
  //console.log(hobby.map());  // !!! ERROR !!!
}
