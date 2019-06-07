const currency = '$';

const products = [
    {id: 1, title: 'Notebook', price: 2000},
    {id: 2, title: 'Mouse', price: 30},
    {id: 3, title: 'Keyboard', price: 55},
    {id: 4, title: 'Gamepad', price: 65},
    {id: 5, title: 'Chair', price: 165},
];

const renderProduct = (item) => {
    return `<div class="product-item">
                <h3>${item.title}</h3>
                <img src="https://via.placeholder.com/200x100/888888/FFFFFF?text=${item.title}.jpeg" alt="placeholder">
                <p>${item.price} ${currency}</p>
                <div class="btn-buy">
                    <button onclick="cart.remove(products[${item.id-1}])">-</button>
                    <button onclick="cart.add(products[${item.id-1}])">+</button>
                </div>
            </div>`
};

const renderPage = (list = [{id:0, title: 'Not Defined', price: 0}]) => {
    document.querySelector('.products').innerHTML = list.map(item => renderProduct(item)).join('');
};

//--------------------------------------------------------------------------------------------------------------------\\

class Cart {
    // {id: 0, title:'name', price:0, total:0;}
    constructor() {
        this.items = [];
    }

    add(item) {
        let isFound = false;

        this.items.forEach(it => {
            if (it.id === item.id) {
                it.total++;
                isFound = true;
            }
        });

        if (!isFound) {
            this.items.push(new Product({id: item.id, title: item.title, price: item.price, total: 1}));
        }
    }

    remove(item, total=1) {
        this.items.forEach(it => {
            if (it.id === item.id && it.total - total >= 0) {
                it.total -= total;
            }
        });
    }

    getItemsTotal() {
        let sum = 0;
        this.items.forEach(item => sum += item.total);
        return sum;
    }

    getPriceTotal() {
        let sum = 0;
        this.items.forEach(item => sum += item.getPriceTotal());
        return sum;
    }
}

class Product {
    constructor(properties) {
        this.id    = properties.id;
        this.title = properties.title;
        this.price = properties.price;
        this.total = properties.total;
    }

    getPriceTotal() {
        return this.price * this.total;
    }
}

//--------------------------------------------------------------------------------------------------------------------\\

renderPage(products);
let cart = new Cart();

// Я не успел сделать визуальную часть для корзины, но консольные функции работают как должны
// cart.getPriceTotal() и cart.getItemsTotal() выводят суммарную цену и суммарное количество
// cart.add() и cart.remove() назначены на кнопки (+) и (-) на странице соответственно