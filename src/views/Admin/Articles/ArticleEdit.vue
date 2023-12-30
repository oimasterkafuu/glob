<template>
    <h2 class="ui center aligned header">
        编辑文章
        <div class="sub header">文章不太满意的地方，都可以改改哦！</div>
    </h2>
    <div class="ui top attached tabular menu">
        <a class="item active" data-tab="edit">编辑</a>
        <a class="item" data-tab="preview">预览</a>

        <div class="right menu">
            <RouterLink class="item dangerous-back" to="/admin/article-dashboard">到仪表盘</RouterLink>
            <RouterLink class="item dangerous-back" :to="'/article/' + $route.params.id">回到前台</RouterLink>
        </div>
    </div>
    <div class="ui bottom attached tab segment active" data-tab="edit">
        <div class="ui form">
            <div class="field">
                <input type="text" id="title" name="title" placeholder="标题" v-model="title" @input="onInput" />
            </div>
            <div class="field">
                <textarea
                    rows="25"
                    id="content"
                    name="content"
                    class="markdown-edit"
                    placeholder="正文"
                    v-model="content"
                    @input="onInput"
                ></textarea>
            </div>
        </div>
    </div>
    <div class="ui bottom attached tab segment" data-tab="preview">
        <Marker :content="'# ' + title + '\n\n' + content" :safe="true"></Marker>
    </div>
    <div class="ui center aligned container">
        <div type="submit" class="ui positive button" @click="submit" id="submit">
            提交
            <i class="right arrow icon"></i>
        </div>
    </div>
</template>

<style scoped>
.markdown-edit {
    font-family: 'Courier New' !important;
}
</style>

<script>
export default {
    name: 'ArticleEdit',
    data() {
        return {
            title: '',
            content: ''
        };
    },
    methods: {
        submit() {
            if (!this.title || !this.content) {
                return;
            }
            $('#submit').addClass('loading', 'disabled');
            const article = AV.Object.createWithoutData('Articles', this.$route.params.id);
            article.set('title', this.title);
            article.set('content', this.content);
            article.save().then(() => {
                $.toast({
                    class: 'success',
                    message: '文章已保存',
                    showProgress: 'top',
                    duration: 2000
                });
                $('#submit').removeClass('loading', 'disabled');
            });
            $('.dangerous-back').removeClass('disabled');
        },
        keyDownListener(e) {
            if (e.metaKey && e.key === 's') {
                e.preventDefault();
                this.submit();
            }
        },
        onInput() {
            $('.dangerous-back').addClass('disabled');
        }
    },
    mounted() {
        document.addEventListener('keydown', this.keyDownListener);
        $('.tabular.menu .item').tab();

        const query = new AV.Query('Articles');
        query.get(this.$route.params.id).then((article) => {
            this.title = article.get('title');
            document.title = this.title + ' - 编辑文章 - oimaster';
            this.content = article.get('content');
        });
    },
    beforeUnmount() {
        document.removeEventListener('keydown', this.keyDownListener);
    }
};
</script>
