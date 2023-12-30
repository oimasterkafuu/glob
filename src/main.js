import { createApp } from 'vue';

const isVueDevMode = import.meta.env.MODE === 'development';
if (isVueDevMode) {
    localStorage.setItem('debug', 'leancloud*');
    console.log('Glob is running in development mode');
}

import App from './App.vue';
import router from './router';

const app = createApp(App);
app.use(router);

console.log('%cMade by oimaster with ❤️', 'color: #8db3f1; font-size: 2em; font-weight: bold;');

app.mount('#app');
