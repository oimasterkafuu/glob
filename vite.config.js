import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import moment from 'moment';

moment.locale('zh-CN');

const packageJson = require('./package.json');

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), Components()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    define: {
        __APP_VERSION__: JSON.stringify(packageJson.version),
        __APP_BUILD_TIME__: JSON.stringify(moment().utcOffset(8).format('LLL'))
    }
});
