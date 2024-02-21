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
var Role;
(function (Role) {
    Role["ADMIN"] = "ADMIN";
    Role[Role["READ_ONLY"] = 100] = "READ_ONLY";
    Role["AUTHOR"] = "AUTHOR";
})(Role || (Role = {}));
;
var person = {
    name: 'Andrew',
    age: 43,
    hobbies: ['Reading', 'Cooking'],
    role: Role.ADMIN
};
//person.role.push('admin');
//person.role[person.role.length] = 'admin';
//person.role[1] = 10;
//person.role = [0, 'admin', 'user'];
var favouriteActivities;
favouriteActivities = ['Reading'];
console.log(person.name);
for (var _i = 0, _a = person.hobbies; _i < _a.length; _i++) {
    var hobby = _a[_i];
    console.log(hobby.toUpperCase());
    //console.log(hobby.map());  // !!! ERROR !!!
}
if (person.role === Role.AUTHOR) {
    console.log('is author');
}
