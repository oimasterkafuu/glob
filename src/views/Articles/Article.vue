<template>
    <div class="ui center aligned container">
        <h1 class="ui header">
            {{ article.get('title') }}
            <div class="sub header" v-if="article.get('title')">
                <i class="icon user"></i>
                <RouterLink class="meta-link" to="/">oimaster</RouterLink>
                &bull;

                <i class="icon clock"></i>
                <DateTime :time="article.get('createdAt')"></DateTime>
                &bull;

                <span v-if="article.get('updatedAt') - article.get('createdAt') > 86400000">
                    <i class="icon history"></i>
                    <DateTime :time="article.get('updatedAt')"></DateTime>
                    &bull;
                </span>

                <i class="icon eye"></i>
                {{ views }}

                <span v-if="user">
                    &bull;
                    <RouterLink class="meta-link" :to="'/admin/editpost/' + id">
                        <i class="icon edit"></i>编辑
                    </RouterLink>
                </span>
            </div>
        </h1>
    </div>
    <div class="ui segment">
        <Marker :content="article.get('content')" :safe="true"></Marker>
    </div>
</template>

<style scoped>
.meta-link {
    color: inherit;
}
</style>

<script>
export default {
    name: 'Article',
    data() {
        return {
            id: this.$route.params.id,
            article: {
                get: () => ''
            },
            views: 0,
            user: AV.User.current()
        };
    },
    async mounted() {
        const postQuery = new AV.Query('Articles');
        const article = await postQuery.get(this.id);
        this.article = article;

        document.title = article.get('title') + ' - oimaster';

        const counter = new AV.Object('Counters');
        counter.set('article', article);
        await counter.save();

        const counterQuery = new AV.Query('Counters');
        counterQuery.equalTo('article', article);
        const counters = await counterQuery.count();
        this.views = counters;
    }
};
</script>
