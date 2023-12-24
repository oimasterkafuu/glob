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
        component: () => {
            if (AV.User.current()) {
                return import('../views/Admin/Dashboard.vue');
            } else {
                return import('../views/Admin/Login.vue');
            }
        }
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
