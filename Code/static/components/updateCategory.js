//Update category component
export default {
    template: `<div class="m-3">
    <h1> Update Category </h1>
    <input type="text" placeholder="new_category_name" v-model="new_category_name"/>
    <button @click="addUpdateFunct"><span v-show="role == 'manager'">Request To Update </span> <span v-show="role == 'admin'">Update</span> </button>
    </div>`,
    props: ['c_id'],

    data(){
        return {
            new_category_name: null,
            token: localStorage.getItem("auth-token"),
            role: localStorage.getItem('role'),
        }
    },

    async mounted(){
        const res = await fetch(`/singleCategoryDetails/${this.c_id}`, {
            headers: {
                'Authentication-Token': this.token,
            },
        })
        const data = await res.json()
        // console.log(data)
        if (res.ok){
            // console.log(data)
            this.new_category_name = data.category_name
        }
        else{
            alert(data.message)
        }
    },

    methods: {
        async addUpdateFunct(){
            const res = await fetch(`/api/update_category/${this.c_id}`,{
                method: "PUT",
                headers: {
                    "Authentication-Token": this.token,
                    "Content-Type": "application/json",
                },
                // body: JSON.stringify(this.resource),
                body: JSON.stringify({
                                      "new_category_name":this.new_category_name,
                                        
            })
                
            })

            const data = await res.json()
            if(res.ok){
                alert(data.message)
                this.$router.push('/showAllCategoriesV')
            }
        },
    },
}