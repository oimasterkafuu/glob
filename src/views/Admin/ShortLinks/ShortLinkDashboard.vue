<template>
    <div class="ui grid">
        <div class="row">
            <div class="right aligned column">
                <a class="ui labeled icon mini button" @click="createLink">
                    <i class="plus icon"></i>
                    新建短链
                </a>
            </div>
        </div>
    </div>

    <table class="ui unstackable center aligned celled table">
        <thead>
            <tr>
                <th class="two wide">名称</th>
                <th class="left aligned">文章</th>
                <th class="three wide" colspan="3">操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="link in links" :key="link.get('objectId')" v-if="links && links.length">
                <td>{{ link.get('name') }}</td>
                <td class="left aligned">{{ link.articleName }}</td>
                <td>
                    <a @click="copyLink(link)" class="action-link">复制</a>
                </td>
                <td>
                    <a @click="editLink(link)" class="action-link">编辑</a>
                </td>
                <td>
                    <a @click="deleteLink(link)" class="action-link">删除</a>
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

    <div class="ui modal" id="edit-modal">
        <div class="header">编辑短链</div>
        <div class="content">
            <div class="ui large form" id="edit-form">
                <div class="two fields">
                    <div class="field">
                        <div class="ui left icon input">
                            <i class="linkify icon"></i>
                            <input type="text" name="name" placeholder="输入短链名称" />
                        </div>
                    </div>
                    <div class="field">
                        <div class="ui selection icon dropdown">
                            <input type="hidden" name="article" />
                            <div class="default text">文章名称</div>
                            <i class="dropdown icon"></i>
                            <div class="menu">
                                <div
                                    class="item"
                                    :data-value="article.get('objectId')"
                                    v-for="article in articles"
                                    :key="article.get('objectId')"
                                >
                                    {{ article.get('title') }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ui error message"></div>
            </div>
        </div>
        <div class="actions">
            <div class="ui positive button" id="save-button">保存</div>
            <div class="ui negative button">取消</div>
        </div>
    </div>

    <div class="ui mini basic modal" id="delete-modal">
        <div class="ui icon header">
            <i class="trash icon"></i>
            删除
        </div>
        <div class="content">
            <p>确定要删除该短链吗？此操作不可撤销。</p>
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
.action-link {
    cursor: pointer;
}
</style>

<script>
export default {
    name: 'ShortLinkList',
    data() {
        return {
            user: AV.User.current(),
            links: null,
            articles: null,
            nowEditing: null
        };
    },
    mounted() {
        const query = new AV.Query('ShortLinks');
        query.descending('createdAt');
        query.find().then((links) => {
            this.links = links;
            this.links.forEach((link) => {
                const articleQuery = new AV.Query('Articles');
                articleQuery.equalTo('objectId', link.get('article').get('objectId'));
                articleQuery.select('title');
                articleQuery.first().then((article) => {
                    link.articleName = article.get('title');
                });
            });
        });
        const articleQuery = new AV.Query('Articles');
        articleQuery.descending('createdAt');
        articleQuery.select('title');
        articleQuery.find().then((articles) => {
            this.articles = articles;
        });
        $('.ui.dropdown').dropdown();
        $('#edit-form').form({
            fields: {
                name: {
                    identifier: 'name',
                    rules: [
                        {
                            type: 'empty',
                            prompt: '请输入短链名称'
                        },
                        {
                            type: 'maxLength[40]',
                            prompt: '短链名称过长'
                        },
                        {
                            type: 'regExp[/^[a-z0-9_]+$/]',
                            prompt: '短链名称只能包含小写字母、数字和下划线'
                        }
                    ]
                },
                article: {
                    identifier: 'article',
                    rules: [
                        {
                            type: 'empty',
                            prompt: '请选择文章'
                        }
                    ]
                }
            },
            onSuccess: async () => {
                const query = new AV.Query('ShortLinks');
                query.equalTo('name', $('#edit-form input[name="name"]').val());
                query.select([]);
                const links = await query.find();
                if (links.length > 0) {
                    await AV.Object.destroyAll(links);
                }

                const articleQuery = new AV.Query('Articles');
                articleQuery.equalTo('objectId', $('#edit-form input[name="article"]').val());
                articleQuery.select([]);
                this.nowEditing.set('name', $('#edit-form input[name="name"]').val());
                this.nowEditing.set('article', await articleQuery.first());
                await this.nowEditing.save();

                $('#edit-modal').modal('hide');
                location.reload();
            },
            onFailure: () => {
                $('#save-button').removeClass(['loading', 'disabled']);
            }
        });
    },
    methods: {
        deleteLink(link) {
            $('#delete-modal')
                .modal({
                    onApprove: async () => {
                        await link.destroy();
                        location.reload();
                    }
                })
                .modal('show');
        },
        editLink(link) {
            if (link.get('name')) {
                $('#edit-form input[name="name"]').val(link.get('name'));
                $('.ui.dropdown').dropdown('set selected', link.get('article').get('objectId'));
            }
            $('#edit-modal')
                .modal({
                    onApprove: () => {
                        this.nowEditing = link;
                        $('#save-button').addClass(['loading', 'disabled']);
                        $('#edit-form').form('validate form');
                        return false;
                    }
                })
                .modal('show');
        },
        createLink() {
            const link = new AV.Object('ShortLinks');
            this.editLink(link);
        },
        copyLink(link) {
            const url = `${window.location.origin}/#/s/${link.get('name')}`;
            navigator.clipboard.writeText(url);
            $.toast({
                class: 'success',
                title: '短链已复制到剪切板',
                message: url,
                showProgress: 'top',
                duration: 2000
            });
        }
    }
};
</script>
