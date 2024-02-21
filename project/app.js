function add(n1, n2) {
    return n1 + n2;
}
function printResult(num) {
    console.log('Result: ' + num);
}
function addAndHandle(n1, n2, cb) {
    var result = n1 + n2;
    cb(result);
}
printResult(add(5, 12));
//let combineValues: Function;
//let combineValues: ((a: number, b: number) => number) | ((a: number) => void);
var combineValues;
combineValues = add;
//combineValues = printResult;
//combineValues = 5;
console.log(combineValues(8, 8));
//let someValue: undefined;
addAndHandle(10, 20, function (result) {
    console.log(result);
});
