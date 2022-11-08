export default {

    template: `
        <section class="book-filters">
            <form>
                <input v-model="filterBy.text" type="text" placeholder="Search"/>
                <label for="priceRange">Min. Price</label>
                <input  v-model="filterBy.fromPrice" 
                min="0" max="300" id="priceRange" type="range">
                <button @click.prevent="filter">Filter</button>
            </form>
        </section>
    `,
    data() {
        return {
            filterBy: {
                text: '',
                fromPrice: 0,
                toPrice: Infinity
            }
        }
    },
    methods: {
        filter() {

            console.log(this.filterBy);
            this.$emit('filter', {...this.filterBy})
        }
    },
    computed: {

    },
}