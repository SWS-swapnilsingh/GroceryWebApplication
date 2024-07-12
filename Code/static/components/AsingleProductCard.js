export default {
    template: `
            <div class="col">
                <div class="card h-100 border-0" @mouseover="showButton = true" @mouseleave="showButton = false">
                    <img src="static/placeholderimage.jpeg" class="card-img-top" alt="..." style="width: 313px; height: auto;">
                    <div class="card-body">
                        <h5 class="card-title">{{product.product_name}}</h5>
                        <p>Price: {{product.price_unit}}/{{product.unit}} &nbsp;&nbsp;</p>
                        <p v-if="product.quantity <= 0" style="color: red"><b>Out of stock</b></p>
                        <p v-else-if="product.quantity >=1 && product.quantity <= 5"><b style="color: red; background-color: rgb(248, 222, 222); font-size: 13px">Hurry up! Only {{product.quantity}} {{product.unit}} remaining</b></p>
                        <p v-else-if="product.discount <=0" style="color: rgb(38, 165, 65); background-color: rgb(231, 248, 236); width: 30%;"><b>Best Offer</b></p>
                        <p v-else style="color: rgb(38, 165, 65); font-weight: bold; background-color: rgb(231, 248, 236); width: 39%;">discount {{product.discount}}%</p>
                        <button class="btn btn-primary w-2" @click='addToCartVF' style="background-color: rgb(43, 183, 148); border-color: rgb(43, 183, 148); width: 100%;" v-if="role=='normal_user' && showButton && product.quantity >=1">Add To Cart</button>
                        <button @click="updateVF(product.product_id)" class="btn btn-success" style="background-color: rgb(43, 183, 148); margin: 2px;" v-if="role=='manager'">Update</button>
                        <button @click="reallyDeleteProductVF" class="btn btn-danger" v-if="role=='manager'">confirm Delete</button> 
                    </div>
                </div>
            </div>`,
    props: ['product'],

    data(){
        return {
            role: localStorage.getItem('role'),
            authToken: localStorage.getItem('auth-token'),
            showButton: false,
        }
    },

    methods: {
        async addToCartVF(){
            // console.log(this.product.product_id)
            // console.log(`/addToCart/pId/${this.product.product_id}`)
            const res = await fetch(`/addToCart/pId/${this.product.product_id}`, {
                headers: {
                    'Authentication-Token': this.authToken,
                },
            })
            const data = await res.json()
            if (res.ok){
                alert(data.message)
            }
            else{
                alert(data.message)
            }
        },

        updateVF(product_id){
            this.$router.push({ name: 'UP', params: { 'p_id': this.product.product_id}})
        },

        reallyDeleteProductVF(){
            this.$router.push({name:'RDP', params: {'p_id': this.product.product_id, 'p_name': this.product.product_name}})
        }
    }
}


//<router-link to="#" class="btn btn-primary">Add</router-link>