import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/articles/:page?',
        name: 'articles',
        component: () => import('../views/Articles/Articles.vue')
    },
    {
        path: '/article/:id',
        name: 'article',
        component: () => import('../views/Articles/Article.vue')
    },
    {
        path: '/admin',
        name: 'admin',
        component: () => {
            if (AV.User.current()) {
                return import('../views/Admin/MainDashboard.vue');
            } else {
                return import('../views/Admin/Login.vue');
            }
        },
        children: [
            {
                path: 'article-dashboard',
                name: 'article-dashboard',
                component: () => import('../views/Admin/Articles/ArticleDashboard.vue')
            },
            {
                path: 'comment-dashboard',
                name: 'comment-dashboard',
                component: () => import('../views/Admin/Comments/CommentDashboard.vue')
            }
        ]
    },
    {
        path: '/admin/editpost/:id',
        name: 'edit',
        component: () => {
            if (AV.User.current()) {
                return import('../views/Admin/Articles/ArticleEdit.vue');
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
