import bookPreview from "./book-preview.cmp.js"

export default {
    props: ['books'],
    template:`
        <section class="book-section">
            <ul class="book-list">
                <li v-for="book in books" :key="book.id">
                    <router-link :to="'/book/' + book.id">
                        <book-preview @click="selectBook(book.id)" :book="book" />
                    </router-link>
                </li>
            </ul>
        </section>
    `,
    methods: {
        selectBook(bookId){
            // this.$router.push(`/book/${bookId}`)
        }
    },
    components: {
        bookPreview,
    }
}