<template>
    <MarkerUrl url="/Admin.md" :safe="true"></MarkerUrl>
    <div class="ui segment">
        <div class="ui three column fluid center aligned stackable grid">
            <div class="column">
                <div class="ui statistic">
                    <div class="value">
                        {{ articleCount }}
                    </div>
                    <div class="label">文章数量</div>
                </div>
            </div>
            <div class="column">
                <div class="ui statistic">
                    <div class="value">
                        {{ viewCount }}
                    </div>
                    <div class="label">访问总量</div>
                </div>
            </div>
            <div class="column">
                <div class="ui statistic">
                    <div class="value">
                        {{ shortLinkCount }}
                    </div>
                    <div class="label">短链数量</div>
                </div>
            </div>
        </div>
    </div>

    <div class="ui segment">
        <div class="ui top attached tabular menu">
            <RouterLink class="item" to="/admin/article-dashboard" active-class="active">文章</RouterLink>
            <RouterLink class="item" to="/admin/shortlink-dashboard" active-class="active">短链</RouterLink>
        </div>
        <div class="ui bottom attached segment">
            <RouterView></RouterView>
        </div>
    </div>
</template>

<style scoped>
.admin-sidebar {
    height: 100%;
}
</style>

<script>
export default {
    name: 'MainDashboard',
    data() {
        return {
            articleCount: 0,
            viewCount: 0,
            shortLinkCount: 0
        };
    },
    created() {
        if (this.$route.path === '/admin' || this.$route.path === '/admin/') {
            this.$router.replace('/admin/article-dashboard');
        }
    },
    mounted() {
        document.title = '后台 - oimaster';

        const articleQuery = new AV.Query('Articles');
        articleQuery.count().then((count) => {
            this.articleCount = count;
        });

        const viewQuery = new AV.Query('Counters');
        viewQuery.count().then((count) => {
            this.viewCount = count;
        });

        const shortLinkQuery = new AV.Query('ShortLinks');
        shortLinkQuery.count().then((count) => {
            this.shortLinkCount = count;
        });
    }
};
</script>
