const currency = '$';

const products = [
    {id: 1, title: 'Notebook', price: 2000},
    {id: 2, title: 'Mouse', price: 30},
    {id: 3, title: 'Keyboard', price: 55},
    {id: 4, title: 'Gamepad', price: 65},
    {id: 5, title: 'Chair', price: 165},
];

const renderProduct = (title = '[название]', price = '[цена]') => {
    return `<div class="product-item">
                <h3>${title}</h3>
                <img src="https://via.placeholder.com/200x100/888888/FFFFFF?text=${title}.jpeg" alt="placeholder"></img>
                <p>${price} ${currency}</p>
                <button class="btn-buy">Купить</button>
            </div>`
};

const renderPage = (list = [{id:0, title: 'Not Defined', price: 0}]) => {
    document.querySelector('.products').innerHTML = list.map(item => renderProduct(item.title, item.price)).join('');
        // запятые отображались так как при внесении в качестве аргумента к .innerHTML массива, вносятся все его элементы через запятую
        // через метод .join() можно превратить веьс массив в один большой String без запятых

        // также не было необходимости создавать отдельную константу для последующего внесения её значения в document.querySelector()
        // можно функцию сразу передать селектору в качестве значения
};

renderPage(products);