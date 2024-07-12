export default {
    template: `<div class="m-2">
        <h1>Your Entire Buying History</h1>
        <p><b style="color: red;">Note: </b> Products that have been removed from the inventory will not be shown in the list.</p><br>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col" :style="{ 'background-color': bgcolor, color: 'white' }">Index</th>
                    <th scope="col" :style="{ 'background-color': bgcolor, color: 'white' }">Product Name</th>
                    <th scope="col" :style="{ 'background-color': bgcolor, color: 'white' }">Price/unit (Rs.)</th>
                    <th scope="col" :style="{ 'background-color': bgcolor, color: 'white' }">Unit</th>
                    <th scope="col" :style="{ 'background-color': bgcolor, color: 'white' }">Quantity</th>
                    <th scope="col" :style="{ 'background-color': bgcolor, color: 'white' }">Discount %</th>
                    <th scope="col" :style="{ 'background-color': bgcolor, color: 'white' }">Discounted Price (Rs.)</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(p, index) in prodList">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ p.product_name }}</td>
                    <td>{{ p.price_unit }}</td>
                    <td>{{ p.unit }}</td>
                    <td>{{ p.quantity }}</td>
                    <td>{{ p.discount }}</td>
                    <td>{{ p.discounted_price }}</td>
                </tr>
            </tbody>
        </table>
    </div>`,

    data() {
        return {
            user_id: localStorage.getItem('currentUserId'),
            authToken: localStorage.getItem('auth-token'),
            prodList: null,
        }
    },

    computed : {
        bgcolor(){
            if (this.$store.state.bgcolor === "#f0f0f0") {
                return '#102567'
            }
            else {
                return this.$store.state.bgcolor
            }
          },
    },

    async mounted(){
        const res = await fetch(`/buyingHistory/${this.user_id}`, {
            headers: {
                'Authentication-Token': this.authToken,
            },
        })
        const data = await res.json()
        if (res.ok){
            this.prodList = data
            // console.log(this.prodList)
        }
        else{
            alert(data.message)
            this.$router.push({path: '/buyerHomePageV'})
        }
    },
}