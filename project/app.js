/*const person: {
  name: string;
  age: number;
} = {*/
var person = {
    name: 'Andrew',
    age: 43,
    hobbies: ['Reading', 'Cooking'],
    role: [2, 'author']
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
