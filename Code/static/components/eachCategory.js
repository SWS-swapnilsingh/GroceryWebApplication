import AsingleProductCard from "./AsingleProductCard.js"


export default {
    template: `<div class="m-2"> 
        <h1><b>{{c_name}}</b></h1>
        <div class="row row-cols-2 row-cols-md-4 g-4">
            <AsingleProductCard v-for="(product, index) in productList" :product="product" v-if="len_productList" />    
        </div>
    </div>`,
    props: ['c_id', 'c_name'],

    data(){
        return {
            productList: [],
            //yha par len False ka mtlab hai ki len 0 hai
            len_productList: false,
            token: localStorage.getItem("auth-token"),
        }
    },

    async mounted() {
            const res = await fetch(`/eachcategory/${this.c_id}`, {
                headers:{
                    "Authentication-Token": this.token
                },
            })
            const data = await res.json()
            if (res.ok){
                this.productList = data
                this.len_productList = true
            }
            else{
                alert(data.message)
                this.productList = null
                this.$router.push({path:'/showAllCategoriesV'})
            }
    },
    components: {
        AsingleProductCard,
    }
}

//<div class="col" if="len_productList">
//           <div class="card h-100">
                // <img src="static/placeholderimage.jpeg" class="card-img-top" alt="...">
        //         <div class="card-body">
        //             <h5 class="card-title">{{productList[0].product_name}}</h5>
        //             <p>Price: {{productList[0].price_unit}}/{{productList[0].unit}}</p>
        //             <button class="btn btn-primary w-2" @click='addToCartVF' style="background-color: rgb(43, 183, 148); border-color: rgb(43, 183, 148)">Add</button>
        //         </div>
        //     </div>
        // </div>