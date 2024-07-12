import Home from "./components/Home.js"
import Login from "./components/Login.js"
import Register from "./components/Register.js"
import addCategory from "./components/addCategory.js"
import showAllCategories from "./components/showAllCategories.js"
import Error from "./components/Error.js"
import addProduct from "./components/addProduct.js"
import showAllProducts from "./components/showAllProducts.js"
import AsingleProductCard from "./components/AsingleProductCard.js"
import searchProduct from "./components/searchProduct.js"
import searchCategory from "./components/searchCategory.js"
import filterProduct from "./components/filterProduct.js"
import eachCategory from "./components/eachCategory.js"
import cartItems from "./components/cartItems.js"
import BuyerHome from "./components/BuyerHome.js"
import updateProduct from "./components/updateProduct.js"
import reallyDeleteProduct from "./components/reallyDeleteProduct.js"
import updateCategory from "./components/updateCategory.js"
import reallyDeleteCategory from "./components/reallyDeleteCategory.js"
import showAllManagers from "./components/showAllManagers.js"
import contentType from "./components/contentType.js"
import accessibilityMenu from "./components/accessibilityMenu.js"
import buyingHistory from "./components/buyingHistory.js"

const routes = [
    {path:'/', component: Home},
    {path: '/login', component: Login, name: 'Login'},
    {path: '/register', component: Register, name:'Register'},
    {path:'/addCategory', component: addCategory},
    {path:'/showAllCategoriesV', component: showAllCategories},
    {path:'/showAllManagersV', component: showAllManagers},
    {path:'/error-component', component: Error},
    {path:'/addProduct', component: addProduct},
    {path: '/showAllProductsV', component: showAllProducts},
    {path: '/check', component: AsingleProductCard},
    {path: '/searchProductV', component: searchProduct},
    {path: '/searchCategoryV', component: searchCategory},
    {path: '/filterProductV', component: filterProduct},
    {path: '/eachCatetoryV/:c_id', component: eachCategory, props:true, name:'EC'},
    {path: '/cartItemsV', component: cartItems},
    {path: '/buyerHomePageV', component: BuyerHome},
    {path: '/updateProductV/:p_id', component: updateProduct, props:true, name:'UP'},
    {path: '/reallyDeleteProduct/:p_id/:p_name', component: reallyDeleteProduct, props:true, name:'RDP'},
    {path: '/updateCategoryV/:c_id', component: updateCategory, props:true, name:'UC'},
    {path: '/reallyDeleteCategory/:c_id/:c_name', component: reallyDeleteCategory, props:true, name:'RDC'},
    {path: '/changeContentTypeV', component: contentType},
    {path: '/accessibilityMenuV', component: accessibilityMenu},
    {path: '/buyingHistoryV', component: buyingHistory},
    

]

export default new VueRouter({
    routes,
})