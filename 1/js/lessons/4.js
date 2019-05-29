"use strict";

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function div(val, by){
    return (val - val % by) / by;
}

// 1 \\ ----------------------------------------------------------------------------------------------------------------
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

// 2 \\ ----------------------------------------------------------------------------------------------------------------
console.log("\n > Task 2 < \n");

let goods = [
    {name: 'Sub 2 PdP', price: 0},
    {name: 'G-Fuel',    price: 69},
    {name: 'Memes',     price: 250},
    {name: 'Chair',     price: 399},
    {name: 'News',      price: 780},
    {name: 'TikTok Ads',price: 999},
    {name: 'Legs',      price: 1280}
];

let cart = {
    items: [],

    add(good) {
        let isFound = false;

        this.items.forEach(function (it) {
            if (it.name === good.name) {
                it.amount++;
                isFound = true;
            }
        });

        if (!isFound) {
            this.items.push({name: good.name, price: good.price, amount: 1});
        }
    },

    getPriceTotal() {
        let price = 0;
        this.items.forEach(function (it) {
            price += it.price*it.amount;
        });
        return price;
    },

    getAmountTotal() {
        let amount = 0;
        this.items.forEach(function (it) {
            amount += it.amount;
        });
        return amount;
    }
};

//

for (let i = 1; i <= getRandomInt(1,25); i++) {
    cart.add(goods[getRandomInt(0,6)]);
}

//console.log(cart);
console.log('Cart item amount: ' + cart.getAmountTotal());
console.log('Cart price total: ' + cart.getPriceTotal());

// 3 \\ ----------------------------------------------------------------------------------------------------------------
console.log("\n > Task 3 < \n");

console.log("Nope");