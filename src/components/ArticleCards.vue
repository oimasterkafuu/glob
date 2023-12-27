<template>
    <div class="ui fluid card" v-for="article in articles" :key="article.get('objectId')" v-if="articles.length > 0">
        <div class="content">
            <div class="header">
                <RouterLink :to="'/article/' + article.get('objectId')">
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
                <blockquote class="ui very short scrolling segment">
                    <Marker :content="article.get('content')" :safe="true" :max-header="3"> </Marker>
                </blockquote>
            </div>
        </div>
    </div>
    <div class="ui fluid card" v-for="i in limit" v-else>
        <div class="content">
            <div class="header">
                <div class="ui placeholder">
                    <div class="line"></div>
                </div>
            </div>
            <div class="description">
                <blockquote class="ui very short scrolling segment">
                    <Marker></Marker>
                </blockquote>
            </div>
        </div>
    </div>
</template>

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

                this.articles.forEach(async (article) => {
                    article.views = await this.getViews(article);
                });
            });
        }
    },
    methods: {
        async getViews(article) {
            const counterQuery = new AV.Query('Counters');
            counterQuery.equalTo('article', article);
            const counters = await counterQuery.count();
            return counters;
        }
    }
};
</script>
