<template>
    <div class="ui top fixed borderless menu">
        <div class="ui container">
            <RouterLink to="/" class="header item">
                <div class="logo">oimaster</div>
            </RouterLink>

            <RouterLink to="/" class="item" :class="{ active: $route.path === '/' }">
                <i class="home icon"></i>
                首页
            </RouterLink>

            <RouterLink to="/articles" class="item" :class="{ active: $route.path === '/articles' }">
                <i class="book icon"></i>
                文章
            </RouterLink>

            <div class="right menu mobile-hide">
                <a href="https://github.com/oimasterkafuu/glob" class="item" target="_blank" rel="noopener noreferrer">
                    <i class="heart icon"></i>
                    开源
                </a>
                <RouterLink to="/admin" class="item" :class="{ active: $route.path === '/admin' }" v-if="user">
                    <i class="cog icon"></i>
                    后台
                </RouterLink>
                <a class="item" v-if="user" @click="logOut()">
                    <i class="sign out icon"></i>
                    登出
                </a>
            </div>
        </div>
    </div>
</template>

<style>
#app {
    padding-top: 60px;
    padding-bottom: 60px;
}

@media (max-width: 723px) {
    .mobile-hide {
        display: none !important;
    }
}

:root {
    --body-full-height: calc(100vh - 120px);
}
</style>

<style scoped>
div.ui.top.fixed.borderless.menu {
    position: fixed;
    height: 49px;
}

div.logo {
    color: black;
    font-size: 1.5em;
}
</style>

<script>
export default {
    name: 'Navbar',
    data() {
        return {
            user: AV.User.current()
        };
    },
    methods: {
        logOut() {
            AV.User.logOut();
            location.reload();
        }
    }
};
</script>
