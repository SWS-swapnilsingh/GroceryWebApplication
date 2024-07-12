import AsingleManagerCard from "./AsingleManagerCard.js"
//Show all Managers
export default {
    template: `
    <div class="m-2">
        <h1><b>All Managers</b></h1>
        <div class="row row-cols-2 row-cols-md-5 g-4">
            <AsingleManagerCard v-for="(manager, index) in managerList" :manager="manager"/>
        </div>

    </div>`,

    data () {
        return {
            managerList: null,
            authToken: localStorage.getItem('auth-token'),
            role: localStorage.getItem('role'),
        }
    },

    async mounted(){
        const res = await fetch('/managers', {
            headers: {
                'Authentication-Token': this.authToken,
            },
        })
        const data = await res.json()
        console.log(data)
        if (res.ok){
            this.managerList = data
            // console.log(this.managerList,"*********************")
            // console.log(this.managerList[0].id, this.managerList[0].username, this.managerList[0].active, "*************************")
            // console.log(this.managerList[1].id, this.managerList[1].username, this.managerList[1].active, "*************************")
            // console.log(this.managerList[2].id, this.managerList[2].username, this.managerList[2].active, "*************************")
        }
        else{
            alert(data.message)
        }
    },
    components: {
        AsingleManagerCard,
    },

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


// </div>
// <div class="container">
//     <div class="row justify-content-center">
//         <div class="col-8">
//             <h1 class="m-1 pb-2 pt-1">All Managers</h1>
//             <table class="table table-hover border">
//                 <thead>
//                     <tr>
//                         <th scope="col">Index</th>
//                         <th scope="col">Manager Name</th>
//                         <th scope="col" v-if="role == 'admin'">Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr v-for="(ele, index) in managerList">
//                         <th scope="row">{{ index + 1 }}</th>
//                         <td>{{ ele.username }}</td>
//                         <td v-if="role=='admin'">
//                             <button @click="approveManagerVF(ele.id)" class="btn btn-success" style="background-color: rgb(43, 183, 148)" v-if="ele.active==false">Activate</button>
//                         </td>
//                     </tr>
//                 </tbody>
//             </table>
//         </div>
//     </div>
// </div>