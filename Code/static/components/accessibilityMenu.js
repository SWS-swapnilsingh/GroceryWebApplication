export default {
    template: `<div>
    <button @click="increasefont">Increase Font</button>
    </div>`,

    data(){
        return {
            font_size: null,
        }
    },

    methods : {
        increasefont(){
            this.font_size = this.font_size + 1
            localStorage.setItem('font_size', this.font_size)
        }
    }
}