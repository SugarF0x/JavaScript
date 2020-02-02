const ProductItem = {
    props: ['item', 'img'],
    template: `
        <div class="product-item">
            <img :src="img" :alt="item.product_name">
            <div class="desc">
                <h3>{{ item.product_name }}</h3>
                <p>{{ item.price }}</p>
                <button class="buy-btn" @click="$root.$refs.cart.addProduct(item)">Купить</button>
            </div>
        </div>
    `
};

Vue.component('products', {
    data() {
        return {
            catalogUrl: `/catalogData.json`,
            imgCatalog: `https://placehold.it/200x150`,
            filtered: [],
            products: []
        }
    },
    template: `
        <div v-if="filtered.length" class="products">
            <product-item  
                v-for="item of filtered"
                :key="item.id_product"
                :item="item"
                :img="imgCatalog"
            ></product-item>
        </div>
        <div v-else class='droids'>
            <h1>These are not the droids you are looking for</h1>
        </div>
    `,
    methods: {
        filterGoods(value){
            const regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    components: {
        'product-item': ProductItem
    },
    mounted() {
        this.$parent.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for(let el of data){
                    this.products.push(el)
                }
            });
        this.$parent.getJson(`getProducts.json`)
            .then(data => {
                for(let el of data){
                    this.products.push(el)
                }
            });
        this.filtered = this.products;
    }
});