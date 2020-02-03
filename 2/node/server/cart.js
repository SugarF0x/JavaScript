let add = (cart, req) => {
    cart.push(req.body);
    return JSON.stringify(cart, null, 4);
};
let change = (cart, req) => {
    let find = cart.find(el => el.id_product === +req.params.id);
        // IF wrap for cases when a button is spammed and server tries to deduct 1 from undefined cart item
    if (find) {
        find.quantity += req.body.quantity;
        if (find.quantity === 0) {
            const index = cart.indexOf(find);
            if (index > -1) {
                cart.splice(index, 1);
            }
        }
    }
    return JSON.stringify(cart, null, 4);
};

module.exports = {
    add,
    change
};