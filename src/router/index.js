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
        path: '/s/:shortlink',
        name: 'shortlink',
        beforeEnter: (to, from, next) => {
            const articleQuery = new AV.Query('ShortLinks');
            articleQuery.equalTo('name', to.params.shortlink);
            articleQuery.select([]);
            articleQuery.first().then((article) => {
                if (article) {
                    next(`/article/${article.get('article').get('objectId')}`);
                } else {
                    next('/');
                }
            });
        },
        component: () => null
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
                path: 'shortlink-dashboard',
                name: 'shortlink-dashboard',
                component: () => import('../views/Admin/ShortLinks/ShortLinkDashboard.vue')
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
