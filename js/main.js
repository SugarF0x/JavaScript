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

console.log("> Generated a: "+a);
console.log("> Generated b: "+b);

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

function mathOperation(art1,art2,operation) {
    art1 = Number(art1);
    art2 = Number(art2);
    operation = Number(operation);
    switch (operation) {
        case 1: {
            return art1+art2;
        }
        case 2: {
            return art1-art2;
        }
        case 3: {
            return art1*art2;
        }
        case 4: {
            return art1/art2;
        }
        default: {
            return '> Введена некорректная операция <'
        }
    }
}

// You can use this one instead if you want to manually insert values
// The currently used function takes random numbers yet again and shoved the answer into the console
// (not a big fan of popup prompts all over teh screen)

/*
alert(mathOperation(
    prompt('Введите первый аргумент: '),
    prompt('Введите второй аргумент: '),
    prompt('Введите операцию (1 - сложение, 2 - вычитание, 3 - умножение, 4 - деление): ')
));
console.log("> Answer alerted <")
*/

console.log(mathOperation(a,b,getRandomInt(1,4)));

// 6

console.log("\n   < Task 6 >  ");

function power(val,pow) {
    val = Number(val);
    pow = Number(pow);
    if (val < 0) val *= -1;
    if (pow < 0) pow *= -1;

    if (pow === 0) return 1;
    else return val * power(val, pow-1);
}

/*
alert(power(
    prompt("Введите число: "),
    prompt("Введите степень: ")
));
console.log("> Answer alerted <")
*/

console.log(power(a,b));