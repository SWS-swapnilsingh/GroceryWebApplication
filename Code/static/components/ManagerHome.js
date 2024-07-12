import showAllProducts from "./showAllProducts.js"

export default {
    template: `<div>
    Welcome manager <button @click='downloadResource' v-if="status=='true'">Download Resource</button> <span v-if='isWaiting'> Waiting... </span>
    <h4 v-if="status=='false'">Your id is not activated yet</h4>
    <showAllProducts v-else />
    </div>`,
    data(){
        return {
            status: localStorage.getItem('status'),
            authToken: localStorage.getItem('auth-token'),
            isWaiting: false,
        }
    },
    components: {
        showAllProducts,
    },
    methods: {
        async downloadResource(){
            this.isWaiting = true
            const res = await fetch('/download-csv', {
                headers: {
                    'Authentication-Token': this.authToken,
                },
            })
            const data = await res.json()
            if(res.ok){
                const taskId= data['task-id']
                const intv = setInterval(async ()=>{
                    const csv_res = await fetch(`/get-csv/${taskId}`)
                    if(csv_res.ok){
                        this.isWaiting = false
                        clearInterval(intv)
                        alert("Backend job is done.")
                        //here we redirecting the user to this url `/get-csv/${taskId}` and this url is downloading a file
                        //second fetch hame successful result hone par csv file dega, fir humko multiple cheeje karni padegi uss result ke sath next step se pahle
                        //ye sab karne ki bajaye humlog simply user ko redirect kar de rhe hai aur wo url file download kardega
                        window.location.href = `/get-csv/${taskId}`
                    }
                }, 1000)
            }
        }
    }

}