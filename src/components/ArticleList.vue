<template>
    <div class="ui grid">
        <div class="row">
            <div class="right aligned column">
                <a class="ui labeled icon mini button" @click="createArticle">
                    <i class="plus icon"></i>
                    新建文章
                </a>
            </div>
        </div>
    </div>

    <table class="ui unstackable center aligned celled table">
        <thead>
            <tr>
                <th class="two wide">标题</th>
                <th class="left aligned">更新时间</th>
                <th class="two wide" colspan="2">操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="article in articles" :key="article.get('objectId')" v-if="articles && articles.length">
                <td>{{ article.get('title') }}</td>
                <td class="left aligned">
                    <DateAndTime :time="article.get('updatedAt')"></DateAndTime>
                </td>
                <td>
                    <RouterLink :to="'/admin/editpost/' + article.get('objectId')">编辑</RouterLink>
                </td>
                <td>
                    <a @click="deleteArticle(article)" class="delete-link">删除</a>
                </td>
            </tr>
            <tr v-for="i in 5" :key="i" v-else>
                <td v-for="j in 3" :key="j">
                    <div class="ui placeholder">
                        <div class="header">
                            <div class="line"></div>
                            <div class="line"></div>
                        </div>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>

    <div class="ui mini basic modal" id="delete-modal">
        <div class="ui icon header">
            <i class="trash icon"></i>
            删除
        </div>
        <div class="content">
            <p>确定要删除该文章吗？此操作不可撤销。</p>
        </div>
        <div class="actions">
            <div class="ui red basic cancel inverted button">
                <i class="remove icon"></i>
                否
            </div>
            <div class="ui green ok inverted button">
                <i class="checkmark icon"></i>
                是
            </div>
        </div>
    </div>
</template>

<style scoped>
.delete-link {
    cursor: pointer;
}
</style>

<script>
export default {
    name: 'ArticleList',
    data() {
        return {
            user: AV.User.current(),
            articles: null
        };
    },
    mounted() {
        const query = new AV.Query('Articles');
        query.find().then((articles) => {
            this.articles = articles;
        });
    },
    methods: {
        deleteArticle(article) {
            $('#delete-modal')
                .modal({
                    onApprove: async () => {
                        $('#delete-modal').addClass(['loading', 'disabled']);
                        const counters = new AV.Query('Counters');
                        counters.equalTo('article', article);
                        const deletingCounters = await counters.find();
                        await AV.Object.destroyAll(deletingCounters);
                        await article.destroy();
                        location.reload();
                    }
                })
                .modal('show');
        },
        createArticle() {
            const newArticle = new AV.Object('Articles');
            newArticle.set('title', '新建文章');
            newArticle.save().then((article) => {
                this.$router.push('/admin/editpost/' + article.get('objectId'));
            });
        }
    }
};
</script>
