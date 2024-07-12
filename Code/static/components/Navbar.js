export default {
    template: `<div>
    <nav class="navbar navbar-expand-lg" :style="{ 'background-color': bgcolor }">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img src="static/logo.png" style="width: 70px; height: auto;" alt="">
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/" :style="{ fontSize: font_size + 'px', color: textcolor, 'font-weight': fontweight }">Home</router-link>
          </li>
          <li class="nav-item" v-if="role=='admin'">
            <router-link class="nav-link" to="/addCategory" :style="{ fontSize: font_size + 'px', color: textcolor, 'font-weight': fontweight }">Add-Category</router-link>
          </li>
          <li class="nav-item" v-if="role=='admin'">
            <router-link class="nav-link" to="/showAllCategoriesV" :style="{ fontSize: font_size + 'px', color: textcolor, 'font-weight': fontweight }">Categories</router-link>
          </li>

          
          <li class="nav-item" v-if="role=='manager' && status=='true'">
            <router-link class="nav-link" to="/addCategory" :style="{ fontSize: font_size + 'px', color: textcolor, 'font-weight': fontweight }">Add-Category</router-link>
          </li>
          <li class="nav-item" v-if="role=='manager' && status=='true'">
            <router-link class="nav-link" to="/showAllCategoriesV" :style="{ fontSize: font_size + 'px', color: textcolor, 'font-weight': fontweight }">Categories</router-link>
          </li>
          <li class="nav-item" v-if="role=='manager' && status=='true'">
            <router-link class="nav-link" to="/addProduct" :style="{ fontSize: font_size + 'px', color: textcolor, 'font-weight': fontweight }">Add-Product</router-link>
          </li>
          <li class="nav-item" v-if="role=='manager' && status=='true'">
            <router-link class="nav-link" to="/filterProductV" :style="{ fontSize: font_size + 'px', color: textcolor, 'font-weight': fontweight }">Filter</router-link>
          </li>
          <li class="nav-item" v-if="role=='manager' && status=='true'">
            <router-link class="nav-link" to="/searchProductV" :style="{ fontSize: font_size + 'px', color: textcolor, 'font-weight': fontweight }">Search</router-link>
          </li>
          <li class="nav-item" v-if="role=='manager' && status=='true'">
            <router-link class="nav-link" to="/searchCategoryV" :style="{ fontSize: font_size + 'px', color: textcolor, 'font-weight': fontweight }">Category-Search</router-link>
          </li>
          


          <li class="nav-item" v-if="role=='normal_user'">
            <router-link class="nav-link" to="/showAllCategoriesV" :style="{ fontSize: font_size + 'px', color: textcolor, 'font-weight': fontweight }">Categories</router-link>
          </li>
          <li class="nav-item" v-if="role=='normal_user'">
            <router-link class="nav-link" to="/filterProductV" :style="{ fontSize: font_size + 'px', color: textcolor, 'font-weight': fontweight }">Filter</router-link>
          </li>
          <li class="nav-item" v-if="role=='normal_user'">
            <router-link class="nav-link" to="/searchProductV" :style="{ fontSize: font_size + 'px', color: textcolor, 'font-weight': fontweight }">Product-Search</router-link>
          </li>
          <li class="nav-item" v-if="role=='normal_user'">
            <router-link class="nav-link" to="/searchCategoryV" :style="{ fontSize: font_size + 'px', color: textcolor, 'font-weight': fontweight }">Category-Search</router-link>
          </li>
          <li class="nav-item" v-if="role=='normal_user'">
            <router-link class="nav-link" to="/cartItemsV" :style="{ fontSize: font_size + 'px', color: textcolor, 'font-weight': fontweight }">Cart</router-link>
          </li>
          <li class="nav-item" v-if="role=='normal_user'">
            <router-link class="nav-link" to="/changeContentTypeV" :style="{ fontSize: font_size + 'px', color: textcolor, 'font-weight': fontweight }">Settings</router-link>
          </li>
          <li class="nav-item" v-if="role=='normal_user'">
            <router-link class="nav-link" to="/buyingHistoryV" :style="{ fontSize: font_size + 'px', color: textcolor, 'font-weight': fontweight }">Buying-History</router-link>
          </li>
          


          <li class="nav-item" v-if='is_login'>
            <button class="nav-link" @click='logout' :style="{ fontSize: font_size + 'px', color: textcolor, 'font-weight': fontweight }">logout</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="button-container" style="position: fixed; top: 45%; right: 0px; width: 40px; border: 1px solid black; padding: 0px; margin: 0px; z-index: 999">
  <button @click="decreasefont" :style="{ fontSize: '24px', width: '100%', margin: '5px', cursor: 'pointer'}">-</button>
  <button @click="increasefont" :style="{ fontSize: '24px', width: '100%', margin: '5px', cursor: 'pointer'}">+</button>
  <div @click="changebgcolorG" :style="{ width: '15px', height: '15px', margin: '11px', 'border-radius': '50%', 'background-color': '#306F13', border: '1px solid black', padding: '10px', cursor: 'pointer'}">.</div>
  <div @click="changebgcolorR" :style="{ width: '15px', height: '15px', margin: '11px', 'border-radius': '50%', 'background-color': '#C1840C', border: '1px solid black', padding: '10px', cursor: 'pointer'}">.</div>
  <div @click="changebgcolorB" :style="{ width: '15px', height: '15px', margin: '11px', 'border-radius': '50%', 'background-color': '#102567', border: '1px solid black', padding: '10px', cursor: 'pointer'}">.</div>
  <div @click="changebgcolorLG" :style="{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '15px', height: '15px', margin: '11px', 'border-radius': '50%', 'background-color': '#f0f0f0', border: '1px solid black', padding: '10px', cursor: 'pointer'}">D</div>
</div>

  </div>`,
  data(){
    return {
      role: localStorage.getItem('role'),
      status: localStorage.getItem('status'),
      //this is for checking whether the user is logged in or not
      is_login: localStorage.getItem('auth-token'),
      // font_size: this.$store.state.font_size,
      // font_size: this.$store.state.font_size,
      // bgcolor: "#f0f0f0",
      // textcolor: "black",
      // fontweight: 400,
    }
  },

  computed: {
    font_size() {
      return this.$store.state.font_size;
    },

    bgcolor(){
      return this.$store.state.bgcolor;
    },

    textcolor(){
      return this.$store.state.textcolor;
    },

    fontweight(){
      return this.$store.state.fontweight;
    },
  },

  methods: {
    logout(){
      localStorage.removeItem('auth-token')
      localStorage.removeItem('role')
      //after removing 'auth-token' and 'role' from the localStorage, I will redirect the user to the home page
      this.$router.push({path: '/login'})
    },

    increasefont(){
      // this.font_size = this.font_size + 2
      // console.log(this.$store.state.count)
      this.$store.commit("change_font_size", 2)
      console.log(this.$store.state.font_size)
    },

    decreasefont(){
      // this.font_size = this.font_size - 2
      this.$store.commit("change_font_size", -2)
      console.log(this.$store.state.font_size)
    },

    changebgcolorG(){
      // this.bgcolor = '#306F13'
      this.$store.commit("change_bgcolor", "#306F13")
      this.$store.commit("change_textcolor", "white")
      this.$store.commit("change_fontweight", 700)
      // this.textcolor = 'white'
      // this.fontweight = 700
    },

    changebgcolorR(){
      // this.bgcolor = '#C1840C'
      // this.textcolor = 'white'
      // this.fontweight = 700
      this.$store.commit("change_bgcolor", '#C1840C')
      this.$store.commit("change_textcolor", "white")
      this.$store.commit("change_fontweight", 700)
    },

    changebgcolorB(){
      // this.bgcolor = '#102567'
      // this.textcolor = 'white'
      // this.fontweight = 700
      this.$store.commit("change_bgcolor", '#102567')
      this.$store.commit("change_textcolor", "white")
      this.$store.commit("change_fontweight", 700)
    },

    changebgcolorLG(){
      // this.bgcolor = '#f0f0f0'
      // this.textcolor = 'black'
      // this.fontweight = 400
      // this.font_size = 19
      this.$store.commit("change_to_default", 19)
      this.$store.commit("change_bgcolor", '#f0f0f0')
      this.$store.commit("change_textcolor", 'black')
      this.$store.commit("change_fontweight", 400)
    }
  },
}