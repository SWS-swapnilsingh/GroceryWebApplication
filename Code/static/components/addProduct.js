export default {
    template: `<div class="m-3">
    <h1>Add New Product</h1><br>
    <label for="cn"><b>Category Name: </b></label>&nbsp;
    <input style="border: none; outline: none; border-bottom: 1px solid black;" id="cn" type="text" v-model="category_name"/><br>
    <label for="pn"><b>Product Name: </b></label>&nbsp;
    <input style="border: none; outline: none; border-bottom: 1px solid black;" id="pn" type="text"  v-model="product_name"/><br>
    <label for="pu"><b>Price per Unit: </b></label>&nbsp;
    <input style="border: none; outline: none; border-bottom: 1px solid black;" id="pu" type="text"  v-model="price_unit"/><br>
    <label for="u"><b>Unit: </b></label>&nbsp;
    <input style="border: none; outline: none; border-bottom: 1px solid black;" id="u" type="text" v-model="unit"/><br>
    <label for="md"><b>Manufacture Date: </b></label>&nbsp;
    <input style="border: none; outline: none; border-bottom: 1px solid black;" id="md" type="date" v-model="manufac_date"/><br>
    <label for="ed"><b>Expiry Date: </b></label>&nbsp;
    <input style="border: none; outline: none; border-bottom: 1px solid black;" id="ed" type="date" v-model="exp_date"/><br>
    <label for="q"><b>Quantity: </b></label>&nbsp;
    <input style="border: none; outline: none; border-bottom: 1px solid black;" id="q" type="text" v-model="qty"/><br>
    <label for="dis"><b>Discount: </b></label>&nbsp;
    <input style="border: none; outline: none; border-bottom: 1px solid black;" id="dis" type="text" v-model="discount"/><br><br>
    <button @click="addCategoryFunct"> Add Product </button>
    </div>`,

    data(){
        return {
            // resource:{
            // c_name: null,
            // },
            category_name: null,
            product_name: null,
            price_unit: null,
            unit: null,
            manufac_date: null,
            exp_date: null,
            qty: null,
            discount: null,
            token: localStorage.getItem("auth-token"),
        }
    },

    methods: {
        async addCategoryFunct(){
            const res = await fetch('/api/add_product',{
                method: "POST",
                headers: {
                    "Authentication-Token": this.token,
                    "Content-Type": "application/json",
                },
                // body: JSON.stringify(this.resource),
                body: JSON.stringify({"category_name":this.category_name,
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
            else{
                alert(data.message)
            }
        },
    },
}