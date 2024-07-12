import router from "./router.js"
import Navbar from "./components/Navbar.js"

router.beforeEach((to, from, next) => {
    // console.log(to.name)
    if (to.name == 'Register') next()
    else if (to.name !== 'Login' && !localStorage.getItem('auth-token')) next({ name: 'Login' })
    else next()
  })

const store = new Vuex.Store({
    state: {
        count: 1,
        total: 5,
        font_size: 19,
        bgcolor: "#f0f0f0",
        textcolor: "black",
        fontweight: 400,
    },

    mutations : {
        change_font_size(state, fs) {
            state.font_size += fs;
        },
        change_to_default(state, fs) {
            state.font_size = fs;
        },
        change_bgcolor(state, bgc, tc) {
            state.bgcolor = bgc;
            // state.textcolor = tc;
            // state.fontweight = fw;
        },
        change_textcolor(state, tc) {
            state.textcolor = tc;
        },
        change_fontweight(state, fw) {
            state.fontweight = fw;
        }

    }
})

new Vue({
    el: '#app',
    template: `<div>
    <Navbar :key='has_changed' />
    <router-view />
    </div>`,
    router,
    store,
    components: {
        Navbar,
    },
    data: {
        has_changed: true,
    },
    watch: {
        $route(to, from){
            this.has_changed = !this.has_changed
        }
    },
})

