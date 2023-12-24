<template>
    <div class="ui fluid card" v-for="article in articles" :key="article.get('objectId')" v-if="articles.length > 0">
        <div class="content">
            <div class="header">
                <RouterLink :to="'/post/' + article.get('objectId')">
                    {{ article.get('title') }}
                </RouterLink>
            </div>
            <div class="meta">
                <i class="icon user"></i>
                <RouterLink to="/">oimaster</RouterLink>&bull;

                <i class="icon clock"></i>
                <DateAndTime :time="article.get('createdAt')"></DateAndTime>
                &bull;

                <i class="icon history"></i>
                <DateAndTime :time="article.get('updatedAt')"></DateAndTime>
                &bull;

                <i class="icon eye"></i>
                {{ article.views }}
            </div>

            <div class="description">
                <blockquote class="ui segment article-content">
                    <Marker :content="article.get('content')" :safe="true" :max-header="3"> </Marker>
                </blockquote>
            </div>
        </div>
    </div>
    <div class="ui fluid card" v-for="i in limit" v-else>
        <div class="content">
            <div class="ui placeholder">
                <div class="line"></div>
            </div>
            <div class="description">
                <blockquote class="ui segment article-content">
                    <Marker></Marker>
                </blockquote>
            </div>
        </div>
    </div>
</template>

<style scoped>
.article-content {
    max-height: 200px;
    overflow: hidden;
}
</style>

<script>
import { RouterLink } from 'vue-router';

export default {
    name: 'ArticleCards',
    props: {
        filterArticles: {
            type: Array
        },
        limit: {
            type: Number,
            default: 10
        }
    },
    data() {
        return {
            articles: []
        };
    },
    mounted() {
        if (this.filterArticles && this.filterArticles.length > 0) {
            this.articles = this.filterArticles;
        } else {
            const query = new AV.Query('Articles');
            query.descending('createdAt');
            query.limit(this.limit);
            query.find().then((articles) => {
                this.articles = articles;

                // for each article, get the views
                this.articles.forEach(async (article) => {
                    article.views = await this.getViews(article);
                });
            });
        }
    },
    methods: {
        async getViews(post) {
            const counterQuery = new AV.Query('Counters');
            counterQuery.equalTo('article', post);
            counterQuery.select([]);
            const counters = await counterQuery.find();
            return counters.length;
        }
    }
};
</script>
