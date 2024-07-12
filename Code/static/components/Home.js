import BuyerHome from "./BuyerHome.js"
import ManagerHome from "./ManagerHome.js"
import AdminHome from "./AdminHome.js"


export default {
    template: `<div>
    <BuyerHome v-if="userRole=='normal_user'" />
    <ManagerHome v-if="userRole=='manager'" />
    <AdminHome v-if="userRole=='admin'" />

    </div>`,
    data() {
        return {
            // home: "HHome",
            //ye karne par bhi security issue nhi aayega kyoki humlog backend se bhi role confirm kar rhe hai
            userRole: localStorage.getItem('role'),
            authToken: localStorage.getItem('auth-token')
        }
    },

    components: {
        BuyerHome,
        ManagerHome,
        AdminHome
    },
}

/* <router-link to="/addCategory">Add Category</router-link>
<router-link to="/showAllCategoriesV">All Category</router-link>
<router-link to="/addProduct">Add Product</router-link>
<router-link to="/showAllProductsV">All Products</router-link> */