/*const person: {
  name: string;
  age: number;
} = {*/
/*const person: {
  name: string;
  age: number;
  hobbies: string[];
  role: [number, string];
} = {*/

/*const ADMIN = 0;
const READ_ONLY = 1;
const AUTHOR = 2;*/

enum Role {
  ADMIN = 'ADMIN',
  READ_ONLY = 100,
  AUTHOR = 'AUTHOR'
};

const person = {
  name: 'Andrew',
  age: 43,
  hobbies: ['Reading', 'Cooking'],
  role: Role.ADMIN
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

if (person.role === Role.AUTHOR) {
  console.log('is author');
}
