export default {
    template: `<div>
    <p>&nbsp;&nbsp;<b>Change the content type of monthly progress report.</b></p>
    <div>
        &nbsp;&nbsp;<input type="radio" id="html" value="html" v-model="selectedOption">
        <label for="html">HTML</label>
        <br>
        &nbsp;&nbsp;<input type="radio" id="plain" value="plain" v-model="selectedOption">
        <label for="plain">Plain</label>
    </div>
    &nbsp;&nbsp;<button @click="changeContentType">Change</button>

    </div>`,

    data(){
        return {
            // resource:{
            // c_name: null,
            // },
            selectedOption: null,
            token: localStorage.getItem("auth-token"),
        }
    },

    methods: {
        async changeContentType(){
            // console.log(this.selectedOption,'********************')
            const res = await fetch(`/change/type/${this.selectedOption}`,{
                headers: {
                    "Authentication-Token": this.token,
                },
                // body: JSON.stringify(this.resource),
            })

            const data = await res.json()
            if(res.ok){
                alert(data.message)
            }
        },
    },
}

// export default {
//     template: `<div>Hello world</div>`
// }