export default {
    template: `<div class="m-3">
    <h1>Add New Category</h1>
    <p><b style="color: red">Note: </b> Categories added by managers will require approval from the Admin.</p><br>
    <b>category name: </b>
    <input type="text" v-model="c_name" style="border: none; outline: none; border-bottom: 1px solid black;"/><br><br>
    <button @click="addCategoryFunct"> Add Category </button>
    </div>`,

    data(){
        return {
            // resource:{
            // c_name: null,
            // },
            c_name: null,
            token: localStorage.getItem("auth-token"),
        }
    },

    methods: {
        async addCategoryFunct(){
            const res = await fetch('/api/create_new_category',{
                method: "POST",
                headers: {
                    "Authentication-Token": this.token,
                    "Content-Type": "application/json",
                },
                // body: JSON.stringify(this.resource),
                body: JSON.stringify({"c_name":this.c_name})
                
            })

            const data = await res.json()
            if(res.ok){
                alert(data.message)
            }
        },
    },
}