import showAllManager from "./showAllManagers.js"

export default {
    template: `<div> 
    <!-- Welcome admin -->
    <!-- <router-link to="/showAllManagersV"> All Managers </router-link> -->
    <showAllManager />
    </div>`,
    components: {
        showAllManager,
    },
}

// export default {
//     template: `<div>
//     Welcome admin
//     <h4 v-if="status=='false'">Your id is not activated yet</h4>
//     <showAllProducts v-else />
//     </div>`,
//     data(){
//         return {
//             status: localStorage.getItem('status'),
//             isWaiting: false,
//         }
//     },
//     components: {
//         showAllManager,
//     },

// }