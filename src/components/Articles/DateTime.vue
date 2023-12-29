<template>
    {{ formattedTime }}
</template>

<script>
import moment from 'moment';
import 'moment/dist/locale/zh-cn';

export default {
    name: 'DateTime',
    props: {
        time: {
            type: Date
        }
    },
    computed: {
        formattedTime() {
            if (!this.time) {
                return '刚刚';
            }
            return moment(this.time).fromNow();
        }
    }
};
</script>
