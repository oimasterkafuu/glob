<template>
    <div class="ui middle aligned center aligned grid">
        <div class="column">
            <h2 class="ui header">
                登录
                <div class="sub header">通往后台，闲人勿进</div>
            </h2>
            <div class="ui segment">
                <div class="ui large form" id="login-form">
                    <div class="field">
                        <div class="ui left icon input">
                            <i class="user icon"></i>
                            <input type="text" name="username" placeholder="输入用户名" />
                        </div>
                    </div>
                    <div class="field">
                        <div class="ui left icon input">
                            <i class="lock icon"></i>
                            <input type="password" name="password" placeholder="输入密码" />
                        </div>
                    </div>
                    <div class="ui error message"></div>
                    <div class="field">
                        <button class="ui fluid large positive icon button" id="login-button" @click="submit()">
                            进入后台
                            <i class="key icon"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.grid {
    height: var(--body-full-height);
}

.column {
    max-width: 450px;
}
</style>

<script>
export default {
    name: 'Login',
    mounted() {
        document.title = '登录 - oimaster';

        $('#login-form').form({
            fields: {
                username: {
                    identifier: 'username',
                    rules: [
                        {
                            type: 'empty',
                            prompt: '请输入用户名'
                        }
                    ]
                },
                password: {
                    identifier: 'password',
                    rules: [
                        {
                            type: 'empty',
                            prompt: '请输入密码'
                        }
                    ]
                }
            },
            onSuccess: () => {
                $('#login-button').addClass(['loading', 'disabled']);
                const user = new AV.User();
                user.setUsername($('#login-form input[name="username"]').val());
                user.setPassword($('#login-form input[name="password"]').val());

                user.logIn().then(
                    (user) => {
                        location.reload();
                    },
                    (error) => {
                        switch (error.code) {
                            case 1:
                                $('#login-form').form('add errors', [
                                    '您的登录行为可能包含恶意。15 分钟内，您将无法登录'
                                ]);
                                break;
                            case 210:
                                $('#login-form').form('add errors', ['密码错误']);
                                $('#login-form input[name="password"]').closest('.field').addClass('error');
                                break;
                            case 211:
                                $('#login-form').form('add errors', ['未能找到用户']);
                                $('#login-form input[name="username"]').closest('.field').addClass('error');
                                break;
                        }
                        $('.ui.error.message').transition('pulse').transition('clear queue');
                        $('#login-button').removeClass(['loading', 'disabled']);
                    }
                );
            },
            onFailure: () => {
                $('#login-button').removeClass(['loading', 'disabled']);
                $('.ui.error.message').transition('pulse').transition('clear queue');
            }
        });
    },
    methods: {
        submit() {
            $('#login-form').form('validate form');
        }
    }
};
</script>
