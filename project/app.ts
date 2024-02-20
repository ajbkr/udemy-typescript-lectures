/*const person: {
  name: string;
  age: number;
} = {*/
const person: {
  name: string;
  age: number;
  hobbies: string[];
  role: [number, string];
} = {
  name: 'Andrew',
  age: 43,
  hobbies: ['Reading', 'Cooking'],
  role: [2, 'author']
};

//person.role.push('admin');
//person.role[person.role.length] = 'admin';
//person.role[1] = 10;

//person.role = [0, 'admin', 'user'];

let favouriteActivities: string[];
favouriteActivities = ['Reading'];

console.log(person.name);

for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase());
  //console.log(hobby.map());  // !!! ERROR !!!
}
