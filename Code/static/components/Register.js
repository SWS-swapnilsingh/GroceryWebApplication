export default {
    template: `
    <div class='d-flex justify-content-center' style="margin-top: 25vh">
        <div class="mb-3 p-5 bg-light"> 
        <div style="margin-bottom: 1em;"><b>Register</b></div>
        <div> {{registered}} </div>
        <label for="user-username" class="form-label">User Name</label>
        <input type="text" class="form-control" id="user-username" placeholder="UserName" v-model='cred.username' required>
        <label for="user-email" class="form-label">Email address</label>
        <input type="email" class="form-control" id="user-email" placeholder="name@example.com" v-model='cred.email'>
        <label for="user-password" class="form-label">Password</label>
        <input type="password" class="form-control" id="user-password" v-model='cred.password'>
        <br>
        <div>
            <input type="radio" id="normaluser" value="normal_user" v-model="cred.role">
            <label for="normaluser">Normal-User</label>&nbsp;
            <input type="radio" id="mgr" value="manager" v-model="cred.role">
            <label for="mgr">Manager</label>
        </div>  <br>
        <div v-if="cred.role=='manager'">
        <label for="user-password" class="form-label">Authentication Code</label>
        <input type="text" class="form-control" id="user-password" v-model='cred.authcode'>
        </div>
        
        <button class="btn btn-primary mt-2" @click='register'> Register </button>
        <router-link to='/login' class="btn btn-primary mt-2">Login</router-link>
        <p style="color: red; margin: 0.5px;">Note:</p>
        <p style="color: red; margin: 0.5px;">* Password must contain atleast one:-</p>
        <p style="color: red; margin: 0.5px;">* Capital Alphabet</p>
        <p style="color: red; margin: 0.5px;">* Small Alphabet</p>
        <p style="color: red; margin: 0.5px;">* Number and symbol @, #, $, &, *</p>
    </div>
  </div>`,
  data() {
    return {
        cred: {
            "username": null,
            "email": null,
            "password": null,
            "role": null,
            "selectedUserRole": null,
            "authcode": null,
        },

        error: null,
        registered: null,
        
    }
  },
  methods: {
    async register() {
        console.log(this.cred.authcode)
        if (this.cred.authcode != "12345" && this.cred.role === "manager"){
            alert("authetication code not matched")
        }
        else if (this.cred.authcode === "12345" || this.cred.role === "normal_user") {
            // console.log(this.cred)
            //if your backend and fronted is served from the same server then you can use the relative path
            const res = await fetch('/user-register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.cred),  
            })
        
        const data = await res.json()
        if(res.ok){      //agar code 200 se 300 ke beech hai to ye if ke andar chala jayega otherwise nhi
            // console.log(data)
            // localStorage.setItem('auth-token', data.token)
            // this.$router.push({path: '/', query: {role: data.role } })
            this.registered = data.message
            alert(data.message)
            // console.log("User Registered successfully")
            
        }
        else{
            // this.error = data.message
            // this.$router.push({path: '/error-component'})
            alert(data.message)

        }
    }
    },
  }
}