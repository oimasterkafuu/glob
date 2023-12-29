<template>
    <div class="ui segment">
        <div class="ui container">
            <span class="mobile-hide">
                版本
                <a :href="'https://github.com/oimasterkafuu/glob/releases/tag/v' + appVersion"> v{{ appVersion }}</a>
                ，使用 <a href="https://github.com/oimasterkafuu/glob/blob/main/LICENSE">MIT</a> 协议开源 ，构建于
                <a> {{ appBuildTime }}</a>
            </span>

            <span class="right">
                © 2023
                <a href="https://github.com/oimasterkafuu" target="_blank" rel="noopener noreferrer"
                    >oimasterkafuu</a
                ></span
            >
        </div>
    </div>
</template>

<script setup>
const appVersion = __APP_VERSION__;
const appBuildTime = __APP_BUILD_TIME__;
</script>

<script>
export default {
    name: 'Footer'
};
</script>

<style scoped>
.ui.segment {
    position: fixed;
    height: 49px;
    bottom: 0;
    width: 100%;
}
.right {
    float: right;
}
</style>
