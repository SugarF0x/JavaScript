"use strict";

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Task 1 \\ -----------------------------------------------------------------------------------------------------------
console.log(' > Task 1 < ');

let chessBoard = {
    render(rows, columns) {
        let table = this.generate(rows, columns);
        document.body.insertAdjacentHTML('beforeend', table);
    },

    generate(rows, columns) {
        let board = '';

        for (let y = 1; y <= rows; y++) {
            board += '<tr>';
            for (let x = 1; x <= columns; x++) {
                board += '<td style="height: 32px; width: 32px; text-align: center; background-color: ';
                if (y % 2 === 1) {
                    if (x % 2 === 1) {
                        board += 'black; color: white;"';
                    } else {
                        board += 'white;"';
                    }
                } else {
                    if (x % 2 === 0) {
                        board += 'black; color: white;"';
                    } else {
                        board += 'white;"';
                    }
                }
                board += '>' + this.getCharByDigit(y) + x + '</td>';
            }
            board += '</tr>';
        }
        return '<table style="border: 1px solid black; border-collapse: collapse;"><tbody>' + board + '</tbody></table>';
    },

    getCharByDigit(digit) {
        // well i could make it via an array disassemble so that it returns AA if digit is 27 or AB if its is 28 and etc, but nah

        switch(digit) {
            case 1:  return 'A';
            case 2:  return 'B';
            case 3:  return 'C';
            case 4:  return 'D';
            case 5:  return 'E';
            case 6:  return 'F';
            case 7:  return 'G';
            case 8:  return 'H';
            case 9:  return 'I';
            case 10: return 'J';
            case 11: return 'K';
            case 12: return 'L';
            case 13: return 'M';
            case 14: return 'N';
            case 15: return 'O';
            case 16: return 'P';
            case 17: return 'Q';
            case 18: return 'R';
            case 19: return 'S';
            case 20: return 'T';
            case 21: return 'U';
            case 22: return 'V';
            case 23: return 'W';
            case 24: return 'X';
            case 25: return 'Y';
            case 26: return 'Z';
        }
    }
};

//chessBoard.render(8,8);
chessBoard.render(getRandomInt(1,26),getRandomInt(1,26));
console.log('This task is displayed in HTML');

// Task 2 \\ -----------------------------------------------------------------------------------------------------------
console.log(' > Task 2 < ');

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
    },

    generateTable() {
        let tdStyle = 'style="border: 1px solid black; padding: 3px;">';

        if (this.items.length === 0) return "Корзина пуста";

        let board = '';

        for (let y = 0; y <= this.items.length-1; y++) {
            board += '<tr>';
                board += '<td ' + tdStyle + this.items[y].name + '</td>';
                board += '<td ' + tdStyle + this.items[y].price + '</td>';
                board += '<td ' + tdStyle + this.items[y].amount + '</td>';
            board += '</tr>';
        }
        return '<table style="border: 2px solid black; border-collapse: collapse;"><tbody><tr><td ' + tdStyle + 'Товар</td><td ' + tdStyle + 'Стоимость</td><td ' + tdStyle + 'Количество</td></tr>' +
            board +
            '<tr><td ' + tdStyle + 'Всего:</td><td ' + tdStyle +  this.getPriceTotal() + '</td><td ' + tdStyle + this.getAmountTotal() + '</td></tr></tbody></table>';
    },

    render() {
        let table = this.generateTable();
        document.body.insertAdjacentHTML('beforeend', table);
    }
};

// cart functions I copy-pasted from lesson 4 and added <generateTable> and <render> functions to it ₍₍ (ง ˙ω˙)ว ⁾⁾

for (let i = 1; i <= getRandomInt(1,25); i++) {
    cart.add(goods[getRandomInt(0,6)]);
}
cart.render();

console.log('This task is displayed in HTML');