import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/admin',
        name: 'admin',
        component: () => import('../views/Admin/Login.vue')
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
