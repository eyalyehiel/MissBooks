export default {

    template:`
    <section class="about">
        <main>
            <img src="./imgs/books.jpeg" alt="" />
            <h1>About</h1>
            <p>This app was built using <span class="vue">Vue.js</span> with the following technologies:</p>
            <p>Promises, Routes and more</p>
        </main>
    </section>
    `,
    data(){
        return{
                interval: null,
        }
    },

}