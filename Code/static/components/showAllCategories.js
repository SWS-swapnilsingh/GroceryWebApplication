export default {
    template: `<div>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-8">
                    <h1 class="m-1 pb-2 pt-1">Categories</h1>
                    <p style="margin-bottom: 0; padding-bottom: 0;" v-show="role == 'manager' || role == 'admin'"><b style="color: red;">Note for managers: </b>If you have requested to delete the category by mistake then you can remove the '*' just by updating the name of that category.</p>
                    <p v-show="role == 'manager' || role == 'admin'"><b style="color: red;">Note for admin: </b>If you want to deny the request of manager of deleting the category, then you can remove the star from the category name.</p><br>
                    <table class="table table-hover border">
                        <thead>
                            <tr>
                                <th scope="col" :style="{ 'background-color': bgcolor, color: 'white' }">Index</th>
                                <th scope="col" :style="{ 'background-color': bgcolor, color: 'white' }">Category Name</th>
                                <th scope="col" v-if="role != 'normal_user'" :style="{ 'background-color': bgcolor, color: 'white' }">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(ele, index) in categoryList">
                                <th scope="row">{{ index + 1 }}</th>
                                <td><router-link :to="{ name: 'EC', params: { 'c_id': ele[0], 'c_name': ele[1] }}" style="text-decoration: none;">{{ ele[1] }}</router-link></td>
                                <td v-if="role=='manager'">
                                    <button @click="updateVF(ele[0])" class="btn btn-success" style="background-color: rgb(43, 183, 148); margin: 2px;">Update</button>
                                    <button @click="addStarVF(ele[0])" class="btn btn-danger">Request To Delete</button>
                                </td>
                                <td v-if="role=='admin'">
                                    <button @click="updateVF(ele[0])" class="btn btn-success" style="background-color: rgb(43, 183, 148); margin: 2px;">Update</button>
                                    <button @click="removeStarVF(ele[0])" class="btn btn-danger" style="background-color: rgb(43, 183, 148);">Remove *</button>
                                    <button @click="reallyDeleteCategoryVF(ele[0], ele[1])" class="btn btn-danger" style="margin: 2px;">Delete</button>
                                    <button @click="approveCategoryVF(ele[0])" class="btn btn-success" style="background-color: rgb(43, 183, 148);" v-if="ele[2]==false">Approve</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    </div>`,

    data () {
        return {
            categoryList: null,
            authToken: localStorage.getItem('auth-token'),
            role: localStorage.getItem('role'),
        }
    },

    computed : {
        bgcolor(){
            if (this.$store.state.bgcolor === "#f0f0f0") {
                return '#102567'
            }
            else {
                return this.$store.state.bgcolor
            }
          },
    },

    async mounted(){
        const res = await fetch('/api/all_category', {
            headers: {
                'Authentication-Token': this.authToken,
            },
        })
        const data = await res.json()
        console.log(data)
        if (res.ok){
            this.categoryList = data
        }
        else{
            alert(data.message)
        }
    },
    methods: {
        updateVF(c_id){
            this.$router.push({ name: 'UC', params: { 'c_id': c_id}})
        },

        async addStarVF(c_id){
            const res = await fetch(`/addStar/${c_id}`, {
                headers: {
                    'Authentication-Token': this.authToken,
                },
            })
            const data = await res.json()
            // console.log(data)
            if (res.ok){
                alert(data.message)
                this.$router.go(0)
            }
            else{
                alert(data.message)
            }
        },

        async removeStarVF(c_id){
            const res = await fetch(`/removeStar/${c_id}`, {
                headers: {
                    'Authentication-Token': this.authToken,
                },
            })
            const data = await res.json()
            // console.log(data)
            if (res.ok){
                alert(data.message)
                this.$router.go(0)
            }
            else{
                alert(data.message)
            }
        },

        reallyDeleteCategoryVF(c_id, c_name){
            this.$router.push({name:'RDC', params: {'c_id': c_id, 'c_name': c_name}})
        },

        async approveCategoryVF(c_id){
            const res = await fetch(`/approveCategory/${c_id}`, {
                headers: {
                    'Authentication-Token': this.authToken,
                },
            })
            const data = await res.json()
            // console.log(data)
            if (res.ok){
                alert(data.message)
                this.$router.go(0)
            }
            else{
                alert(data.message)
            }
        },
    }

}

// <table class="table table-hover"> 
        //     <thead>
        //         <tr>
        //             <th scope="col">Index</th>
        //             <th scope="col">Product Name</th>
        //             <th scope="col" v-if="role=='manager'">Actions</th>
        //         </tr>
        //     </thead>
        //     <tbody>
        //         <tr v-for="(ele, index) in categoryList">
        //             <th scope="row">{{ index + 1 }}</th>
        //             <th scope="row"><router-link :to="{name: 'EC', params:{'c_id': ele[0]}}" >{{ele[1]}}</router-link></th>
        //             <td v-if="role=='manager'"><button @click="deleteItem(p.item_id)" >Delete</button></td>
        //         </tr>

        //     </tbody>
        // </table>