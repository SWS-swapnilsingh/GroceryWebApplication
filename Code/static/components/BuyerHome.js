import showAllProducts from "./showAllProducts.js"

export default {
    template: `<div>
    <showAllProducts />
    </div>`,
    data(){
        return {
            allProducts: [],
        }
    },
    components: {
        showAllProducts,
    },
}