"use strict";

// 1
console.log("    > Task 1 <     ");

let a = [
    [{name: 'Mary', age: 23}, {name: 'Mike', age: 45}, {name: 'Nick', age: 11}],
    [{name: 'Adam', age: 56}, {name: 'Sara', age: 21}, {name: 'Don', age: 22}],
    [{name: 'Karl', age: 34}, {name: 'Marta', age: 76}, {name: 'John', age: 19}]
];

let b = Object.assign({}, a);
//a[0][0].name = "Saladass";    // dunno whats up, but for me <b> value also updates and console displays Saladass instead of Mary, tho i did as instructed :/
console.log(b);

// 2
console.log("    > Task 2 <     ");



