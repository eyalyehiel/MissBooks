const { createRouter, createWebHashHistory } = VueRouter

import bookApp from "../views/book-app.cmp.js"
import homePage from "../views/home-page.cmp.js"
import aboutPage from "../views/about.cmp.js"
import bookDetails from "../views/book-details.cmp.js"

const routerOptions = {
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: homePage
        },
        {
            path: '/books',
            component: bookApp
        },
        {
            path: '/about',
            component: aboutPage
        },
        {
            path: '/book/:id',
            component: bookDetails
        }
    ]
}

export const router = createRouter(routerOptions)
