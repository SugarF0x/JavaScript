const CartItem = {
    props: ['item', 'img'],
    template: `
        <div class="cart-item">
            <div class="product-bio">
                <img :src="img" :alt="item.product_name">
                <div class="product-desc">
                    <p class="product-title">{{ item.product_name }}</p>
                    <p class="product-quantity">Количество: {{ item.quantity }}</p>
                    <p class="product-single-price">по {{ item.price }}</p>
                </div>
            </div>
            <div class="right-block">
                <p class="product-price">{{ item.price * item.quantity }}</p>
                <button class="del-btn" @click="$emit('remove', item)">&times;</button>
            </div>
        </div>
    `
};

Vue.component('cart', {
    data() {
        return {
            imgCart: `https://placehold.it/50x100`,
            isVisibleCart: false,
            cart: []
        }
    },
    template: `        
        <div class="wrap">
            <button class="btn-cart" type="button" @click="isVisibleCart = !isVisibleCart">Корзина</button>
            <div v-show="isVisibleCart" class="cart-block">
                <cart-item 
                    v-for="item of cart" 
                    :key="item.id_product"
                    :item="item"
                    :img="imgCart"
                    @remove="removeProduct"
                ></cart-item>
                <div v-if="!cart.length"><b>Корзина пуста</b></div>
            </div>
        </div>
    `,
    components: {
        'cart-item': CartItem
    },
    methods: {
        addProduct(product){
            let find = this.cart.find(el => el.id_product === product.id_product);
            if(find){
                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1})
                    .then(data => {
                        if(data.result){
                            find.quantity++;
                        }
                    })
            } else {
                let prod = Object.assign({quantity: 1}, product);
                this.$parent.postJson(`api/cart`, prod)
                    .then(data => {
                        if(data.result){
                            this.cart.push(prod);
                        }
                    })
            }
        },
        removeProduct(product) {
            let find = this.cart.find(el => el.id_product === product.id_product);
            if(find){
                if(find.quantity > 1) {
                    this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: -1})
                        .then(data => {
                            if(data.result){
                                find.quantity--;
                            }
                        })
                } else {
                    this.$parent.deleteJson(`/api/cart/${find.id_product}`)
                        .then(data => {
                            if(data.result){
                                this.cart.splice(this.cart.indexOf(product),1)
                            }
                        })
                }
            } else {
                console.log('There is no such product in cart');
            }
        }
    },
    mounted() {
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                this.cart = data;
            });
    }
});