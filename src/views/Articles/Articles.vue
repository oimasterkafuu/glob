<template>
    <h2 class="ui center aligned header">
        文章
        <div class="sub header">从下面选择你想进入的文章。</div>
    </h2>
    <ArticleCards :filterArticles="filterArticles" :key="filterArticles"></ArticleCards>
    <div class="ui centered pagination menu" v-if="maxPage > 1">
        <RouterLink :class="['icon', 'item', { disabled: !hasPrevPage }]" :to="'/articles/' + (page - 1)">
            <i class="left chevron icon"></i>
        </RouterLink>
        <RouterLink :class="['icon', 'item', { disabled: !hasNextPage }]" :to="'/articles/' + (page + 1)">
            <i class="right chevron icon"></i>
        </RouterLink>
    </div>
</template>

<script>
export default {
    name: 'Articles',
    data() {
        return {
            filterArticles: [],
            page: parseInt(this.$route.params.page) || 1,
            limit: 5,
            maxPage: 0
        };
    },
    beforeRouteUpdate(to, from, next) {
        this.page = parseInt(to.params.page) || 1;
        const query = new AV.Query('Articles');
        query.descending('createdAt');
        query.skip((this.page - 1) * this.limit);
        query.limit(this.limit);
        query.find().then((articles) => {
            this.filterArticles = articles;
        });
        next();
    },
    mounted() {
        document.title = '文章 - oimaster';
        const query = new AV.Query('Articles');
        query.descending('createdAt');
        query.skip((this.page - 1) * this.limit);
        query.limit(this.limit);
        query.find().then((articles) => {
            this.filterArticles = articles;
        });

        const maxPageQuery = new AV.Query('Articles');
        maxPageQuery.count().then((count) => {
            this.maxPage = Math.ceil(count / this.limit);
        });
    },
    computed: {
        hasNextPage() {
            return this.page < this.maxPage;
        },
        hasPrevPage() {
            return this.page > 1;
        }
    }
};
</script>
