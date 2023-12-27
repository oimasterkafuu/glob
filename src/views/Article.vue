<template>
    <div class="ui center aligned container">
        <h1 class="ui header">
            {{ article.get('title') }}
            <div class="sub header" v-if="article.get('title')">
                <i class="icon clock"></i>
                <DateAndTime :time="article.get('createdAt')"></DateAndTime>
                &bull;

                <i class="icon history"></i>
                <DateAndTime :time="article.get('updatedAt')"></DateAndTime>
                &bull;

                <i class="icon eye"></i>
                {{ views }}

                <span v-if="user">
                    &bull;
                    <RouterLink :to="'/admin/editpost/' + id"> <i class="icon edit"></i>编辑 </RouterLink>
                </span>
            </div>
        </h1>
    </div>
    <div class="ui segment">
        <Marker :content="article.get('content')" :safe="true"></Marker>
    </div>
</template>

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
