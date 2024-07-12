export default {
    template: `<div style="margin: 8px;">
        <h1>Delete Category</h1>
        <p><b style="color: red;">NOTE: </b>If you really want to delete the category then, write it's name in the provided text box and click on the delete button. </p><br>
        <b>Category Name:</b>
        <input type="text" placeholder="categoryName" v-model="category_name"/>
        <button @click="deleteCategoryVF" class="btn btn-danger" v-if="role=='admin'">Delete</button>
    </div>`,
    props: ['c_id', 'c_name'],
    data(){
        return {
            category_name: null,
            role: localStorage.getItem('role'),
            authToken: localStorage.getItem('auth-token'),
        }
    },
    methods: {
        consoleVF(){
            console.log(this.c_id, this.c_name)
        },

        async deleteCategoryVF(){
            if (this.category_name == this.c_name){
                const res = await fetch(`/api/delete_category/${this.c_id}`, {
                    method: "DELETE",
                    headers: {
                        'Authentication-Token': this.authToken,
                    },
                })
                const data = await res.json()
                if (res.ok){
                    alert(data.message)
                    // alert("deleted successfully")
                    this.$router.push('/showAllCategoriesV')
                }
                else{
                    alert(data.message)
                }
            }
            else{
                alert("Write correct category name to delete it")
            }
        },
    }
}