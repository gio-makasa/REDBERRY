import { createApp } from 'vue'
import { createRouter, createWebHistory } from "vue-router";

import App from './App.vue'
import TheHome from './pages/TheHome.vue'
import AddItem from './pages/AddItem.vue'
import TheList from './pages/TheList.vue'
import LaptopDetails from './pages/LaptopDetails.vue'

import NavBar from './components/NavBar.vue'
import StuffInfo from './components/StuffInfo.vue'
import LaptopInfo from './components/LaptopInfo.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/home' },
        { path: '/home', component: TheHome },
        {
            path: '/AddItem', component: AddItem, children: [
                { path: '/AddItem/StuffInfo', component: StuffInfo, props: true },
                { path: '/AddItem/LaptopInfo', component: LaptopInfo, props:true }
            ]
        },
        { path: '/list', component: TheList },
        { path: '/LaptopDetails/:laptopId', component: LaptopDetails },
    ]
})

const app = createApp(App);
app.use(router);
app.component('NavBar', NavBar);
app.mount('#app');