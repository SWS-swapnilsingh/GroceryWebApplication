export default {
    template: `
    <div class='d-flex justify-content-center' style="margin-top: 25vh">
        <div class="mb-4 p-5 bg-light"> 
            <div style="margin-bottom: 1em;"><b>Login</b></div>
            <label for="user-username" class="form-label">User Name</label>
            <input type="text" class="form-control" id="user-username" placeholder="UserName" v-model='cred.username'>
            <label for="user-email" class="form-label">Email address</label>
            <input type="email" class="form-control" id="user-email" placeholder="name@example.com" v-model='cred.email'>
            <label for="user-password" class="form-label">Password</label>
            <input type="password" class="form-control" id="user-password" v-model='cred.password'>
            <button class="btn btn-primary mt-2" @click='login'> Login </button>
            <router-link to="/register" class="btn btn-primary mt-2">Register</router-link> 
        </div>
    </div>`,
  data() {
    return {
        cred: {
            "email": null,
            "password": null,
            "username": null,
        },

        error: null,
    }
  },
  methods: {
    async login() {
        // console.log(this.cred)
        //if your backend and fronted is served from the same server then you can use the relative path
        const res = await fetch('/user-login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.cred),  
        })
        const data = await res.json()
        if(res.ok){
            // console.log(data)
            localStorage.setItem('auth-token', data.token)
            localStorage.setItem('role', data.role)
            localStorage.setItem('currentUserId', data.id)
            localStorage.setItem('status', data.status)
            this.$router.push({path: '/' })
        }
        else{
            alert(data.message)
        }
    },
  }
}

// JSON.stringify will convert the 'cred' into json object 
//mt-2 means margin from top