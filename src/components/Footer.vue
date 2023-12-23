<template>
    <div class="ui segment">
        <div class="ui container">
            <span class="mobile-hide">
                版本
                <a :href="'https://github.com/oimasterkafuu/glob/releases/tag/v' + appVersion"> v{{ appVersion }}</a>
                ， 构建于 <a> {{ appBuildTime }}</a>
            </span>

            <span class="right">© 2023 oimasterkafuu</span>
        </div>
    </div>
</template>

<script setup>
import moment from 'moment';
const appVersion = __APP_VERSION__;
const appBuildTime = __APP_BUILD_TIME__;
</script>

<script>
export default {
    name: 'Footer'
};
</script>

<style>
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
