const CURRENCY = '&#8381;';
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

//--------------------------------------------------------------------------------------------------------------------\\

function screenSwap() {
    document.getElementById('btn-swap').addEventListener("click", () => {
        let swap = document.getElementById('btn-swap').innerText;
        switch(swap) {
            case 'Корзина':
                document.getElementById('btn-swap').innerText = 'Каталог';
                document.getElementById('current').innerText = 'Корзина';
                Array.from(document.getElementsByClassName('products')).forEach(element => {element.innerHTML=''});
                // TODO: cart ui render
                break;
            case 'Каталог':
                document.getElementById('btn-swap').innerText = 'Корзина';
                document.getElementById('current').innerText = 'Каталог';
                Array.from(document.getElementsByClassName('products')).forEach(element => {element.innerHTML=''});
                catalog.renderItemElement(catalog.goods);
                break;
        }
    });
}

// function makeGETRequest(url, callback) {
//     let xhr;
//
//     if (window.XMLHttpRequest) {
//         xhr = new XMLHttpRequest();
//     } else if (window.ActiveXObject) {
//         xhr = new ActiveXObject("Microsoft.XMLHTTP");
//     }
//
//     xhr.onreadystatechange = () => {
//         if (xhr.readyState === 4) {
//             callback(xhr.responseText);
//         }
//     };
//
//     xhr.open('GET', url, true);
//     xhr.send();
// }

const promiseGETRequest = (url) => {
    return new Promise(resolve => {
        let xhr;

        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                resolve(xhr.responseText);
            }
        };

        xhr.open('GET', url, true);
        xhr.send();
    });
};

//--------------------------------------------------------------------------------------------------------------------\\

class Catalog {
    constructor (list) {
        this.goods = [
            //{id: 1, title: 'Notebook', price: 2000},
            //{id: 2, title: 'Mouse', price: 30},
            {id: 3, title: 'Клавиатура', price: 2150},
            {id: 4, title: 'Геймпад', price: 6500},
            {id: 5, title: 'Стул', price: 1650},
        ];
        this.renderItemElement();
        this.fetchGoods();
    }

    static _generateItemElement(item) {
        return `<div class="product-item">
                    <div>
                        <h3>${item.title}</h3>
                        <small>#${item.id}</small>
                    </div>
                    <img src="https://via.placeholder.com/200x100/888888/FFFFFF?text=${item.title}.jpeg" alt="placeholder">
                    <p>${item.price} ${CURRENCY}</p>
                    <button class="btn-buy" data-id="${item.id}">Добавить</button>
                </div>`;
    }

    renderItemElement(list = this.goods) {
        document.querySelector('.products').innerHTML = list.map(item => Catalog._generateItemElement(item)).join('');

        let classes = document.getElementsByClassName('btn-buy');
        Array.from(classes).forEach(element => {
            element.addEventListener('click', () => cart.add(element.getAttribute('data-id')));
        });
    }

    fetchGoods() {
        // makeGETRequest(`${API_URL}/catalogData.json`, goods => {
        //     JSON.parse(goods).map(item => {
        //         item.title  = item.product_name;
        //         item.id     = item.id_product;
        //
        //         delete item.product_name;
        //         delete item.id_product;
        //
        //         this.goods.push(item);
        //         this.renderItemElement();
        //     });
        // });

        promiseGETRequest(`${API_URL}/catalogData.json`).then((goods) => {
            JSON.parse(goods).map(item => {
                item.title  = item.product_name;
                item.id     = item.id_product;

                delete item.product_name;
                delete item.id_product;

                this.goods.push(item);
                this.renderItemElement();
            });
        });
    }
}

class Cart {
    // {id: 0, title:'name', price:0, total:0;}
    constructor() {
        this.items = [];
    }

    // TODO: ui render

    _getItemById(id) {
        let item = null;

        catalog.goods.forEach(prod => {
            if (prod.id === id) {
                item = prod;
            }
        });

        return item;
    }

    add(id) {
        let isFound = false;
        let item = this._getItemById(parseInt(id));

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
        this.items.forEach((it, id) => {
            if (it.id === item.id && it.total - total >= 0) {
                it.total -= total;
                if (it.total === 0) {
                    this.items.splice(id,1);
                }
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

window.onload = screenSwap();
let cart    = new Cart();
let catalog = new Catalog();

// Я не успел сделать визуальную часть для корзины, но консольные функции работают как должны
// cart.getPriceTotal() и cart.getItemsTotal() выводят суммарную цену и суммарное количество
// cart.add() и cart.remove() назначены на кнопки (+) и (-) на странице соответственно