//Update product component
export default {
    template: `<div>
    <h1> Update Product </h1>
    <input type="text" placeholder="product_name" v-model="product_name"/>
    <input type="text" placeholder="price_unit" v-model="price_unit"/>
    <input type="text" placeholder="unit" v-model="unit"/>
    <input type="date" placeholder="manufac_date" v-model="manufac_date"/>
    <input type="date" placeholder="exp_date" v-model="exp_date"/>
    <input type="text" placeholder="qty" v-model="qty"/>
    <input type="text" placeholder="discount" v-model="discount"/>
    <button @click="addUpdateFunct"> Update </button>
    </div>`,
    props: ['p_id'],

    data(){
        return {
            // resource:{
            // c_name: null,
            // },
            // category_name: null,
            
            product_name: "crow",
            price_unit: null,
            unit: null,
            manufac_date: null,
            exp_date: null,
            qty: null,
            discount: null,
            token: localStorage.getItem("auth-token"),
        }
    },

    async mounted(){
        const res = await fetch(`/singleProudctDetails/${this.p_id}`, {
            headers: {
                'Authentication-Token': this.token,
            },
        })
        const data = await res.json()
        console.log(data)
        if (res.ok){
            this.product_name = data.product_name
            this.price_unit = data.price_unit
            this.unit = data.unit
            this.manufac_date= data.manufac_date
            this.exp_date = data.exp_date
            this.qty = data.quantity
            this.discount = data.discount
        }
        else{
            alert(data.message)
        }
    },

    methods: {
        async addUpdateFunct(){
            const res = await fetch(`/api/update/product/${this.p_id}`,{
                method: "PUT",
                headers: {
                    "Authentication-Token": this.token,
                    "Content-Type": "application/json",
                },
                // body: JSON.stringify(this.resource),
                body: JSON.stringify({
                                      "product_name":this.product_name,
                                      "price_unit":this.price_unit,
                                      "unit":this.unit,
                                      "manufac_date":this.manufac_date,
                                      "exp_date":this.exp_date,
                                      "qty":this.qty,
                                      "discount":this.discount
                                        
            })
                
            })

            const data = await res.json()
            if(res.ok){
                alert(data.message)
            }
        },
    },
}