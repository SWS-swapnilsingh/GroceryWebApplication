export default {
    template: `<div class="m-2"> 
        <h1>Search Category</h1><br>
        Category Name 
        <input type="text" placeholder="category name" v-model="category_name" />
        <button @click="searchCategoryVF"> Search </button>
        
    </div>`,

    data(){
        return {
            category_name: null,
            // productList: [],
            c_id: null,
            c_name: null,
            //yha par len False ka mtlab hai ki len 0 hai
            // len_productList: false,
            token: localStorage.getItem("auth-token"),
        }
    },

    methods: {
        async searchCategoryVF(){
            const res = await fetch(`/search/category/${this.category_name}`, {
                headers:{
                    "Authentication-Token": this.token
                },
            })
            const data = await res.json()
            if (res.ok){
                this.c_id = data.c_id
                this.c_name = data.c_name
                // console.log(this.c_id, this.c_name, "***************")
                this.$router.push({ name: 'EC', params: { 'c_id': this.c_id, 'c_name': this.c_name }})    
            }
            else{
                alert(data.message)
            }
        }
    },
    components: {
        
    }
}

// {/* <div class="row row-cols-2 row-cols-md-4 g-4">
//             <AsingleProductCard :product="productList[0]" v-if="len_productList" />    
//         </div> */}