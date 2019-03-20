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

let cart = [];
let cartTotalPrice;

function cartAdd (item, price) {
    cart.push({item: item, price: price})
}

function cartCountPrice (cart) {
    cartTotalPrice = 0;
    cart.forEach(function(it) {
        cartTotalPrice += it.price;
    });

    console.log("Total cart price is: ", cartTotalPrice);
}

//

cartAdd('salad',20);
cartAdd('ass',1488);
cartCountPrice(cart);

// 3
console.log("    > Task 3 <     ");