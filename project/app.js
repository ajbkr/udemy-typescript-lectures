/*const person: {
  name: string;
  age: number;
} = {*/
var person = {
    name: 'Andrew',
    age: 43,
    hobbies: ['Reading', 'Cooking']
};
var favouriteActivities;
favouriteActivities = ['Reading'];
console.log(person.name);
for (var _i = 0, _a = person.hobbies; _i < _a.length; _i++) {
    var hobby = _a[_i];
    console.log(hobby.toUpperCase());
    //console.log(hobby.map());  // !!! ERROR !!!
}
