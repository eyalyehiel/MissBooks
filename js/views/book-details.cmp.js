import { bookService } from "../services/book-service.js"
import { eventBus } from '../services/event-bus.service.js'

import bookReview from "../cmps/book-review.cmp.js"
import reviewAdd from "../cmps/review-add.cmp.js"

export default {
    name: 'book-details',
    // props: ['bookId'],
    template: `
        <section v-if="book" class="book-details">
                <img :src="book.thumbnail" >
                <section class="book-info">
                    <h2>{{ book.title }}</h2>
                    <h4>{{ book.subtitle }}</h4>
                    <h4>Authors: <span>{{ book.authors.join(',') }}</span></h4>
                    <h4>{{ pageCount }}{{bookStatus}}</h4>
                    <p>{{ bookDesc }}. <a v-if="!isLong" href="#" @click="fullDesc">{{readMoreBtn}}</a></p>
                    <p>Categories: {{ book.categories.join(',') }}</p>
                    <p><span :class="priceStatus">Price: {{ book.listPrice.amount }}{{currencyCode}}</span>
                    <span class="red">{{ isOnSale }}</span>
                </p>
                </section>
                    <review-add @reviewed="addReview"/>
                    <section class="book-reviews">
                        <ul class="review-list">
                            <li v-for="review in book.reviews" :key="review.id">
                                <book-review @removed="removeReview" :review="review"/>
                            </li>
                        </ul>
                    </section>
            <!-- <button @click="$emit('close')">X</button> -->
        </section>
    `,
    data() {
        return {
            book: null,
            bookDesc: '',
            isLong: true,
        }
    },
    created() {
        const {id} = this.$route.params
        bookService.getById(id)
            .then(book => this.book = book)
    },
    methods: {
        removeReview(id) {
            bookService.removeReview(this.book.id, id)
                .then(book => {
                    this.book = book
                    const msg = {
                        txt: `Review Removed`,
                        type: 'success',
                    }
                    eventBus.emit('user-msg', msg)
                })
        },
        addReview(review) {
            bookService.addReview(this.book.id, review)
                .then(book => {
                    this.book = book
                    const msg = {
                        txt: `Book ${this.book.title} was successfully added`,
                        type: 'success',
                        link: `/book/${book.id}`
                    }
                    eventBus.emit('user-msg', msg)
                })

        },

        bookDescription() {
            if (this.book.description.length > 100) {
                this.bookDesc = this.book.description.substring(0, 100)
                this.isLong = false
            }
            else this.bookDesc = this.book.description
        },
        fullDesc() {
            if (this.bookDesc === this.book.description) this.bookDesc = this.book.description.substring(0, 100)
            else this.bookDesc = this.book.description
        }
    },
    computed: {
        readMoreBtn() {
            if (this.bookDesc === this.book.description) return 'See less'
            return 'See more'
        },
        pageCount() {
            if (this.book.pageCount < 100) return 'Light Reading, '
            if (this.book.pageCount > 200 && this.book.pageCount <= 500) return 'Decent Reading, '
            else if (this.book.pageCount > 500) return 'Long Reading, '
        },
        bookStatus() {
            const currYear = new Date(Date.now()).getFullYear()
            if (currYear - this.book.publishedDate < 1) return 'New!'
            if (currYear - this.book.publishedDate > 10) return 'Veteran Book'
        },
        priceStatus() {
            if (this.book.listPrice.amount > 150) return 'red'
            if (this.book.listPrice.amount < 20) return 'green'
        },
        isOnSale() {
            if (this.book.listPrice.isOnSale) return ' SALE!'
            return ''
        },
        currencyCode() {
            if (this.book.listPrice.currencyCode === 'USD') return '$'
            if (this.book.listPrice.currencyCode === 'EUR') return '€'
            if (this.book.listPrice.currencyCode === 'ILS') return '₪'
        }
    },
    components: {
        bookReview,
        reviewAdd,
    }
}