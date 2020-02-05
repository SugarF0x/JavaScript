let add = (cart, req) => {
    cart.push(req.body);
    return JSON.stringify(cart, null, 4);
};

let change = (cart, req) => {
    let find = cart.find(el => el.id_product === +req.params.id);
    find.quantity += req.body.quantity;
    return JSON.stringify(cart, null, 4);
};

let remove = (cart, req) => {
    let find = cart.find(el => el.id_product === +req.params.id);
        // IF wrap for cases when a button is spammed and server tries to deduct 1 from undefined cart item
    if (find) {
        cart.splice(cart.indexOf(find), 1);
    }
    return JSON.stringify(cart, null, 4);
};

module.exports = {
    add,
    change,
    remove
};