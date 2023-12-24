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
                        {{ commentCount }}
                    </div>
                    <div class="label">评论数量</div>
                </div>
            </div>
        </div>
    </div>

    <div class="ui segment">
        <div class="ui grid">
            <div class="two wide left attached column">
                <div class="ui vertical fluid tabular menu admin-sidebar">
                    <a class="item" data-tab="articles"> 文章 </a>
                    <a class="item" data-tab="comments"> 评论 </a>
                </div>
            </div>
            <div class="fourteen wide right attached column">
                <div class="ui tab seamless right attached segment" data-tab="articles">
                    <ArticleList></ArticleList>
                </div>
                <div class="ui tab seamless right attached segment" data-tab="comments">
                    <Marker></Marker>
                </div>
            </div>
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
    name: 'Dashboard',
    data() {
        return {
            articleCount: 0,
            viewCount: 0,
            commentCount: 0
        };
    },
    mounted() {
        const articleQuery = new AV.Query('Articles');
        articleQuery.count().then((count) => {
            this.articleCount = count;
        });

        const viewQuery = new AV.Query('Counters');
        viewQuery.count().then((count) => {
            this.viewCount = count;
        });

        const commentQuery = new AV.Query('Comments');
        commentQuery.count().then((count) => {
            this.commentCount = count;
        });

        $('.tabular.menu .item').tab();
    }
};
</script>
