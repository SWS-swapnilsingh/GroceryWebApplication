import AsingleProductCard from "./AsingleProductCard.js"


export default {
    template: `<div class="m-2">
        <h1><b>All Products</b></h1>
        <p v-if="productList_len == 0"><b style="color: red;">Note: </b>Product list is empty.</p>
        <div class="row row-cols-2 row-cols-md-4 g-4" v-else>
            <AsingleProductCard v-for="(product, index) in productList" :product = "product" />
        </div>
    </div>`,

    data () {
        return {
            productList: [],
            authToken: localStorage.getItem('auth-token'),
            productList_len: 0,
        }
    },

    async mounted(){
        const res = await fetch('/api/all_products', {
            headers: {
                'Authentication-Token': this.authToken,
            },
        })
        const data = await res.json()
        console.log(data)
        if (res.ok){
            this.productList = data
            this.productList_len = this.productList.length
            console.log(this.productList_len)
        }
        else{
            alert(data.message)
        }
    },
    components: {
        AsingleProductCard,
    },

}

//<div v-for="ele in productList"><router-link to="/ele.product_id">{{ele.product_name}}</router-link></div>