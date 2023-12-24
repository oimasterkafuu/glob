<template>
    <MarkerUrl url="/Admin.md" :safe="true"></MarkerUrl>
    <div class="ui segment">
        <div class="ui three column fluid center aligned stackable grid">
            <div class="column">
                <div class="ui statistic">
                    <div class="value">
                        <i class="book icon"></i>
                        {{ articleCount }}
                    </div>
                    <div class="label">Articles</div>
                </div>
            </div>
            <div class="column">
                <div class="ui statistic">
                    <div class="value">
                        <i class="eye icon"></i>
                        {{ viewCount }}
                    </div>
                    <div class="label">Views</div>
                </div>
            </div>
            <div class="column">
                <div class="ui statistic">
                    <div class="value">
                        <i class="comment icon"></i>
                        {{ commentCount }}
                    </div>
                    <div class="label">Comments</div>
                </div>
            </div>
        </div>
    </div>
</template>

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
    }
};
</script>
