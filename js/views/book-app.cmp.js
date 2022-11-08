import { bookService } from "../services/book-service.js"

import bookList from "../cmps/book-list.cmp.js"
import bookFilter from "../cmps/book-filter.cmp.js"

export default {
    template:`
    <section class="book-app">
        <book-filter @filter="filter" />
        <book-list v-if="books" :books="booksToDisplay"/>
    </section>
    `,
    created(){
        bookService.query()
        .then(books => {
            this.books = books
            console.log(this.books);
        })
    },
    data(){
        return{
            books: null,
            filterBy: {
                text: '',
                fromPrice:0, 
                toPrice:Infinity
            }
        }
    },
    methods: {
        filter(filterBy){
            console.log(filterBy);
            this.filterBy = filterBy
        }
    },
    computed: {
        booksToDisplay(){
            const regex = new RegExp(this.filterBy.text, 'i')
            let books = this.books.filter(book => regex.test(book.title))
            books = books.filter(book => book.listPrice.amount > this.filterBy.fromPrice)
            return books
            // return bookService.query()
            //                 .then(books => books.filter(book => regex.test(book.title)))
            //                 .then(books => books.filter(book => book.listPrice.amount > this.filterBy.fromPrice))
        }
    },
    components: {
        bookList,
        bookFilter
    }
}