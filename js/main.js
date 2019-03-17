"use strict";

// 1

console.log("\n   < Task 1 >  ");

let a = 1, b = 1, c, d;
c = ++a; console.log(c);          // 2 - сначала прибавляем к <a>, и после этого присваиваем
d = b++; console.log(d);          // 1 - наоборот, сначала присваиваем, а потом прибавляем к <b>
c = (2+ ++a); console.log(c);     // 5 - <a> уже 2, прибавляем к ней 1, того 3, и уже после всего этого 2+, того 5
d = (2+ b++); console.log(d);     // 4 - опять же, так же история - прибавление к <b> идёт после присваивания
console.log(a);                   // 3 - у нас фигурирует два ++а, что даёт нам 3
console.log(b);                   // 3 - как и с <a>, с <b> фигурирует два b++

// 2

console.log("\n   < Task 2 >  ");

let y = 2;                  // y *= 2 это всё равно что y = y*2
let x = 1 + (y *= 2);       // следовательно, х = 1 + (2*2) = 5
console.log(x);

// 3

console.log("\n   < Task 3 >  ");

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

a = getRandomInt(-9,9);
b = getRandomInt(-9,9);

console.log("Generated a: "+a);
console.log("Generated b: "+b);

if (a >=0 && b >= 0) {
    console.log(a-b);
} else if (a < 0 && b < 0) {
    console.log(a*b);
} else if (a < 0 && b >= 0 || a >= 0 && b < 0) {
    console.log(a+b);
}

// 4

console.log("\n   < Task 4 >  ");

function arPlus(a,b) {
    return a+b;
}

function arMinus(a,b) {
    return a-b;
}

function arMult(a,b) {
    return a*b;
}

function arDiv(a,b) {
    return a/b;
}

// Im using the randomly generated <a> and <b> from task 3 here

console.log(arPlus(a,b));
console.log(arMinus(a,b));
console.log(arMult(a,b));
console.log(arDiv(a,b));

// 5

console.log("\n   < Task 5 >  ");