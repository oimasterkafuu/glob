import { createApp } from 'vue';

const isVueDevMode = import.meta.env.MODE === 'development';
if (isVueDevMode) {
    localStorage.setItem('debug', 'leancloud*');
}

console.log('isVueDevMode', isVueDevMode);

import App from './App.vue';
import router from './router';

const app = createApp(App);
app.use(router);

AV.init({
    appId: 'dbwOjBZTDzOGVCMstogd2SE4-gzGzoHsz',
    appKey: 'GiSZzeRV8LhGhRkubFYYjiRO',
    serverURL: 'https://dbwojbzt.lc-cn-n1-shared.com'
});

app.mount('#app');
