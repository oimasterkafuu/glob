<template>
    <div class="ui top fixed borderless menu">
        <div class="ui container">
            <RouterLink to="/" class="header item"> <div class="logo">oimaster</div> </RouterLink>

            <RouterLink to="/" class="item" :class="{ active: $route.path === '/' }">
                <i class="home icon"></i>
                首页
            </RouterLink>

            <a
                href="https://github.com/oimasterkafuu/glob"
                class="item mobile-hide"
                target="_blank"
                rel="noopener noreferrer"
            >
                <i class="heart icon"></i>
                开源
            </a>
        </div>
    </div>
</template>

<style>
body {
    padding-top: 60px;
}

@media (max-width: 723px) {
    .mobile-hide {
        display: none !important;
    }
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

<style>
:root {
    --body-full-height: calc(100vh - 60px);
}
</style>

<script>
export default {
    name: 'Navbar'
};
</script>
