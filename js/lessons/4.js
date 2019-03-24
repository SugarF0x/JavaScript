"use strict";

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function div(val, by){
    return (val - val % by) / by;
}

// 1
console.log("\n > Task 1 < \n");

function getDecs(number) {
    if (number > 999) {
        console.log('The number is greater than 999 (' + number + ')\n' +
            'Returning empty object');
        return {};
    }

    let
        hundreds =   div(number,100),
        tens     =   div(number - hundreds*100,10),
        singles  =      number - hundreds*100 - tens*10;


    return {
        hundreds: hundreds,
        tens: tens,
        singles: singles
    }
}

console.log(getDecs(getRandomInt(0,1280)));

// 2
console.log("\n > Task 2 < \n");



// 3
console.log("\n > Task 3 < \n");