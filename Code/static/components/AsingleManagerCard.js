export default {
    template: `
            <div class="col">
                <div class="card h-100 border-1">
                    <img src="static/managerPlaceHolder.jpg" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">{{manager.username}}</h5>
                        <p style="color:green; width: 100%" v-if="manager.active == true">ACTIVATED</p>
                        <button @click="approveManagerVF(manager.id)" class="btn btn-success" style="background-color: rgb(43, 183, 148); width: 100%;" v-if="manager.active == false">Activate</button>
                    </div>
                </div>
            </div>`,
    props: ['manager'],

    data() {
        return {
            authToken: localStorage.getItem('auth-token')
        }
    },
    
    methods: {
        async approveManagerVF(user_id){
            const res = await fetch(`/approveManager/${user_id}`, {
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
    },
}


//<router-link to="#" class="btn btn-primary">Add</router-link>