<template>
    <div class="ui center aligned container">
        <h1 class="ui header">
            {{ post.get('title') }}
            <div class="sub header" v-if="post.get('title')">
                <i class="icon clock"></i>
                <DateAndTime :time="post.get('createdAt')"></DateAndTime>
                &bull;

                <i class="icon history"></i>
                <DateAndTime :time="post.get('updatedAt')"></DateAndTime>
                &bull;

                <i class="icon eye"></i>
                {{ views }}
            </div>
        </h1>
    </div>
    <div class="ui segment">
        <Marker :content="post.get('content')" :safe="true"></Marker>
    </div>
</template>

<script>
export default {
    name: 'Post',
    data() {
        return {
            id: this.$route.params.id,
            post: {
                get: () => ''
            },
            views: 0
        };
    },
    async mounted() {
        const postQuery = new AV.Query('Articles');
        const post = await postQuery.get(this.id);
        this.post = post;

        const counter = new AV.Object('Counters');
        counter.set('article', post);
        await counter.save();

        const counterQuery = new AV.Query('Counters');
        counterQuery.equalTo('article', post);
        const counters = await counterQuery.count();
        this.views = counters;
    }
};
</script>
