export default {
    template: `<div>
        <h1>Delete Product</h1>
        <p><b style="color: red;">NOTE: </b>If you really want to delete the product then, write it's name in the provided text box and click on the delete button. </p><br>
        <b>Product Name:</b>
        <input type="text" placeholder="productName" v-model="product_name"/>
        <button @click="deleteProductVF" class="btn btn-danger" v-if="role=='manager'">Delete</button>
    </div>`,
    props: ['p_id', 'p_name'],
    data(){
        return {
            product_name: null,
            role: localStorage.getItem('role'),
            authToken: localStorage.getItem('auth-token'),
        }
    },
    methods: {
        consoleVF(){
            console.log(this.p_id, this.p_name)
        },

        async deleteProductVF(){
            if (this.product_name == this.p_name){
                const res = await fetch(`/api/delete/product/${this.p_id}`, {
                    method: "DELETE",
                    headers: {
                        'Authentication-Token': this.authToken,
                    },
                })
                const data = await res.json()
                if (res.ok){
                    alert(data.message)
                    this.$router.push('/showAllProductsV')
                }
                else{
                    alert(data.message)
                }
            }
            else{
                alert("Write correct product name to delete it")
            }
        },
    }
}