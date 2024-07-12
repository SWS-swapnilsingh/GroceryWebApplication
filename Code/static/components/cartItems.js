export default {
    template: `<div class="m-2">
        <h1>cart Items</h1>
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
                    <th scope="col" :style="{ 'background-color': bgcolor, color: 'white' }">Action</th>
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
                    <td>{{ p.total_price }}</td>
                    <td><button @click="deleteItem(p.item_id)" >Delete</button></td>
                </tr>
                <tr>
                    <td colspan="6"><b>Grand Total</b></td>
                    <td>{{Grand_total}}</td>
                </tr>

            </tbody>
        </table>
        <button class="btn btn-primary" @click="buyAllVF"> Buy All </button>
    </div>`,
    data(){
        return {
            user_id: localStorage.getItem('currentUserId'),
            authToken: localStorage.getItem('auth-token'),
            prodList: null,
            Grand_total: null,
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
        const res = await fetch(`/cartItems/${this.user_id}`, {
            headers: {
                'Authentication-Token': this.authToken,
            },
        })
        const data = await res.json()
        if (res.ok){
            this.prodList = data[0]
            this.Grand_total = data[1]
            // console.log(this.prodList)
        }
        else{
            alert(data.message)
            this.$router.push({path: '/buyerHomePageV'})
        }
    },
    methods: {
        async deleteItem(item_id){
            // console.log(item_id)
            const res = await fetch(`/deleteItemPF/${item_id}`, {
                headers: {
                    "Authentication-Token": this.authToken,
                },
            })
            const data = await res.json()
            if (res.ok){
                alert(data.message)
                this.$router.go(0)
            }
            else{
                alert(data.message)
            }
        },

        async buyAllVF(){
            const res = await fetch('/buyAll', {
                headers: {
                    "Authentication-Token": this.authToken,
                },
            })
            const data = await res.json()
            if (res.ok){
                alert(data.message)
                this.$router.push({path: '/'})
            }
            else{
                alert(data.message)
            }
        },
    },
}

//<table>
        //     <thead>
        //         <tr>
        //             <th scope="col">Item No</th>
        //             <th scope="col">Product Name</th>
        //             <th scope="col">Price_Unit</th>
        //             <th scope="col">Unit</th>
        //         </tr>
        //     </thead>
        //     <tbody>
        //         <div v-for="(p,index) in prodList">
        //             <tr>
        //                 <th scope="row">{{index}}</th>
        //                 <td>{{p.product_name}}</td>
        //                 <td>{{p.price_unit}}</td>
        //                 <td> /{{p.unit}}</td>
        //             </tr>
        //         </div>
        //     </tbody>
        // </table>