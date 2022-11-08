export default {
    props: ['book'],
    template:`
        <section class="book-preview">
            <img :src="book.thumbnail">
            <div className="info">
                <h3>{{ book.title }}</h3>
                <h4 :class="priceStatus">{{ book.listPrice.amount }}{{currencyCode}}</h4>
            </div>
        </section>
    `,
    computed: {
        currencyCode(){
            if(this.book.listPrice.currencyCode === 'USD') return '$'
            if(this.book.listPrice.currencyCode === 'EUR') return '€'
            if(this.book.listPrice.currencyCode === 'ILS') return '₪'
        },
        priceStatus(){
            if(this.book.listPrice.amount > 150) return 'red'
            if(this.book.listPrice.amount < 20) return 'green'
        },
    },
}