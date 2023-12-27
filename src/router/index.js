import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/articles',
        name: 'articles',
        component: () => import('../views/Articles.vue')
    },
    {
        path: '/article/:id',
        name: 'article',
        component: () => import('../views/Article.vue')
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
        },
        children: [
            {
                path: 'article-dashboard',
                name: 'article-dashboard',
                component: () => import('../views/Admin/ArticleDashboard.vue')
            },
            {
                path: 'comment-dashboard',
                name: 'comment-dashboard',
                component: () => import('../components/Marker.vue') // todo
            }
        ]
    },
    {
        path: '/admin/editpost/:id',
        name: 'edit',
        component: () => {
            if (AV.User.current()) {
                return import('../views/Admin/EditArticle.vue');
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
